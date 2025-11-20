import { router } from "../trpc/trpc.server";
import { database } from "./database";
import { health } from "./health";

export const appRouter = router({
  database,
  health,
});

export type AppRouter = typeof appRouter;
