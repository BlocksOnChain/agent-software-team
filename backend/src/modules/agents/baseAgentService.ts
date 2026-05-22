import { createDeepAgent } from "deepagents";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { QWEN_MODEL_URL, USE_LOCAL_MODEL } from "../../config.js";

export class BaseAgentService {
    private llm: ChatOpenAI | null = null;

    constructor() {
        if (USE_LOCAL_MODEL) {
            this.initQwenModel();
        }
    }

    private async initQwenModel(): Promise<void> {
        try {
            this.llm = new ChatOpenAI({
                configuration: {
                    baseURL: QWEN_MODEL_URL
                },
                model: "qwen/qwen3.5-9b",
                temperature: 0.7,
            });
        } catch (error) {
            console.error("Failed to initialize Qwen model:", error);
            this.llm = null;
        }
    }

    async callAIModel(prompt: string, project_request: string): Promise<string> {
        const messages: any[] = [
            new SystemMessage({ content: prompt }),
            new HumanMessage({ content: project_request }),
        ];

        if (USE_LOCAL_MODEL && this.llm) {
            return this.llm.invoke(messages).then((result) => result.content as string);
        }

        const agent = createDeepAgent({ systemPrompt: prompt });
        const result = await agent.invoke({ messages: [{ role: "user", content: project_request }] });

        // Common shapes: sometimes it's a string, sometimes an object with output/content
        if (typeof result === "string") return result;
        if (result && Array.isArray((result as any).output) && (result as any).output.length) {
            const first = (result as any).output[0];
            if (typeof first.content === "string") return first.content;
        }
        if (result && typeof (result as any).content === "string") return (result as any).content;

        // Fallback: return a deterministic serialized representation
        return JSON.stringify(result);
    }
}