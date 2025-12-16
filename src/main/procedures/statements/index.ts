import { router } from "../../trpc/trpc.server";
import { importStatements } from "./import-statement";

export const statements = router({
  importStatements,
});
