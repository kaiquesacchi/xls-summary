import path from "node:path";
import { migrate } from "drizzle-orm/libsql/migrator";
import { app } from "electron";
import { db } from "./db";

const MIGRATIONS_FOLDER = app.isPackaged
  ? path.join(process.resourcesPath, "migrations")
  : path.join(process.cwd(), "src/main/db/migrations");

export async function initDatabase() {
  console.log(`Initializing database... ${MIGRATIONS_FOLDER}`);
  await migrate(db, {
    migrationsFolder: MIGRATIONS_FOLDER,
  });
  console.log("Database initialized");
}
