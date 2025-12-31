import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import path from "path";
import { app } from "electron";

const dbPath = app.isPackaged
  ? path.join(app.getPath("userData"), "db.sqlite")
  : path.join(process.cwd(), "db.sqlite");

export const DATABASE_URL = `file:${dbPath}`;

const client = createClient({
  url: DATABASE_URL,
});

export const db = drizzle(client);
