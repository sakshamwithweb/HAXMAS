import { desc, eq } from "drizzle-orm";
import { db } from "./index";
import { names } from "./schema";

export const listNames = () => {
    return db.select().from(names).orderBy(desc(names.id)).all()
}

export const createName = (name: string) => {
    const createdAt = Math.floor(Date.now() / 1000)
    const res = db.insert(names).values({
        name: name,
        fulfilled: 0, // 0 = false, 1 = true
        createdAt: createdAt
    }).run()

    return { id: Number(res.lastInsertRowid) }
}

export const fulfillName = (id: number) => {
    const res = db.update(names).set({ fulfilled: 1 }).where(eq(names.id, id)).run()

    return { changes: res.changes }
}

export const deleteName = (id: number) => {
    const res = db.delete(names).where(eq(names.id, id)).run()

    return {changes: res.changes}
}