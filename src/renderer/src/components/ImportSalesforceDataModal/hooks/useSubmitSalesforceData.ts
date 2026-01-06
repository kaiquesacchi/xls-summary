import { trpc } from "@renderer/utils/trpc/trpc.client";
import { Result } from "react-spreadsheet-import/types/types";
import * as z from "zod";
import { ImportSalesforceDataProps } from "../types";

export function useSubmitSalesforceData(input: ImportSalesforceDataProps) {
  const importStatement = trpc.imports.importSalesforce.useMutation();

  return async function submitSalesforceData(rawData: Result<string>) {
    const parsed = StatementSchema.safeParse(rawData.validData);
    if (!parsed.success) {
      alert("Planilha inválida");
      console.error(parsed.error);
      return;
    }

    console.log(`Parsing successful: ${parsed.data.length.toString()} rows`);
    console.log(parsed.data.slice(0, 10));
    await importStatement
      .mutateAsync({
        rows: parsed.data.slice(0, 10),
      })
      .then((data) => {
        input.setImportResult(data);
      })
      .catch((error) => {
        alert((error as { message: string }).message);
      });
  };
}

const SalesforceRowSchema = z.object({
  /* -------------------------- Policy Holder data -------------------------- */
  policyHolderName: z.string(),
  policyHolderCpf: z.string(),
  /* ------------------------------ Policy data ----------------------------- */
  externalPolicyNumber: z.string(),
  /* ------------------------ Insurance Company data ------------------------ */
  insuranceCompanyName: z.string(),
  /* ----------------------- Insurance Consultant data ---------------------- */
  insuranceConsultantName: z.string(),
  insuranceConsultantEmail: z.string(),
  /* ---------------------- Investment Consultant data ---------------------- */
  investmentConsultantName: z.string(),
  investmentConsultantEmail: z.string(),
});

const StatementSchema = z.array(SalesforceRowSchema);
