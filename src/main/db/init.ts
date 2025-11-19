import { drizzle } from "drizzle-orm/libsql";

export const DATABASE_URL = "file:./db.sqlite";
export const db = drizzle(DATABASE_URL);
