import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const TABLE_InsuranceConsultants = sqliteTable("insurance_consultants", {
  id: int().primaryKey({ autoIncrement: true }),
  cpf: text().notNull().unique(),
  name: text().notNull(),
  email: text().notNull(),
});
