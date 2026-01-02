import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { TABLE_PolicyHolders } from "./policy-holders";
import { TABLE_InsuranceCompanies } from "./insurance-companies";
import { TABLE_InsuranceConsultants } from "./insurance-consultants";
import { TABLE_InvestmentConsultants } from "./investment-consultants";

export const TABLE_Transactions = sqliteTable("transactions", {
  id: int().primaryKey({ autoIncrement: true }),
  commissionPercentage: int(),
  externalProposalId: text(),
  externalPolicyId: text(),
  externalPolicyNumber: text(),
  product: text(),
  paymentInstallment: text(),
  paymentTimestamp: int({ mode: "timestamp" }),
  paymentTotalAmount: int(),
  paymentTotalCommission: int(),
  transactionType: text(),

  // Foreign keys
  policyHolderId: int()
    .notNull()
    .references(() => TABLE_PolicyHolders.id),
  insuranceCompanyId: int()
    .notNull()
    .references(() => TABLE_InsuranceCompanies.id),
  insuranceConsultantId: int().references(() => TABLE_InsuranceConsultants.id),
  investmentConsultantId: int().references(
    () => TABLE_InvestmentConsultants.id,
  ),
});
