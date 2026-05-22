import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SubTicketPlain = t.Object(
  {
    id: t.Integer(),
    title: t.String(),
    description: __nullable__(t.String()),
    status: t.String(),
    priority: t.String(),
    ticketId: t.Integer(),
    agentRole: __nullable__(
      t.Union(
        [
          t.Literal("PROJECT_MANAGER"),
          t.Literal("RESEARCHER"),
          t.Literal("BACKEND_LEAD"),
          t.Literal("FRONTEND_LEAD"),
          t.Literal("BACKEND_DEV"),
          t.Literal("FRONTEND_DEV"),
          t.Literal("DEVOPS"),
          t.Literal("QA"),
        ],
        { additionalProperties: false },
      ),
    ),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const SubTicketRelations = t.Object(
  {
    ticket: t.Object(
      {
        id: t.Integer(),
        title: t.String(),
        description: __nullable__(t.String()),
        technicalRequirements: t.String(),
        status: t.String(),
        priority: t.String(),
        boardId: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    testCases: t.Array(
      t.Object(
        {
          id: t.Integer(),
          subTicketId: t.Integer(),
          requirements: __nullable__(
            t.String({ description: `Business requirement being tested` }),
          ),
          precondition: __nullable__(
            t.String({
              description: `Setup/prerequisites before test execution`,
            }),
          ),
          input: __nullable__(
            t.Any({
              description: `Test input data (structured for automation)`,
            }),
          ),
          steps: __nullable__(
            t.Any({
              description: `Execution steps [{step: string, action: "click|type|verify"...}]`,
            }),
          ),
          expectedResult: t.String({
            description: `Expected behavior/outcome description`,
          }),
          expectedOutput: __nullable__(
            t.Any({ description: `Expected structured response/data` }),
          ),
          acceptanceCriteria: t.Array(
            t.Any({ description: `Array of conditions that must pass` }),
            { additionalProperties: false },
          ),
          negativeCases: __nullable__(
            t.Any({
              description: `Negative test scenarios [{description: string, input: Json}]`,
            }),
          ),
          isRequired: t.Boolean(),
          priority: t.String(),
          automationReady: t.Boolean(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const SubTicketPlainInputCreate = t.Object(
  {
    title: t.String(),
    description: t.Optional(__nullable__(t.String())),
    status: t.Optional(t.String()),
    priority: t.Optional(t.String()),
    agentRole: t.Optional(
      __nullable__(
        t.Union(
          [
            t.Literal("PROJECT_MANAGER"),
            t.Literal("RESEARCHER"),
            t.Literal("BACKEND_LEAD"),
            t.Literal("FRONTEND_LEAD"),
            t.Literal("BACKEND_DEV"),
            t.Literal("FRONTEND_DEV"),
            t.Literal("DEVOPS"),
            t.Literal("QA"),
          ],
          { additionalProperties: false },
        ),
      ),
    ),
  },
  { additionalProperties: false },
);

export const SubTicketPlainInputUpdate = t.Object(
  {
    title: t.Optional(t.String()),
    description: t.Optional(__nullable__(t.String())),
    status: t.Optional(t.String()),
    priority: t.Optional(t.String()),
    agentRole: t.Optional(
      __nullable__(
        t.Union(
          [
            t.Literal("PROJECT_MANAGER"),
            t.Literal("RESEARCHER"),
            t.Literal("BACKEND_LEAD"),
            t.Literal("FRONTEND_LEAD"),
            t.Literal("BACKEND_DEV"),
            t.Literal("FRONTEND_DEV"),
            t.Literal("DEVOPS"),
            t.Literal("QA"),
          ],
          { additionalProperties: false },
        ),
      ),
    ),
  },
  { additionalProperties: false },
);

export const SubTicketRelationsInputCreate = t.Object(
  {
    ticket: t.Object(
      {
        connect: t.Object(
          {
            id: t.Integer({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    testCases: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.Integer({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const SubTicketRelationsInputUpdate = t.Partial(
  t.Object(
    {
      ticket: t.Object(
        {
          connect: t.Object(
            {
              id: t.Integer({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      testCases: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.Integer({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.Integer({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const SubTicketWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          title: t.String(),
          description: t.String(),
          status: t.String(),
          priority: t.String(),
          ticketId: t.Integer(),
          agentRole: t.Union(
            [
              t.Literal("PROJECT_MANAGER"),
              t.Literal("RESEARCHER"),
              t.Literal("BACKEND_LEAD"),
              t.Literal("FRONTEND_LEAD"),
              t.Literal("BACKEND_DEV"),
              t.Literal("FRONTEND_DEV"),
              t.Literal("DEVOPS"),
              t.Literal("QA"),
            ],
            { additionalProperties: false },
          ),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "SubTicket" },
  ),
);

export const SubTicketWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.Integer() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.Integer() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.Integer(),
              title: t.String(),
              description: t.String(),
              status: t.String(),
              priority: t.String(),
              ticketId: t.Integer(),
              agentRole: t.Union(
                [
                  t.Literal("PROJECT_MANAGER"),
                  t.Literal("RESEARCHER"),
                  t.Literal("BACKEND_LEAD"),
                  t.Literal("FRONTEND_LEAD"),
                  t.Literal("BACKEND_DEV"),
                  t.Literal("FRONTEND_DEV"),
                  t.Literal("DEVOPS"),
                  t.Literal("QA"),
                ],
                { additionalProperties: false },
              ),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "SubTicket" },
);

export const SubTicketSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      title: t.Boolean(),
      description: t.Boolean(),
      status: t.Boolean(),
      priority: t.Boolean(),
      ticketId: t.Boolean(),
      ticket: t.Boolean(),
      agentRole: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      testCases: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const SubTicketInclude = t.Partial(
  t.Object(
    {
      ticket: t.Boolean(),
      agentRole: t.Boolean(),
      testCases: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const SubTicketOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      status: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      priority: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      ticketId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const SubTicket = t.Composite([SubTicketPlain, SubTicketRelations], {
  additionalProperties: false,
});

export const SubTicketInputCreate = t.Composite(
  [SubTicketPlainInputCreate, SubTicketRelationsInputCreate],
  { additionalProperties: false },
);

export const SubTicketInputUpdate = t.Composite(
  [SubTicketPlainInputUpdate, SubTicketRelationsInputUpdate],
  { additionalProperties: false },
);
