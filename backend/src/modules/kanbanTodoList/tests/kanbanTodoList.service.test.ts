import { describe, it, expect, beforeEach } from "bun:test";
import { CreateTicketInput, KanbanTodoListService } from "../kanbanTodoList.service";
import { MockContext, Context, createMockContext } from "../../../context";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
});

describe("KanbanTodoListService", () => {
    it("should create a new ticket and return the created ticket with correct details", async () => {
        const newTicketData = {
            title: "Implement user authentication",
            description: "Implement user authentication using JWT.",    
            technicalRequirements: "Use JWT for authentication, bcrypt for password hashing.",
            boardId: "1"
        } as CreateTicketInput;

        const mockTicket = {
            id: 1,
            ...newTicketData,
            status: "todo",
            priority: "medium",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Mock prisma.$transaction to directly return the created ticket
        mockCtx.prisma.$transaction = async (callback: any) => {
            return {
                ticket: {
                    create: async () => mockTicket,
                },
            };
        } as any;

        const service = new KanbanTodoListService(ctx);
        const createdTicket = await service.createTicket(newTicketData);

        expect(createdTicket).toBeDefined();
        expect(createdTicket.title).toBe(newTicketData.title);
        expect(createdTicket.boardId).toBe(newTicketData.boardId);
    });

    it("should handle transaction errors gracefully", async () => {
        const newTicketData = {
            title: "Test Ticket",
            description: "Test description",    
            technicalRequirements: "Test requirements",
            boardId: "1"
        } as CreateTicketInput;

        // Mock transaction to throw an error
        mockCtx.prisma.$transaction = async () => {
            throw new Error("Database transaction failed");
        } as any;

        const service = new KanbanTodoListService(ctx);
        
        try {
            await service.createTicket(newTicketData);
            expect.unreachable("Should have thrown an error");
        } catch (error: any) {
            expect(error.message).toBe("Database transaction failed");
        }
    });
});