import { AgentRole, Prisma } from "../../generated/prisma/client";
import { prisma as defaultPrisma } from "../../lib/prisma";
import { Project } from "../../generated/prisma/client";
import { PrismaClient } from "../../generated/prisma/client";

export class ProjectsService {
    private prisma: PrismaClient;

    constructor(prisma?: PrismaClient) {
        this.prisma = prisma || defaultPrisma;
    }

    async createProject(projectData: Omit<Project, 'id'>): Promise<{success: boolean; projectId?: string}> {
        const project = await this.prisma.project.create({
            data: projectData
        });
        return { success: true, projectId: project.id };
    }
}