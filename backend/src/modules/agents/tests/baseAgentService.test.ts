import { describe, it } from "bun:test";
import { BaseAgentService } from "../baseAgentService";

describe("BaseAgentService Integration", () => {
    it("should call AI model and log the response from real service", async () => {
        const service = new BaseAgentService();
        
        const prompt = "You are a helpful assistant.";
        const projectRequest = "What is the capital of France?";
        
        console.log("=== Calling BaseAgentService.callAIModel ===");
        console.log("Prompt:", prompt);
        console.log("Project Request:", projectRequest);
        
        const result = await service.callAIModel(prompt, projectRequest);
        
        console.log("\n=== AI Agent Response (Raw) ===");
        console.log("Type:", typeof result);
        if (result && typeof result === "object") {
            console.log("Result Keys:", Object.keys(result));
        }
        console.log("Full Result:", JSON.stringify(result, null, 2));
        console.log("===============================");
    });
});
