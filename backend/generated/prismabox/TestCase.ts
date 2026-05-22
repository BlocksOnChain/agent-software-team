import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TestCasePlain = t.Object(
  {
    id: t.Integer(),
    subTicketId: t.Integer(),
    requirements: __nullable__(
      t.String({ description: `Business requirement being tested` }),
    ),
    precondition: __nullable__(
      t.String({ description: `Setup/prerequisites before test execution` }),
    ),
    input: __nullable__(
      t.Any({ description: `Test input data (structured for automation)` }),
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
);

export const TestCaseRelations = t.Object(
  {
    subTicket: t.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const TestCasePlainInputCreate = t.Object(
  {
    requirements: t.Optional(
      __nullable__(
        t.String({ description: `Business requirement being tested` }),
      ),
    ),
    precondition: t.Optional(
      __nullable__(
        t.String({ description: `Setup/prerequisites before test execution` }),
      ),
    ),
    input: t.Optional(
      __nullable__(
        t.Any({ description: `Test input data (structured for automation)` }),
      ),
    ),
    steps: t.Optional(
      __nullable__(
        t.Any({
          description: `Execution steps [{step: string, action: "click|type|verify"...}]`,
        }),
      ),
    ),
    expectedResult: t.String({
      description: `Expected behavior/outcome description`,
    }),
    expectedOutput: t.Optional(
      __nullable__(t.Any({ description: `Expected structured response/data` })),
    ),
    acceptanceCriteria: t.Optional(
      t.Array(t.Any({ description: `Array of conditions that must pass` }), {
        additionalProperties: false,
      }),
    ),
    negativeCases: t.Optional(
      __nullable__(
        t.Any({
          description: `Negative test scenarios [{description: string, input: Json}]`,
        }),
      ),
    ),
    isRequired: t.Optional(t.Boolean()),
    priority: t.Optional(t.String()),
    automationReady: t.Optional(t.Boolean()),
  },
  { additionalProperties: false },
);

export const TestCasePlainInputUpdate = t.Object(
  {
    requirements: t.Optional(
      __nullable__(
        t.String({ description: `Business requirement being tested` }),
      ),
    ),
    precondition: t.Optional(
      __nullable__(
        t.String({ description: `Setup/prerequisites before test execution` }),
      ),
    ),
    input: t.Optional(
      __nullable__(
        t.Any({ description: `Test input data (structured for automation)` }),
      ),
    ),
    steps: t.Optional(
      __nullable__(
        t.Any({
          description: `Execution steps [{step: string, action: "click|type|verify"...}]`,
        }),
      ),
    ),
    expectedResult: t.Optional(
      t.String({ description: `Expected behavior/outcome description` }),
    ),
    expectedOutput: t.Optional(
      __nullable__(t.Any({ description: `Expected structured response/data` })),
    ),
    acceptanceCriteria: t.Optional(
      t.Array(t.Any({ description: `Array of conditions that must pass` }), {
        additionalProperties: false,
      }),
    ),
    negativeCases: t.Optional(
      __nullable__(
        t.Any({
          description: `Negative test scenarios [{description: string, input: Json}]`,
        }),
      ),
    ),
    isRequired: t.Optional(t.Boolean()),
    priority: t.Optional(t.String()),
    automationReady: t.Optional(t.Boolean()),
  },
  { additionalProperties: false },
);

export const TestCaseRelationsInputCreate = t.Object(
  {
    subTicket: t.Object(
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
  },
  { additionalProperties: false },
);

export const TestCaseRelationsInputUpdate = t.Partial(
  t.Object(
    {
      subTicket: t.Object(
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
    },
    { additionalProperties: false },
  ),
);

export const TestCaseWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          subTicketId: t.Integer(),
          requirements: t.String({
            description: `Business requirement being tested`,
          }),
          precondition: t.String({
            description: `Setup/prerequisites before test execution`,
          }),
          input: t.Any({
            description: `Test input data (structured for automation)`,
          }),
          steps: t.Any({
            description: `Execution steps [{step: string, action: "click|type|verify"...}]`,
          }),
          expectedResult: t.String({
            description: `Expected behavior/outcome description`,
          }),
          expectedOutput: t.Any({
            description: `Expected structured response/data`,
          }),
          acceptanceCriteria: t.Array(
            t.Any({ description: `Array of conditions that must pass` }),
            { additionalProperties: false },
          ),
          negativeCases: t.Any({
            description: `Negative test scenarios [{description: string, input: Json}]`,
          }),
          isRequired: t.Boolean(),
          priority: t.String(),
          automationReady: t.Boolean(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "TestCase" },
  ),
);

export const TestCaseWhereUnique = t.Recursive(
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
              subTicketId: t.Integer(),
              requirements: t.String({
                description: `Business requirement being tested`,
              }),
              precondition: t.String({
                description: `Setup/prerequisites before test execution`,
              }),
              input: t.Any({
                description: `Test input data (structured for automation)`,
              }),
              steps: t.Any({
                description: `Execution steps [{step: string, action: "click|type|verify"...}]`,
              }),
              expectedResult: t.String({
                description: `Expected behavior/outcome description`,
              }),
              expectedOutput: t.Any({
                description: `Expected structured response/data`,
              }),
              acceptanceCriteria: t.Array(
                t.Any({ description: `Array of conditions that must pass` }),
                { additionalProperties: false },
              ),
              negativeCases: t.Any({
                description: `Negative test scenarios [{description: string, input: Json}]`,
              }),
              isRequired: t.Boolean(),
              priority: t.String(),
              automationReady: t.Boolean(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "TestCase" },
);

export const TestCaseSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      subTicketId: t.Boolean(),
      subTicket: t.Boolean(),
      requirements: t.Boolean(),
      precondition: t.Boolean(),
      input: t.Boolean(),
      steps: t.Boolean(),
      expectedResult: t.Boolean(),
      expectedOutput: t.Boolean(),
      acceptanceCriteria: t.Boolean(),
      negativeCases: t.Boolean(),
      isRequired: t.Boolean(),
      priority: t.Boolean(),
      automationReady: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TestCaseInclude = t.Partial(
  t.Object(
    { subTicket: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const TestCaseOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      subTicketId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      requirements: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      precondition: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      input: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      steps: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      expectedResult: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      expectedOutput: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      acceptanceCriteria: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      negativeCases: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isRequired: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      priority: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      automationReady: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const TestCase = t.Composite([TestCasePlain, TestCaseRelations], {
  additionalProperties: false,
});

export const TestCaseInputCreate = t.Composite(
  [TestCasePlainInputCreate, TestCaseRelationsInputCreate],
  { additionalProperties: false },
);

export const TestCaseInputUpdate = t.Composite(
  [TestCasePlainInputUpdate, TestCaseRelationsInputUpdate],
  { additionalProperties: false },
);
