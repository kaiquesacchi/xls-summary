import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { TABLE_Transactions } from "../../db/schemas/transactions";
import { TABLE_PolicyHolders } from "../../db/schemas/policy-holders";
import { procedure } from "../../trpc/trpc.server";
import * as xlsx from "xlsx";
import { TABLE_InsuranceCompanies } from "../../db/schemas/insurance-companies";
import { TABLE_InsuranceConsultants } from "../../db/schemas/insurance-consultants";

const OUTPUT_FILE_NAME = "./output/teste.xlsx";
const SHEET_NAME = "Transações";

export const exportAll = procedure.mutation(async () => {
  const data = await fetchData();
  console.log("First records...", data.slice(0, 2));
  await writeToFile(data);
});

async function fetchData() {
  const result = await db
    .select({
      // Insurance Policy
      id: TABLE_Transactions.id,
      "[ext] ID da proposta": TABLE_Transactions.externalProposalId,
      "[ext] ID da apólice": TABLE_Transactions.externalPolicyId,
      "[ext] Número da apólice": TABLE_Transactions.externalPolicyNumber,
      Produto: TABLE_Transactions.product,
      Parcela: TABLE_Transactions.paymentInstallment,
      "Data do pagamento": TABLE_Transactions.paymentTimestamp,
      "Total pago": TABLE_Transactions.paymentTotalAmount,
      "Total da comissão": TABLE_Transactions.paymentTotalCommission,
      "Porcentagem da comissão": TABLE_Transactions.commissionPercentage,
      "Tipo de transação": TABLE_Transactions.transactionType,

      // Insurance Company
      Seguradora: TABLE_InsuranceCompanies.name,

      // Insurance Consultant
      "[Consultor] CPF": TABLE_InsuranceConsultants.cpf,
      "[Consultor] E-mail": TABLE_InsuranceConsultants.email,
      "[Consultor] Nome": TABLE_InsuranceConsultants.name,

      // Policy Holder
      "[Cliente] CPF": TABLE_PolicyHolders.cpf,
      "[Cliente] Nome": TABLE_PolicyHolders.name,
    })
    .from(TABLE_Transactions)
    .leftJoin(
      TABLE_PolicyHolders,
      eq(TABLE_PolicyHolders.id, TABLE_Transactions.policyHolderId),
    )
    .leftJoin(
      TABLE_InsuranceCompanies,
      eq(TABLE_InsuranceCompanies.id, TABLE_Transactions.insuranceCompanyId),
    )
    .leftJoin(
      TABLE_InsuranceConsultants,
      eq(
        TABLE_InsuranceConsultants.id,
        TABLE_Transactions.insuranceConsultantId,
      ),
    );

  return result;
}

async function writeToFile(data: Awaited<ReturnType<typeof fetchData>>) {
  const SHEET_Transactions = xlsx.utils.json_to_sheet(data);
  const WORKBOOK = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(WORKBOOK, SHEET_Transactions, SHEET_NAME);
  await xlsx.writeFileXLSX(WORKBOOK, OUTPUT_FILE_NAME);
}
