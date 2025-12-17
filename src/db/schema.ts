import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { exec } from "child_process"

exec("bunx drizzle-kit push", (error, stdout, stderr) => {
    if (error) {
        console.log("Error:", error.message)
        return
    }
    if (stderr) {
        console.log("Stderr:", stderr)
        return
    }
})
export const names = sqliteTable("names", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    fulfilled: integer("fulfilled").notNull().default(0),
    createdAt: integer("created_at").notNull(),
})