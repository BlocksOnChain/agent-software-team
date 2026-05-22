import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AgentRole = t.Union(
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
);
