import path from "node:path";
import { migrate } from "drizzle-orm/libsql/migrator";
import { app } from "electron";
import { db } from "./db";
import { ResultService } from "../../shared/services/ResultService";
import { seedInsuranceCompanies } from "./seed/insurance-companies.seed";

const MIGRATIONS_FOLDER = app.isPackaged
  ? path.join(process.resourcesPath, "migrations")
  : path.join(process.cwd(), "src/main/db/migrations");

export async function initDatabase() {
  console.log(
    `Initializing database... [${app.isPackaged ? "PACKAGED" : "NOT_PACKAGED"}] ${MIGRATIONS_FOLDER}`,
  );

  const migrationResult = await ResultService.fromPromise(
    migrate(db, {
      migrationsFolder: MIGRATIONS_FOLDER,
    }),
    (error) => ({
      origin: "initDatabase",
      type: "Database error: could not apply migrations",
      error,
    }),
  );
  if (!migrationResult.ok) return migrationResult;

  const seedResult = await seedInsuranceCompanies();
  if (!seedResult.ok) return seedResult;

  return ResultService.ok("Database initialized");
}
