import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const TABLE_PolicyHolders = sqliteTable("policy_holders", {
  id: int().primaryKey({ autoIncrement: true }),
  cpf: text().notNull().unique(),
  name: text().notNull(),
});
