import { db } from "../../db/db";
import { TABLE_InsuranceCompanies } from "../../db/schemas/insurance-companies";
import { procedure } from "../../trpc/trpc.server";

export const list = procedure.query(async () => {
  return db
    .select({
      id: TABLE_InsuranceCompanies.id,
      name: TABLE_InsuranceCompanies.name,
    })
    .from(TABLE_InsuranceCompanies);
});
