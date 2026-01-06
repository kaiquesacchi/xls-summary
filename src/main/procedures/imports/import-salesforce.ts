import * as z from "zod";
import { procedure } from "../../trpc/trpc.server";
import { DateTime } from "luxon";
import { Result, ResultService } from "../../../shared/services/ResultService";
import { db } from "../../db/db";
import { chunk } from "lodash";
import { TABLE_PolicyHolders } from "../../db/schemas/policy-holders";
import { ResultSet } from "@libsql/client";
import { isNull } from "drizzle-orm";
import { TABLE_InvestmentConsultants } from "../../db/schemas/investment-consultants";
import { TABLE_InsuranceConsultants } from "../../db/schemas/insurance-consultants";

const CHUNK_SIZE = 50;

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

const InputSchema = z.object({
  rows: z.array(SalesforceRowSchema),
});

export const importSalesforce = procedure
  .input(InputSchema)
  .mutation(async ({ input, ctx }) => {
    const upsertInsuranceConsultantsResult = await upsertInsuranceConsultants();
    const upsertInvestmentConsultantsResult =
      await upsertInvestmentConsultants();
    const upsertPolicyHoldersResult = await upsertPolicyHolders();

    return {
      upsertInsuranceConsultants: upsertInsuranceConsultantsResult.ok
        ? upsertInsuranceConsultantsResult.value
        : upsertInsuranceConsultantsResult.error.error.message,
      upsertInvestmentConsultants: upsertInvestmentConsultantsResult.ok
        ? upsertInvestmentConsultantsResult.value
        : upsertInvestmentConsultantsResult.error.error.message,
      upsertPolicyHolders: upsertPolicyHoldersResult.ok
        ? upsertPolicyHoldersResult.value
        : upsertPolicyHoldersResult.error.error.message,
    };

    async function upsertInsuranceConsultants() {
      ctx.execLog.set(
        "upsertInsuranceConsultants.start",
        DateTime.now().toISO(),
      );
      const insuranceConsultants = getInsuranceConsultants();

      if (!insuranceConsultants.length) {
        // Prevents DB crash when inserting empty array
        return handleReturn(
          ResultService.ok(
            "[0/0] No insurance-consultants' data on spreadsheet",
          ),
        );
      }
      ctx.execLog.set(
        "upsertInsuranceConsultants.length",
        insuranceConsultants.length,
      );

      const result = await upsert();
      return handleReturn(result);

      function getInsuranceConsultants() {
        return input.rows.map((row) => ({
          name: row.insuranceConsultantName,
          email: row.insuranceConsultantEmail,
        }));
      }

      async function upsert() {
        const result = await ResultService.fromPromise(
          db.transaction(async (tx) => {
            const chunks = chunk(insuranceConsultants, CHUNK_SIZE);
            const upsertResults: ResultSet[] = [];
            for (const c of chunks) {
              const chunkUpsertResult = await tx
                .insert(TABLE_InsuranceConsultants)
                .values(c)
                .onConflictDoUpdate({
                  target: TABLE_InsuranceConsultants.email,
                  setWhere: isNull(TABLE_InsuranceConsultants.name),
                  set: {
                    name: TABLE_InsuranceConsultants.name,
                  },
                });
              upsertResults.push(chunkUpsertResult);
            }
            return upsertResults;
          }),
          (error) => ({
            origin: "upsertInsuranceConsultants",
            type: "Database error: upsert policy holders",
            error,
          }),
        );

        if (!result.ok) return result;
        const rowsAffected = result.value.reduce(
          (acc, r) => acc + r.rowsAffected,
          0,
        );

        return ResultService.ok(
          `[${rowsAffected}/${insuranceConsultants.length}] Upserted insurance consultants`,
        );
      }

      function handleReturn<TValue, TError extends string>(
        result: Result<TValue, TError>,
      ) {
        ctx.execLog.set("upsertInsuranceConsultants.result", result);
        ctx.execLog.set(
          "upsertInsuranceConsultants.end",
          DateTime.now().toISO(),
        );
        return result;
      }
    }

    async function upsertInvestmentConsultants() {
      ctx.execLog.set(
        "upsertInvestmentConsultants.start",
        DateTime.now().toISO(),
      );
      const investmentConsultants = getInvestmentConsultants();

      if (!investmentConsultants.length) {
        // Prevents DB crash when inserting empty array
        return handleReturn(
          ResultService.ok(
            "[0/0] No investment-consultants' data on spreadsheet",
          ),
        );
      }
      ctx.execLog.set(
        "upsertInvestmentConsultants.length",
        investmentConsultants.length,
      );

      const result = await upsert();
      return handleReturn(result);

      function getInvestmentConsultants() {
        return input.rows.map((row) => ({
          name: row.investmentConsultantName,
          email: row.investmentConsultantEmail,
        }));
      }

      async function upsert() {
        const result = await ResultService.fromPromise(
          db.transaction(async (tx) => {
            const chunks = chunk(investmentConsultants, CHUNK_SIZE);
            const upsertResults: ResultSet[] = [];
            for (const c of chunks) {
              const chunkUpsertResult = await tx
                .insert(TABLE_InvestmentConsultants)
                .values(c)
                .onConflictDoUpdate({
                  target: TABLE_InvestmentConsultants.email,
                  setWhere: isNull(TABLE_InvestmentConsultants.name),
                  set: {
                    name: TABLE_InvestmentConsultants.name,
                  },
                });
              upsertResults.push(chunkUpsertResult);
            }
            return upsertResults;
          }),
          (error) => ({
            origin: "upsertInvestmentConsultants",
            type: "Database error: upsert policy holders",
            error,
          }),
        );

        if (!result.ok) return result;
        const rowsAffected = result.value.reduce(
          (acc, r) => acc + r.rowsAffected,
          0,
        );

        return ResultService.ok(
          `[${rowsAffected}/${investmentConsultants.length}] Upserted investment consultants`,
        );
      }

      function handleReturn<TValue, TError extends string>(
        result: Result<TValue, TError>,
      ) {
        ctx.execLog.set("upsertInvestmentConsultants.result", result);
        ctx.execLog.set(
          "upsertInvestmentConsultants.end",
          DateTime.now().toISO(),
        );
        return result;
      }
    }

    async function upsertPolicyHolders() {
      ctx.execLog.set("upsertPolicyHolders.start", DateTime.now().toISO());
      const policyHolders = getPolicyHolders();

      if (!policyHolders.length) {
        // Prevents DB crash when inserting empty array
        return handleReturn(
          ResultService.ok("[0/0] No policy-holders' data on spreadsheet"),
        );
      }
      ctx.execLog.set("upsertPolicyHolders.length", policyHolders.length);

      const result = await upsert();
      return handleReturn(result);

      function getPolicyHolders() {
        return input.rows.map((row) => ({
          name: row.policyHolderName,
          cpf: row.policyHolderCpf,
        }));
      }

      async function upsert() {
        const result = await ResultService.fromPromise(
          db.transaction(async (tx) => {
            const chunks = chunk(policyHolders, CHUNK_SIZE);
            const upsertResults: ResultSet[] = [];
            for (const c of chunks) {
              const chunkUpsertResult = await tx
                .insert(TABLE_PolicyHolders)
                .values(c)
                .onConflictDoUpdate({
                  target: TABLE_PolicyHolders.cpf,
                  setWhere: isNull(TABLE_PolicyHolders.name),
                  set: {
                    name: TABLE_PolicyHolders.name,
                  },
                });
              upsertResults.push(chunkUpsertResult);
            }
            return upsertResults;
          }),
          (error) => ({
            origin: "upsertPolicyHolders",
            type: "Database error: upsert policy holders",
            error,
          }),
        );

        if (!result.ok) return result;
        const rowsAffected = result.value.reduce(
          (acc, r) => acc + r.rowsAffected,
          0,
        );

        return ResultService.ok(
          `[${rowsAffected}/${policyHolders.length}] Upserted policy holders`,
        );
      }

      function handleReturn<TValue, TError extends string>(
        result: Result<TValue, TError>,
      ) {
        ctx.execLog.set("upsertPolicyHolders.result", result);
        ctx.execLog.set("upsertPolicyHolders.end", DateTime.now().toISO());
        return result;
      }
    }
  });
