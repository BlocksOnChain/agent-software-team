import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TicketPlain = t.Object(
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
);

export const TicketRelations = t.Object(
  {
    board: t.Object(
      {
        id: t.String(),
        name: t.String(),
        description: __nullable__(t.String()),
        projectId: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    subtickets: t.Array(
      t.Object(
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
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const TicketPlainInputCreate = t.Object(
  {
    title: t.String(),
    description: t.Optional(__nullable__(t.String())),
    technicalRequirements: t.String(),
    status: t.Optional(t.String()),
    priority: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const TicketPlainInputUpdate = t.Object(
  {
    title: t.Optional(t.String()),
    description: t.Optional(__nullable__(t.String())),
    technicalRequirements: t.Optional(t.String()),
    status: t.Optional(t.String()),
    priority: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const TicketRelationsInputCreate = t.Object(
  {
    board: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    subtickets: t.Optional(
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

export const TicketRelationsInputUpdate = t.Partial(
  t.Object(
    {
      board: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      subtickets: t.Partial(
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

export const TicketWhere = t.Partial(
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
          technicalRequirements: t.String(),
          status: t.String(),
          priority: t.String(),
          boardId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Ticket" },
  ),
);

export const TicketWhereUnique = t.Recursive(
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
              technicalRequirements: t.String(),
              status: t.String(),
              priority: t.String(),
              boardId: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Ticket" },
);

export const TicketSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      title: t.Boolean(),
      description: t.Boolean(),
      technicalRequirements: t.Boolean(),
      status: t.Boolean(),
      priority: t.Boolean(),
      boardId: t.Boolean(),
      board: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      subtickets: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TicketInclude = t.Partial(
  t.Object(
    { board: t.Boolean(), subtickets: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const TicketOrderBy = t.Partial(
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
      technicalRequirements: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      status: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      priority: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      boardId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Ticket = t.Composite([TicketPlain, TicketRelations], {
  additionalProperties: false,
});

export const TicketInputCreate = t.Composite(
  [TicketPlainInputCreate, TicketRelationsInputCreate],
  { additionalProperties: false },
);

export const TicketInputUpdate = t.Composite(
  [TicketPlainInputUpdate, TicketRelationsInputUpdate],
  { additionalProperties: false },
);
