import { router } from "../trpc/trpc.server";
import { database } from "./database";
import { health } from "./health";
import { statements } from "./statements";

export const appRouter = router({
  database,
  health,
  statements,
});

export type AppRouter = typeof appRouter;
