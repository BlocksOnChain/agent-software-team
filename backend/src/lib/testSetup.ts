import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { execSync } from "child_process";
import path from "path";

const backendRoot = path.join(import.meta.dir, "../..");

let containerId: string | null = null;
let testPrisma: PrismaClient | null = null;

function runTestContainer(command: "start" | "stop", id?: string): string {
    const scriptPath = path.join(import.meta.dir, "../../scripts/testContainer.mjs");
    const args = id ? `${command} ${id}` : command;
    const env = { ...process.env, TESTCONTAINERS_RYUK_DISABLED: "true", DEBUG: "" };
    delete env.DOCKER_HOST;

    return execSync(`node "${scriptPath}" ${args}`, {
        encoding: "utf-8",
        cwd: backendRoot,
        env,
        stdio: ["pipe", "pipe", "inherit"],
    }).trim();
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
    const output = runTestContainer("start");
    const { containerId: id, databaseUrl } = parseContainerOutput(output);

    containerId = id;
    process.env.DATABASE_URL = databaseUrl;

    const adapter = new PrismaPg(databaseUrl);
    testPrisma = new PrismaClient({ adapter });

    execSync("bunx prisma db push", {
        stdio: "inherit",
        cwd: backendRoot,
        env: { ...process.env, DATABASE_URL: databaseUrl },
    });

    return testPrisma;
}

export async function teardownTestDatabase() {
    if (testPrisma) {
        await testPrisma.$disconnect();
        testPrisma = null;
    }

    if (containerId) {
        try {
            runTestContainer("stop", containerId);
        } catch (error) {
            console.error("Error stopping container:", error);
        }
        containerId = null;
    }
}

export function getTestPrisma(): PrismaClient {
    if (!testPrisma) {
        throw new Error("Test database not initialized. Call setupTestDatabase() first.");
    }
    return testPrisma;
}
