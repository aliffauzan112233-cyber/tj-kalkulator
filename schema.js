import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const calculations = pgTable("calculations", {
  id: serial("id").primaryKey(),
  expression: text("expression"),
  result: text("result"),
  createdAt: timestamp("created_at").defaultNow()
});