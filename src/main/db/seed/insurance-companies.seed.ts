import { ResultService } from "../../../shared/services/ResultService";
import { db } from "../db";
import { TABLE_InsuranceCompanies } from "../schemas/insurance-companies";

const insuranceCompanies = [
  "Azos",
  "Icatu",
  "Mag",
  "Omint",
  "Prudential",
  "Unimed",
] as const;

export async function seedInsuranceCompanies() {
  return ResultService.fromPromise(
    db
      .insert(TABLE_InsuranceCompanies)
      .values(insuranceCompanies.map((name) => ({ name })))
      .onConflictDoNothing()
      .returning({ id: TABLE_InsuranceCompanies.id }),
    (error) => {
      return {
        origin: "seedInsuranceCompanies",
        type: "Database error: could not seed insurance companies",
        error,
      };
    },
  );
}
