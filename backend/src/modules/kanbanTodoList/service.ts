import { AgentRole, Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export interface Ticket {
    id: number;
    title: string;
    description?: string | null;
    technicalRequirements: string;
    status: string;
    priority: string;
    boardId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SubTicket {
    id: number;
    title: string;
    description?: string | null;
    status: string;
    priority: string;
    ticketId: number;
    agentRole?: AgentRole | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface TestCase {
    id: number;
    subTicketId: number;
    requirements?: string | null;
    precondition?: string | null;
    input?: Prisma.JsonValue | null;
    steps?: Prisma.JsonValue | null;
    expectedResult: string;
    expectedOutput?: Prisma.JsonValue | null;
    acceptanceCriteria: Prisma.JsonValue[];
    negativeCases?: Prisma.JsonValue | null;
    isRequired: boolean;
    priority: string;
    automationReady: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface SubTicketWithTestCases extends Omit<SubTicket, "testCases"> {
    testCases: TestCase[];
}

export interface TicketWithSubTickets extends Omit<Ticket, "subtickets"> {
    subtickets: SubTicketWithTestCases[];
}

export interface CreateTicketInput {
    title: string;
    description?: string;
    technicalRequirements: string;
    status?: "todo" | "in_progress" | "testing" | "done";
    priority?: "low" | "medium" | "high" | "critical";
    boardId: string;
}

export interface CreateSubTicketInput {
    title: string;
    description?: string;
    status?: "todo" | "in_progress" | "testing" | "done";
    priority?: "low" | "medium" | "high" | "critical";
    ticketId: number;
    agentRole?: AgentRole;
}

export interface CreateTestCaseInput {
    subTicketId: number;
    requirements?: string | null;
    precondition?: string | null;
    input?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
    steps?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
    expectedResult: string;
    expectedOutput?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
    acceptanceCriteria: Prisma.InputJsonValue[];
    negativeCases?: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput;
    isRequired?: boolean;
    priority?: "low" | "medium" | "high" | "critical";
    automationReady?: boolean;
}

export interface ListTicketsOptions {
    boardId?: string;
    status?: "todo" | "in_progress" | "testing" | "done";
    priority?: "low" | "medium" | "high" | "critical";
    sortBy?: keyof Ticket;
    sortOrder?: "asc" | "desc";
}

export interface ListSubTicketsOptions {
    ticketId: number;
    status?: "todo" | "in_progress" | "testing" | "done";
    priority?: "low" | "medium" | "high" | "critical";
    agentRole?: AgentRole;
    sortBy?: keyof SubTicket;
    sortOrder?: "asc" | "desc";
}

export interface ListTestCasesOptions {
    subTicketId: number;
    isRequired?: boolean;
    priority?: "low" | "medium" | "high" | "critical";
    sortBy?: keyof TestCase;
    sortOrder?: "asc" | "desc";
}

export class KanbanTodoListService {
    /**
     * Create a new ticket (without subtickets)
     */
    async createTicket(data: CreateTicketInput): Promise<Ticket> {
        return prisma.$transaction(async (tx) => {
            return tx.ticket.create({
                data: {
                    title: data.title,
                    description: data.description,
                    technicalRequirements: data.technicalRequirements,
                    status: data.status || "todo",
                    priority: data.priority || "medium",
                    boardId: data.boardId,
                },
            });
        });
    }

    /**
     * Get a ticket by ID with all subtickets and their test cases
     */
    async getTicketById(ticketId: number): Promise<TicketWithSubTickets | null> {
        return prisma.ticket.findUnique({
            where: { id: ticketId },
            include: {
                subtickets: {
                    orderBy: { createdAt: "asc" },
                    include: {
                        testCases: {
                            orderBy: { createdAt: "asc" },
                        },
                    },
                },
            },
        });
    }

    /**
     * List all tickets with optional filtering and sorting
     */
    async listTickets(options: ListTicketsOptions): Promise<Ticket[]> {
        const { boardId, status, priority, sortBy = "createdAt", sortOrder = "desc" } = options;

        const where: any = {};
        if (boardId) where.boardId = boardId;
        if (status) where.status = status;
        if (priority) where.priority = priority;

        return prisma.ticket.findMany({
            where,
            orderBy: { [sortBy]: sortOrder },
            include: {
                subtickets: true,
            },
        });
    }

    /**
     * Get all subtickets for a ticket with their test cases
     */
    async getSubticketsByTicketId(ticketId: number): Promise<SubTicketWithTestCases[] | null> {
        const result = await prisma.subTicket.findMany({
            where: { ticketId },
            include: {
                testCases: {
                    orderBy: { createdAt: "asc" },
                },
            },
        });

        if (!result || result.length === 0) return null;
        return result;
    }

    /**
     * Get a single subticket with all its test cases
     */
    async getSubticketById(subTicketId: number): Promise<SubTicketWithTestCases | null> {
        const result = await prisma.subTicket.findFirst({
            where: { id: subTicketId },
            include: {
                testCases: {
                    orderBy: { createdAt: "asc" },
                },
            },
        });

        return result || null;
    }

    /**
     * Create a single subticket
     */
    async createSubticket(data: CreateSubTicketInput): Promise<SubTicket> {
        return prisma.$transaction(async (tx) => {
            return tx.subTicket.create({
                data: {
                    title: data.title,
                    description: data.description,
                    status: data.status || "todo",
                    priority: data.priority || "medium",
                    ticketId: data.ticketId,
                    agentRole: data.agentRole,
                },
            });
        });
    }

    /**
     * Create multiple subtickets at once
     */
    async createSubtickets(data: CreateSubTicketInput[]): Promise<SubTicket[]> {
        return prisma.$transaction(async (tx) => {
            const results = await Promise.all(
                data.map((item) =>
                    tx.subTicket.create({
                        data: {
                            title: item.title,
                            description: item.description,
                            status: item.status || "todo",
                            priority: item.priority || "medium",
                            ticketId: item.ticketId,
                            agentRole: item.agentRole,
                        },
                    })
                )
            );
            return results;
        });
    }

    /**
     * List all subtickets for a ticket with optional filtering and sorting
     */
    async listSubtickets(options: ListSubTicketsOptions): Promise<SubTicketWithTestCases[]> {
        const { ticketId, status, priority, agentRole, sortBy = "createdAt", sortOrder = "desc" } = options;

        const where: any = { ticketId };
        if (status) where.status = status;
        if (priority) where.priority = priority;
        if (agentRole) where.agentRole = agentRole;

        return prisma.subTicket.findMany({
            where,
            orderBy: { [sortBy]: sortOrder },
            include: {
                testCases: {
                    orderBy: { createdAt: "asc" },
                },
            },
        });
    }

    /**
     * List all test cases for a subticket with optional filtering and sorting
     */
    async listTestCases(options: ListTestCasesOptions): Promise<TestCase[]> {
        const { subTicketId, isRequired, priority, sortBy = "createdAt", sortOrder = "desc" } = options;

        const where: any = { subTicketId };
        if (isRequired !== undefined) where.isRequired = isRequired;
        if (priority) where.priority = priority;

        return prisma.testCase.findMany({
            where,
            orderBy: { [sortBy]: sortOrder },
        });
    }

    /**
     * Create a single test case
     */
    async createTestCase(data: CreateTestCaseInput): Promise<TestCase> {
        return prisma.$transaction(async (tx) => {
            return tx.testCase.create({
                data: {
                    subTicketId: data.subTicketId,
                    requirements: data.requirements,
                    precondition: data.precondition,
                    input: data.input,
                    steps: data.steps,
                    expectedResult: data.expectedResult,
                    expectedOutput: data.expectedOutput,
                    acceptanceCriteria: data.acceptanceCriteria,
                    negativeCases: data.negativeCases,
                    isRequired: data.isRequired ?? false,
                    priority: data.priority || "medium",
                    automationReady: data.automationReady ?? true,
                },
            });
        });
    }

    /**
     * Create multiple test cases at once
     */
    async createTestCases(data: CreateTestCaseInput[]): Promise<TestCase[]> {
        return prisma.$transaction(async (tx) => {
            const results = await Promise.all(
                data.map((item) =>
                    tx.testCase.create({
                        data: {
                            subTicketId: item.subTicketId,
                            requirements: item.requirements,
                            precondition: item.precondition,
                            input: item.input,
                            steps: item.steps,
                            expectedResult: item.expectedResult,
                            expectedOutput: item.expectedOutput,
                            acceptanceCriteria: item.acceptanceCriteria,
                            negativeCases: item.negativeCases,
                            isRequired: item.isRequired ?? false,
                            priority: item.priority || "medium",
                            automationReady: item.automationReady ?? true,
                        },
                    })
                )
            );
            return results;
        });
    }

    /**
     * Update a ticket
     */
    async updateTicket(ticketId: number, data: Partial<CreateTicketInput>): Promise<Ticket | null> {
        return prisma.ticket.update({
            where: { id: ticketId },
            data,
        });
    }

    /**
     * Delete a ticket (cascades to subtickets and test cases)
     */
    async deleteTicket(ticketId: number): Promise<void> {
        await prisma.ticket.delete({
            where: { id: ticketId },
        });
    }

    /**
     * Update a subticket
     */
    async updateSubticket(subTicketId: number, data: Partial<CreateSubTicketInput>): Promise<SubTicket | null> {
        return prisma.subTicket.update({
            where: { id: subTicketId },
            data,
        });
    }

    /**
     * Delete a subticket (cascades to test cases)
     */
    async deleteSubticket(subTicketId: number): Promise<void> {
        await prisma.subTicket.delete({
            where: { id: subTicketId },
        });
    }

    /**
     * Update a test case
     */
    async updateTestCase(testCaseId: number, data: Partial<CreateTestCaseInput>): Promise<TestCase | null> {
        return prisma.testCase.update({
            where: { id: testCaseId },
            data: {
                requirements: data.requirements,
                precondition: data.precondition,
                input: data.input,
                steps: data.steps,
                expectedResult: data.expectedResult,
                expectedOutput: data.expectedOutput,
                acceptanceCriteria: data.acceptanceCriteria,
                negativeCases: data.negativeCases,
                isRequired: data.isRequired,
                priority: data.priority,
                automationReady: data.automationReady,
            },
        });
    }

    /**
     * Delete a test case
     */
    async deleteTestCase(testCaseId: number): Promise<void> {
        await prisma.testCase.delete({
            where: { id: testCaseId },
        });
    }

    /**
     * Get tickets by agent role (subticket level) - useful for tracking workload
     */
    async getTicketsByAgentRole(agentRole: AgentRole): Promise<TicketWithSubTickets[]> {
        return prisma.ticket.findMany({
            where: {
                subtickets: {
                    some: {
                        agentRole,
                    },
                },
            },
            include: {
                subtickets: {
                    orderBy: { createdAt: "asc" },
                    include: {
                        testCases: {
                            orderBy: { createdAt: "asc" },
                        },
                    },
                },
            },
        });
    }

    /**
     * Get subtickets filtered by agent role with their test cases
     */
    async getSubticketsByAgentRole(agentRole: AgentRole): Promise<SubTicketWithTestCases[]> {
        return prisma.subTicket.findMany({
            where: { agentRole },
            include: {
                testCases: true,
            },
            orderBy: { createdAt: "desc" },
        });
    }

    /**
     * Get tickets sorted by priority (critical > high > medium > low) then by createdAt
     */
    async getTicketsByPriority(boardId?: string): Promise<Ticket[]> {
        const boardWhere = boardId ? { boardId } : {};

        return prisma.ticket.findMany({
            where: boardWhere,
            orderBy: [
                { priority: "desc" }, // critical, high, medium, low
                { createdAt: "desc" },
            ],
            include: {
                subtickets: true,
            },
        });
    }

    /**
     * Get subtickets sorted by priority then by createdAt
     */
    async getSubticketsByPriority(ticketId: number): Promise<SubTicketWithTestCases[]> {
        return prisma.subTicket.findMany({
            where: { ticketId },
            include: {
                testCases: true,
            },
            orderBy: [
                { priority: "desc" },
                { createdAt: "desc" },
            ],
        });
    }

    /**
     * Get tickets sorted by status (todo -> in_progress -> testing -> done) then by createdAt
     */
    async getTicketsByStatus(boardId?: string): Promise<Ticket[]> {
        const boardWhere = boardId ? { boardId } : {};

        return prisma.ticket.findMany({
            where: boardWhere,
            orderBy: [
                { status: "asc" },
                { createdAt: "desc" },
            ],
            include: {
                subtickets: true,
            },
        });
    }

    /**
     * Get subtickets sorted by status then by createdAt
     */
    async getSubticketsByStatus(ticketId: number): Promise<SubTicketWithTestCases[]> {
        return prisma.subTicket.findMany({
            where: { ticketId },
            include: {
                testCases: true,
            },
            orderBy: [
                { status: "asc" },
                { createdAt: "desc" },
            ],
        });
    }

    /**
     * Get tickets with active test cases (testCases.length > 0)
     */
    async getTicketsWithActiveTestCases(boardId?: string): Promise<Ticket[]> {
        const boardWhere = boardId ? { boardId } : {};

        return prisma.ticket.findMany({
            where: {
                ...boardWhere,
                subtickets: {
                    some: {
                        testCases: {
                            some: {},
                        },
                    },
                },
            },
            include: {
                subtickets: {
                    include: {
                        testCases: true,
                    },
                },
            },
        });
    }

    /**
     * Get statistics for a ticket (subticket count, test case count)
     */
    async getTicketStats(ticketId: number): Promise<{
        subticketCount: number;
        testCaseCount: number;
        inProgressSubtickets: number;
        pendingTestCases: number;
    }> {
        const [ticket, subtickets] = await Promise.all([
            prisma.ticket.findUnique({
                where: { id: ticketId },
            }),
            prisma.subTicket.findMany({
                where: { ticketId },
                include: {
                    testCases: true,
                },
            }),
        ]);

        if (!ticket || !subtickets) {
            return {
                subticketCount: 0,
                testCaseCount: 0,
                inProgressSubtickets: 0,
                pendingTestCases: 0,
            };
        }

        const totalTestCases = subtickets.reduce((acc, sub) => acc + sub.testCases.length, 0);
        const inProgressSubtickets = subtickets.filter((s) => s.status === "in_progress").length;
        const pendingTestCases = subtickets
            .flatMap((s) => s.testCases)
            .filter((tc) => !tc.automationReady).length;

        return {
            subticketCount: subtickets.length,
            testCaseCount: totalTestCases,
            inProgressSubtickets,
            pendingTestCases,
        };
    }
}
