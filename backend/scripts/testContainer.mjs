import { execSync } from "child_process";
import { GenericContainer, Wait } from "testcontainers";

const command = process.argv[2];

async function start() {
    const container = await new GenericContainer("postgres:17-alpine")
        .withEnvironment({
            POSTGRES_DB: "test_db",
            POSTGRES_USER: "test_user",
            POSTGRES_PASSWORD: "test_password",
        })
        .withExposedPorts(5432)
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

const commands = { start, stop };
const handler = commands[command];

if (!handler) {
    console.error("Usage: node testContainer.mjs <start|stop> [containerId]");
    process.exit(1);
}

handler().catch((error) => {
    console.error(error);
    process.exit(1);
});
