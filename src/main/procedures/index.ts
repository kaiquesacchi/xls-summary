import { router } from "../trpc/trpc.server";
import { database } from "./database";
import { exports } from "./exports";
import { health } from "./health";
import { insuranceCompanies } from "./insurance-companies";
import { imports } from "./imports";

export const appRouter = router({
  database,
  insuranceCompanies,
  exports,
  health,
  imports,
});

export type AppRouter = typeof appRouter;
