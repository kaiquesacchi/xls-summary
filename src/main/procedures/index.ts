import { procedure, router } from "../trpc/trpc.server";

export const appRouter = router({
  health: procedure.query(() => "OK"),
});

export type AppRouter = typeof appRouter;
