import { serve } from "@hono/node-server";
import { Hono } from "hono";
import postgres from "postgres";
const sql = postgres({
    host: "db",
    port: 5432,
    username: "postgres",
    password: "melker",
    database: "students",
});
const app = new Hono();
app.get("/students/:id", async (c) => {
    const query = c.req.param("id");
    const students = await sql `
    SELECT * 
    FROM people
    WHERE id ILIKE ${"%" + query + "%"}
  `;
    return c.json(students);
});
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);
serve({
    fetch: app.fetch,
    port,
});
