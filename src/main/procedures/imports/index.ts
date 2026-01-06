import { router } from "../../trpc/trpc.server";
import { importSalesforce } from "./import-salesforce";
import { importStatements } from "./import-statement";

export const imports = router({
  importSalesforce,
  importStatements,
});
