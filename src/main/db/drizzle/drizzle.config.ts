import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "../db";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/main/db/schemas",
  dialect: "sqlite",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
