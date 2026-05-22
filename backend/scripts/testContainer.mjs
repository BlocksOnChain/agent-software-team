import { execSync } from "child_process";
import { GenericContainer, Wait } from "testcontainers";

export const TEST_CONTAINER_LABEL = "com.agent-software-team.test";
export const TEST_CONTAINER_VALUE = "postgres";

const command = process.argv[2];

async function start() {
    const container = await new GenericContainer("postgres:17-alpine")
        .withEnvironment({
            POSTGRES_DB: "test_db",
            POSTGRES_USER: "test_user",
            POSTGRES_PASSWORD: "test_password",
        })
        .withExposedPorts(5432)
        .withLabels({ [TEST_CONTAINER_LABEL]: TEST_CONTAINER_VALUE })
        .withWaitStrategy(
            Wait.forLogMessage(/database system is ready to accept connections/, 2),
        )
        .start();

    const host = container.getHost();
    const port = container.getMappedPort(5432);
    const databaseUrl = `postgresql://test_user:test_password@${host}:${port}/test_db`;

    console.log(
        JSON.stringify({
            containerId: container.getId(),
            databaseUrl,
        }),
    );
}

async function stop() {
    const containerId = process.argv[3];
    if (!containerId) {
        console.error("Container ID required");
        process.exit(1);
    }

    execSync(`docker rm -f ${containerId}`, { stdio: "inherit" });
}

async function cleanup() {
    const ids = execSync(
        `docker ps -aq --filter label=${TEST_CONTAINER_LABEL}=${TEST_CONTAINER_VALUE}`,
        { encoding: "utf-8" },
    )
        .trim()
        .split("\n")
        .filter(Boolean);

    for (const id of ids) {
        execSync(`docker rm -f ${id}`, { stdio: "inherit" });
    }
}

const commands = { start, stop, cleanup };
const handler = commands[command];

if (!handler) {
    console.error("Usage: node testContainer.mjs <start|stop|cleanup> [containerId]");
    process.exit(1);
}

handler().catch((error) => {
    console.error(error);
    process.exit(1);
});
