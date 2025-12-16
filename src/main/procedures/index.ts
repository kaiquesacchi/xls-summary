import { router } from "../trpc/trpc.server";
import { database } from "./database";
import { health } from "./health";
import { insuranceCompanies } from "./insurance-companies";
import { statements } from "./statements";

export const appRouter = router({
  database,
  insuranceCompanies,
  health,
  statements,
});

export type AppRouter = typeof appRouter;
