import { seedInsuranceCompanies } from "../../db/seed/insurance-companies.seed";
import { procedure } from "../../trpc/trpc.server";

export const seed = procedure.mutation(async () => {
  const insertedInsuranceCompanies = (await seedInsuranceCompanies()).length;

  return {
    insertedInsuranceCompanies,
  };
});
