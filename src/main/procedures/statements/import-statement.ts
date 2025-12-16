import { db } from "../../db/db";
import { isNull, inArray } from "drizzle-orm";
import { TABLE_PolicyHolders } from "../../db/schemas/policy-holders";
import { procedure } from "../../trpc/trpc.server";
import * as z from "zod";
import { TABLE_InsuranceConsultants } from "../../db/schemas/insurance-consultants";
import { TABLE_InsurancePolicies } from "../../db/schemas/insurance-policies";
import { TRPCError } from "@trpc/server";
import { parse } from "date-fns";

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

export const StatementSchema = z.array(StatementRowSchema);

const InputSchema = z.object({
  insuranceCompanyId: z.number(),
  statement: StatementSchema,
});

export const importStatements = procedure
  .input(InputSchema)
  .mutation(async ({ input }) => {
    await upsertPolicyHolders();
    await upsertInsuranceConsultants();
    await insertPolicies();

    return {};

    /* ------------------------- Auxiliary functions ------------------------ */

    /** Upsert policy holders when possible (CPF available) */
    async function upsertPolicyHolders() {
      const policyHolders = input.statement.map((row) => ({
        name: row.policyHolderName,
        cpf: row.policyHolderCpf,
      }));

      const result = await db
        .insert(TABLE_PolicyHolders)
        .values(policyHolders)
        .onConflictDoUpdate({
          target: TABLE_PolicyHolders.cpf,
          setWhere: isNull(TABLE_PolicyHolders.name),
          set: {
            name: TABLE_PolicyHolders.name,
          },
        });
      console.log("upsertPolicyHolders", result);
    }

    /** Upsert insurance consultants when possible (email available) */
    async function upsertInsuranceConsultants() {
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

      const result = await db
        .insert(TABLE_InsuranceConsultants)
        .values(insuranceConsultants)
        .onConflictDoNothing();

      console.log("upsertInsuranceConsultants", result);
    }

    /** Insert policies */
    async function insertPolicies() {
      const insuranceConsultantsMap = await getInsuranceConsultantsMap();
      const policyHoldersMap = await getPolicyHoldersMap();

      const policies = input.statement.map((row) => {
        const insuranceConsultantId = row.insuranceConsultantEmail
          ? insuranceConsultantsMap.get(row.insuranceConsultantEmail)
          : null;

        const policyHolderId = row.policyHolderCpf
          ? policyHoldersMap.get(row.policyHolderCpf)
          : null;

        if (!policyHolderId) {
          console.error("Policy holder not found", row);
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Policy holder not found: ${row.policyHolderCpf} - ${row.policyHolderName}`,
            cause: row,
          });
        }

        return {
          // Policy
          proposalId: row.proposalId,
          externalPolicyId: row.externalPolicyId,
          externalPolicyNumber: row.externalPolicyNumber,
          product: row.product,
          paymentInstallment: row.paymentInstallment,
          paymentTimestamp: row.paymentTimestamp
            ? parse(row.paymentTimestamp, "dd/MM/yyyy", new Date())
            : undefined,
          paymentTotalAmount: row.paymentTotalAmount
            ? Number(row.paymentTotalAmount)
            : undefined,
          paymentTotalCommission: row.paymentTotalCommission
            ? Number(row.paymentTotalCommission)
            : undefined,

          // Insurance company
          insuranceCompanyId: input.insuranceCompanyId,

          // Insurance consultant
          insuranceConsultantId,

          // Policy holder
          policyHolderId,
        } satisfies typeof TABLE_InsurancePolicies.$inferInsert;
      });

      console.log(
        `insertPolicies: ready to insert ${policies.length.toString()} rows`,
      );

      const result = await db.insert(TABLE_InsurancePolicies).values(policies);

      console.log("insertPolicies: result", result);

      return true;

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
    }
  });
