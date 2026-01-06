import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const TABLE_InvestmentConsultants = sqliteTable(
  "investment_consultants",
  {
    id: int().primaryKey({ autoIncrement: true }),
    cpf: text().unique(),
    email: text().notNull().unique(),
    name: text().notNull(),
  },
);
