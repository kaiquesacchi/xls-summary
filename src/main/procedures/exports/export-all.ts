import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { TABLE_InsurancePolicies } from "../../db/schemas/insurance-policies";
import { TABLE_PolicyHolders } from "../../db/schemas/policy-holders";
import { procedure } from "../../trpc/trpc.server";
import * as xlsx from "xlsx";
import { TABLE_InsuranceCompanies } from "../../db/schemas/insurance-companies";
import { TABLE_InsuranceConsultants } from "../../db/schemas/insurance-consultants";

const OUTPUT_FILE_NAME = "./output/teste.xlsx";
const SHEET_NAME = "Transações";

export const exportAll = procedure.mutation(async () => {
  const data = await fetchData();
  console.log(data);
  await writeToFile(data);
});

async function fetchData() {
  const result = await db
    .select({
      // Insurance Policy
      id: TABLE_InsurancePolicies.id,
      "ID da proposta": TABLE_InsurancePolicies.proposalId,
      "[ext] ID da apólice": TABLE_InsurancePolicies.externalPolicyId,
      "[ext] Número da apólice": TABLE_InsurancePolicies.externalPolicyNumber,
      Produto: TABLE_InsurancePolicies.product,
      Parcela: TABLE_InsurancePolicies.paymentInstallment,
      "Data do pagamento": TABLE_InsurancePolicies.paymentTimestamp,
      "Total pago": TABLE_InsurancePolicies.paymentTotalAmount,
      "Total da comissão": TABLE_InsurancePolicies.paymentTotalCommission,

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
    .from(TABLE_InsurancePolicies)
    .leftJoin(
      TABLE_PolicyHolders,
      eq(TABLE_PolicyHolders.id, TABLE_InsurancePolicies.policyHolderId),
    )
    .leftJoin(
      TABLE_InsuranceCompanies,
      eq(
        TABLE_InsuranceCompanies.id,
        TABLE_InsurancePolicies.insuranceCompanyId,
      ),
    )
    .leftJoin(
      TABLE_InsuranceConsultants,
      eq(
        TABLE_InsuranceConsultants.id,
        TABLE_InsurancePolicies.insuranceConsultantId,
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
