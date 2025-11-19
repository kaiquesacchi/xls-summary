import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const TABLE_InsuranceCompanies = sqliteTable("insurance_companies", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
});
