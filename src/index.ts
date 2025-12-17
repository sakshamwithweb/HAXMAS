import { Hono } from 'hono'
import { createName, deleteName, fulfillName, listNames } from './db/queries'
import fs from "fs"

const app = new Hono()

app.get("/", (c) => {
  const htmlCode = fs.readFileSync(`${__dirname}/index.html`).toString()
  return c.html(htmlCode)
})

app.get("/api/gift_receivers", (c) => c.json(listNames()))

app.post("/api/gift_receiver", async (c) => {
  const body = await c.req.json().catch(() => null)
  const name = (body?.name ?? "").toString().trim()
  if (!name) return c.json({ error: "name is required" }, 400)

  return c.json(createName(name), 201)
})

app.patch("/api/gift_receiver/:id/fulfill", (c) => {
  const id = Number(c.req.param("id"))
  if (!Number.isFinite(id)) return c.json({ error: "Bad ID" }, 400)

  const res = fulfillName(id)
  if (res.changes === 0) return c.json({ error: "Not Found" }, 404)

  return c.json({ ok: true })
})

app.delete("/api/gift_receiver/:id", (c) => {
  const id = Number(c.req.param("id"))
  if (!Number.isFinite(id)) return c.json({ error: "Bad Id" }, 400)

  const res = deleteName(id)
  if (res.changes === 0) return c.json({ error: "NOt found" }, 404)
  return c.json({ ok: true })
})

export default app