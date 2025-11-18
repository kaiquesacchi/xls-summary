import { defineConfig } from "drizzle-kit";
import {DATABASE_URL} from "../main/db/init"

export default defineConfig({
  out: "./drizzle",
  schema: "./src/main/db/schemas",
  dialect: "sqlite",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
