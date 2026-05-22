import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { execSync } from "child_process";
import path from "path";

const backendRoot = path.join(import.meta.dir, "../..");
const testContainerScript = path.join(backendRoot, "scripts/testContainer.mjs");

let containerId: string | null = null;
let testPrisma: PrismaClient | null = null;
let cleanupRegistered = false;

function runTestContainer(command: "start" | "stop" | "cleanup", id?: string): string {
    const args = id ? `${command} ${id}` : command;
    const env = { ...process.env, TESTCONTAINERS_RYUK_DISABLED: "true", DEBUG: "" };
    delete env.DOCKER_HOST;

    if (command === "start") {
        return execSync(`node "${testContainerScript}" ${args}`, {
            encoding: "utf-8",
            cwd: backendRoot,
            env,
            stdio: ["pipe", "pipe", "inherit"],
        }).trim();
    }

    execSync(`node "${testContainerScript}" ${args}`, {
        cwd: backendRoot,
        env,
        stdio: "inherit",
    });

    return "";
}

function removeContainer(id: string) {
    try {
        execSync(`docker rm -f ${id}`, { stdio: "ignore" });
    } catch {
        // Container may already be removed.
    }
}

function registerCleanupHandlers() {
    if (cleanupRegistered) {
        return;
    }
    cleanupRegistered = true;

    const cleanup = () => {
        if (containerId) {
            removeContainer(containerId);
            containerId = null;
        }
    };

    process.on("exit", cleanup);
    process.on("SIGINT", () => {
        cleanup();
        process.exit(130);
    });
    process.on("SIGTERM", () => {
        cleanup();
        process.exit(143);
    });
}

function parseContainerOutput(output: string): { containerId: string; databaseUrl: string } {
    const jsonLine = output
        .split("\n")
        .map((line) => line.trim())
        .reverse()
        .find((line) => line.startsWith("{"));

    if (!jsonLine) {
        throw new Error(`Failed to parse test container output:\n${output}`);
    }

    return JSON.parse(jsonLine);
}

export async function setupTestDatabase() {
    registerCleanupHandlers();

    // Remove containers left behind by interrupted or failed test runs.
    runTestContainer("cleanup");

    const output = runTestContainer("start");
    const { containerId: id, databaseUrl } = parseContainerOutput(output);

    containerId = id;
    process.env.DATABASE_URL = databaseUrl;

    try {
        const adapter = new PrismaPg(databaseUrl);
        testPrisma = new PrismaClient({ adapter });

        execSync("bunx prisma db push", {
            stdio: "inherit",
            cwd: backendRoot,
            env: { ...process.env, DATABASE_URL: databaseUrl },
        });

        return testPrisma;
    } catch (error) {
        await teardownTestDatabase();
        throw error;
    }
}

export async function teardownTestDatabase() {
    if (testPrisma) {
        await testPrisma.$disconnect();
        testPrisma = null;
    }

    if (containerId) {
        removeContainer(containerId);
        containerId = null;
    }
}

export function getTestPrisma(): PrismaClient {
    if (!testPrisma) {
        throw new Error("Test database not initialized. Call setupTestDatabase() first.");
    }
    return testPrisma;
}
