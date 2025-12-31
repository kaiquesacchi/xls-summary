import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/main/db/migrations",
  schema: "./src/main/db/schemas",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:./db.sqlite",
  },
});
