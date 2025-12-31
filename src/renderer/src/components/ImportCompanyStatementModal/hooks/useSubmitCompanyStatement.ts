import { trpc } from "@renderer/utils/trpc/trpc.client";
import { Result } from "react-spreadsheet-import/types/types";
import * as z from "zod";
import { ImportCompanyStatementModalProps } from "../types";

export function useSubmitCompanyStatement(
  input: ImportCompanyStatementModalProps,
) {
  const importStatement = trpc.statements.importStatements.useMutation();

  return async function submitCompanyStatement(rawData: Result<string>) {
    const parsed = StatementSchema.safeParse(rawData.validData);
    if (!parsed.success) {
      alert("Planilha inválida");
      console.error(parsed.error);
      return;
    }

    console.log(`Parsing successful: ${parsed.data.length.toString()} rows`);
    await importStatement
      .mutateAsync({
        insuranceCompanyId: input.insuranceCompanyId,
        statement: parsed.data.slice(0, 50),
      })
      .then((data) => {
        console.log("THEN", data);
        input.setImportResult(data);
      })
      .catch((error) => {
        alert((error as { message: string }).message);
        console.error("CATCH", error);
      });
  };
}

const StatementRowSchema = z.object({
  /* -------------------------- Policy Holder data -------------------------- */
  policyHolderName: z.string(),
  policyHolderCpf: z.string(),
  /* ------------------------------ Policy data ----------------------------- */
  externalPolicyId: z.string().optional(),
  externalPolicyNumber: z.string().optional(),
  product: z.string().optional(),
  paymentInstallment: z.string().optional(),
  paymentTimestamp: z.string().optional(),
  paymentTotalAmount: z.string().optional(),
  paymentTotalCommission: z.string().optional(),
  proposalId: z.string().optional(),
  /* ----------------------- Insurance Consultant data ---------------------- */
  insuranceConsultantEmail: z.string().optional(),
});

const StatementSchema = z.array(StatementRowSchema);
