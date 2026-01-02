import { db } from "../../db/db";
import { TABLE_InsuranceCompanies } from "../../db/schemas/insurance-companies";
import { TABLE_InsuranceConsultants } from "../../db/schemas/insurance-consultants";
import { TABLE_Transactions } from "../../db/schemas/insurance-policies";
import { TABLE_InvestmentConsultants } from "../../db/schemas/investment-consultants";
import { TABLE_PolicyHolders } from "../../db/schemas/policy-holders";
import { procedure } from "../../trpc/trpc.server";

export const countDbEntries = procedure.query(async () => {
  const insuranceCompanies = await db.$count(TABLE_InsuranceCompanies);
  const insuranceConsultants = await db.$count(TABLE_InsuranceConsultants);
  const transactions = await db.$count(TABLE_Transactions);
  const investmentConsultants = await db.$count(TABLE_InvestmentConsultants);
  const policyHolders = await db.$count(TABLE_PolicyHolders);

  return {
    insuranceCompanies,
    insuranceConsultants,
    transactions,
    investmentConsultants,
    policyHolders,
  };
});
