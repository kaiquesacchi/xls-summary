import { db } from "../../db/db";
import { isNull, inArray } from "drizzle-orm";
import { TABLE_PolicyHolders } from "../../db/schemas/policy-holders";
import { procedure } from "../../trpc/trpc.server";
import * as z from "zod";
import { TABLE_InsuranceConsultants } from "../../db/schemas/insurance-consultants";
import { TABLE_InsurancePolicies } from "../../db/schemas/insurance-policies";
import { ResultService } from "../../../shared/services/ResultService";
import { DateParsers } from "../../../shared/parsers/DateParsers";
import { CurrencyParsers } from "../../../shared/parsers/CurrencyParsers";

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

type StatementRow = z.infer<typeof StatementRowSchema>;
export const StatementSchema = z.array(StatementRowSchema);

const InputSchema = z.object({
  insuranceCompanyId: z.number(),
  statement: StatementSchema,
});

export const importStatements = procedure
  .input(InputSchema)
  .mutation(async ({ input }) => {
    console.log(
      "Importing statement. First few rows:",
      input.statement.slice(0, 5),
    );

    const upsertPolicyHoldersResult = await upsertPolicyHolders();
    const insertInsuranceConsultantsResult = await insertInsuranceConsultants();
    const insertPoliciesResult = await insertPolicies();

    return {
      upsertPolicyHolders: upsertPolicyHoldersResult.ok
        ? upsertPolicyHoldersResult.value
        : upsertPolicyHoldersResult.error.error.message,
      insertInsuranceConsultants: insertInsuranceConsultantsResult.ok
        ? insertInsuranceConsultantsResult.value
        : insertInsuranceConsultantsResult.error.error.message,
      insertPolicies: insertPoliciesResult.ok
        ? insertPoliciesResult.value
        : insertPoliciesResult.error.error.message,
    };

    /* ------------------------- Auxiliary functions ------------------------ */

    /** Upsert policy holders when possible (CPF available) */
    async function upsertPolicyHolders() {
      const policyHolders = input.statement.map((row) => ({
        name: row.policyHolderName,
        cpf: row.policyHolderCpf,
      }));

      if (!policyHolders.length) {
        // Prevents DB crash when inserting empty array
        console.log("No policy holders to upsert");
        return ResultService.ok("0/0");
      }

      console.log(`Inserting ${policyHolders.length} policy holders...`);

      const result = await ResultService.fromPromise(
        db
          .insert(TABLE_PolicyHolders)
          .values(policyHolders)
          .onConflictDoUpdate({
            target: TABLE_PolicyHolders.cpf,
            setWhere: isNull(TABLE_PolicyHolders.name),
            set: {
              name: TABLE_PolicyHolders.name,
            },
          }),
        (error) => ({
          origin: "upsertPolicyHolders",
          type: "Database error: upsert policy holders",
          error,
        }),
      );

      if (!result.ok) return result;
      return ResultService.ok(
        `${result.value.rowsAffected}/${input.statement.length}`,
      );
    }

    /** Upsert insurance consultants when possible (email available) */
    async function insertInsuranceConsultants() {
      const insuranceConsultants = input.statement.reduce<{ email: string }[]>(
        (consultants, row) => {
          if (row.insuranceConsultantEmail !== undefined) {
            consultants.push({
              email: row.insuranceConsultantEmail,
            });
          }
          return consultants;
        },
        [],
      );

      if (!insuranceConsultants.length) {
        // Prevents DB crash when inserting empty array
        console.log("No insurance consultants to upsert");
        return ResultService.ok("0/0");
      }

      console.log(
        `Inserting ${insuranceConsultants.length} insurance consultants...`,
      );

      const result = await ResultService.fromPromise(
        db
          .insert(TABLE_InsuranceConsultants)
          .values(insuranceConsultants)
          .onConflictDoNothing(),
        (error) => ({
          origin: "upsertPolicyHolders",
          type: "Database error: insert insurance consultants",
          error,
        }),
      );

      if (!result.ok) return result;
      return ResultService.ok(
        `${result.value.rowsAffected}/${input.statement.length}`,
      );
    }

    /** Insert policies */
    async function insertPolicies() {
      const insuranceConsultantsMap = await getInsuranceConsultantsMap();
      const policyHoldersMap = await getPolicyHoldersMap();
      const { formattedPolicies, incompletePolicies } = formatPolicies();

      console.log(
        `insertPolicies: ready to insert ${formattedPolicies.length} rows`,
        `skipping ${incompletePolicies.length} rows (no policy holder found)`,
        incompletePolicies,
      );

      const result = await ResultService.fromPromise(
        db.insert(TABLE_InsurancePolicies).values(formattedPolicies),
        (error) => ({
          origin: "insertPolicies",
          type: "Database error: insert policies",
          error,
        }),
      );

      if (!result.ok) return result;
      return ResultService.ok(
        `${result.value.rowsAffected}/${input.statement.length} - [${incompletePolicies.length} skipped]`,
      );

      async function getInsuranceConsultantsMap() {
        const insuranceConsultantsEmails = new Set(
          input.statement.map((row) => row.insuranceConsultantEmail ?? ""),
        );
        insuranceConsultantsEmails.delete("");

        const insuranceConsultants = await db
          .select({
            email: TABLE_InsuranceConsultants.email,
            id: TABLE_InsuranceConsultants.id,
          })
          .from(TABLE_InsuranceConsultants)
          .where(
            inArray(
              TABLE_InsuranceConsultants.email,
              Array.from(insuranceConsultantsEmails),
            ),
          );

        const insuranceConsultantsMap = new Map<string, number>(
          insuranceConsultants.map(({ email, id }) => [email, id]),
        );

        return insuranceConsultantsMap;
      }

      async function getPolicyHoldersMap() {
        const policyHoldersCpf = new Set(
          input.statement.map((row) => row.policyHolderCpf),
        );
        policyHoldersCpf.delete("");

        const policyHolders = await db
          .select({
            cpf: TABLE_PolicyHolders.cpf,
            id: TABLE_PolicyHolders.id,
          })
          .from(TABLE_PolicyHolders)
          .where(
            inArray(TABLE_PolicyHolders.cpf, Array.from(policyHoldersCpf)),
          );

        const policyHoldersMap = new Map<string, number>(
          policyHolders.map(({ cpf, id }) => [cpf, id]),
        );

        return policyHoldersMap;
      }

      /** Format policies to be inserted. Skips incomplete policies */
      function formatPolicies() {
        const incompletePolicies: StatementRow[] = [];
        const formattedPolicies: (typeof TABLE_InsurancePolicies.$inferInsert)[] =
          [];

        input.statement.forEach((row) => {
          const insuranceConsultantId = getInsuranceConsultantId(row);
          const policyHolderId = getPolicyHolderId(row);
          const paymentTimestamp = getPaymentTimestamp(row);
          const paymentTotalAmount = getPaymentTotalAmount(row);
          const paymentTotalCommission = getPaymentTotalCommission(row);

          /** Checks if:
           * - Required fields are present
           * - Available fields were successfully parsed
           */
          if (
            !policyHolderId ||
            !paymentTimestamp.ok ||
            !paymentTotalAmount.ok ||
            !paymentTotalCommission.ok
          ) {
            incompletePolicies.push(row);
            return;
          }

          formattedPolicies.push({
            // Policy
            proposalId: row.proposalId,
            externalPolicyId: row.externalPolicyId,
            externalPolicyNumber: row.externalPolicyNumber,
            product: row.product,
            paymentInstallment: row.paymentInstallment,
            paymentTimestamp: paymentTimestamp.value,
            paymentTotalAmount: paymentTotalAmount.value,
            paymentTotalCommission: paymentTotalCommission.value,

            // Insurance company
            insuranceCompanyId: input.insuranceCompanyId,

            // Insurance consultant
            insuranceConsultantId,

            // Policy holder
            policyHolderId,
          });
        });

        return { formattedPolicies, incompletePolicies };

        function getInsuranceConsultantId(row: StatementRow) {
          return row.insuranceConsultantEmail
            ? insuranceConsultantsMap.get(row.insuranceConsultantEmail)
            : null;
        }

        function getPolicyHolderId(row: StatementRow) {
          return row.policyHolderCpf
            ? policyHoldersMap.get(row.policyHolderCpf)
            : null;
        }

        function getPaymentTimestamp(row: StatementRow) {
          if (!row.paymentTimestamp) return ResultService.ok(null);
          return DateParsers.fromDirtyString(row.paymentTimestamp);
        }

        function getPaymentTotalAmount(row: StatementRow) {
          if (!row.paymentTotalAmount) return ResultService.ok(null);
          return CurrencyParsers.fromDirtyString(row.paymentTotalAmount);
        }

        function getPaymentTotalCommission(row: StatementRow) {
          if (!row.paymentTotalCommission) return ResultService.ok(null);
          return CurrencyParsers.fromDirtyString(row.paymentTotalCommission);
        }
      }
    }
  });
