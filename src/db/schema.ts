import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const names = sqliteTable("names", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    fulfilled: integer("fulfilled").notNull().default(0),
    createdAt: integer("created_at").notNull(),
})