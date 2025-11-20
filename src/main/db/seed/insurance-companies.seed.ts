import { db } from "../db";
import { TABLE_InsuranceCompanies } from "../schemas/insurance-companies";

const insuranceCompanies = ["Azos", "Icatu"] as const;

export async function seedInsuranceCompanies() {
  return db
    .insert(TABLE_InsuranceCompanies)
    .values(insuranceCompanies.map((name) => ({ name })))
    .onConflictDoNothing()
    .returning({ id: TABLE_InsuranceCompanies.id });
}
