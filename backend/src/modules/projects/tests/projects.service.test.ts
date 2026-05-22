import { it, describe, expect, beforeAll, afterAll } from 'bun:test';
import { ProjectsService } from '../projects.service';
import { setupTestDatabase, teardownTestDatabase, getTestPrisma } from '../../../lib/testSetup';

describe('ProjectsService', () => {
    beforeAll(async () => {
        await setupTestDatabase();
    });

    afterAll(async () => {
        await teardownTestDatabase();
    });

    it('should create a new project and return success with projectId', async () => {
        const testPrisma = getTestPrisma();
        const service = new ProjectsService(testPrisma);
        const projectData = { name: 'Test Project', description: 'A project for testing' };

        const result = await service.createProject(projectData);
        expect(result.success).toBe(true);
        expect(result.projectId).toBeDefined();
    });
});