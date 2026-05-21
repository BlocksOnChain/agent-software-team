import { pm_prompt } from './prompts';
import { BaseAgentService } from '../baseAgentService';

export class PMService extends BaseAgentService {
    constructor() {
        super();
    }
    async handleProjectRequest(project_request: string) {
        // Here you would implement the logic to process the project request using the pm_prompt.
        // This could involve calling an AI model with the prompt and the project request to generate specifications, a project plan, and tickets.
        // For example:
        const response = await this.callAIModel(pm_prompt, project_request);
        return response;
    }
}