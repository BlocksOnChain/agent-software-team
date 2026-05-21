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
        return agent.invoke({ messages: [{ role: "user", content: project_request }] });
    }
}