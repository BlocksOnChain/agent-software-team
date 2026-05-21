import { describe, it } from "bun:test";
import { PMService } from "../../pm/service";

describe("PMService Integration", () => {
    it("should process project request and return specifications, project plan, and tickets", async () => {
        const service = new PMService();
        const projectRequest = "I want to build a simple task management app with user authentication and task CRUD operations.";

        console.log("=== Calling PMService.handleProjectRequest ===");
        console.log("Project Request:", projectRequest);
        const result = await service.handleProjectRequest(projectRequest);
        console.log("\n=== PMService Response (Raw) ===");
        console.log("Type:", typeof result);
        if (result && typeof result === "object") {
            console.log("Result Keys:", Object.keys(result));
        }
        console.log("Full Result:", JSON.stringify(result, null, 2));
        console.log("===============================");
    });
});