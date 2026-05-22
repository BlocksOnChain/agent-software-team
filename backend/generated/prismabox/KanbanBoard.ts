import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const KanbanBoardPlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    description: __nullable__(t.String()),
    projectId: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const KanbanBoardRelations = t.Object(
  {
    project: t.Object(
      { id: t.String(), name: t.String(), description: t.String() },
      { additionalProperties: false },
    ),
    tickets: t.Array(
      t.Object(
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
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const KanbanBoardPlainInputCreate = t.Object(
  { name: t.String(), description: t.Optional(__nullable__(t.String())) },
  { additionalProperties: false },
);

export const KanbanBoardPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    description: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const KanbanBoardRelationsInputCreate = t.Object(
  {
    project: t.Object(
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
    tickets: t.Optional(
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

export const KanbanBoardRelationsInputUpdate = t.Partial(
  t.Object(
    {
      project: t.Object(
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
      tickets: t.Partial(
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

export const KanbanBoardWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          description: t.String(),
          projectId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "KanbanBoard" },
  ),
);

export const KanbanBoardWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), projectId: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ projectId: t.String() })],
          { additionalProperties: false },
        ),
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
              id: t.String(),
              name: t.String(),
              description: t.String(),
              projectId: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "KanbanBoard" },
);

export const KanbanBoardSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      description: t.Boolean(),
      project: t.Boolean(),
      projectId: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      tickets: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const KanbanBoardInclude = t.Partial(
  t.Object(
    { project: t.Boolean(), tickets: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const KanbanBoardOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      projectId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const KanbanBoard = t.Composite(
  [KanbanBoardPlain, KanbanBoardRelations],
  { additionalProperties: false },
);

export const KanbanBoardInputCreate = t.Composite(
  [KanbanBoardPlainInputCreate, KanbanBoardRelationsInputCreate],
  { additionalProperties: false },
);

export const KanbanBoardInputUpdate = t.Composite(
  [KanbanBoardPlainInputUpdate, KanbanBoardRelationsInputUpdate],
  { additionalProperties: false },
);
