import { Router, Request, Response } from "express";
import { getDb } from "../db";

const router = Router();

// GET /api/users - List all users
router.get("/users", async (_req: Request, res: Response) => {
  const db = getDb();
  const users = await db.all("SELECT * FROM users ORDER BY created_at DESC");
  return res.json(users);
});

// GET /api/users/:id - Get a single user
router.get("/users/:id", async (req: Request, res: Response) => {
  const db = getDb();
  const user = await db.get("SELECT * FROM users WHERE id = ?", [req.params.id]);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
});

// POST /api/users - Create a new user
router.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const db = getDb();
  try {
    const result = await db.run(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
    const user = await db.get("SELECT * FROM users WHERE id = ?", [result.lastID]);
    return res.status(201).json(user);
  } catch (err: any) {
    if (err.code === "SQLITE_CONSTRAINT") {
      return res.status(409).json({ error: "Email already exists" });
    }
    throw err;
  }
});

// PUT /api/users/:id - Update a user
router.put("/users/:id", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const db = getDb();
  const result = await db.run(
    "UPDATE users SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [name, email, req.params.id]
  );
  if (result.changes === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  const user = await db.get("SELECT * FROM users WHERE id = ?", [req.params.id]);
  return res.json(user);
});

// DELETE /api/users/:id - Delete a user
router.delete("/users/:id", async (req: Request, res: Response) => {
  const db = getDb();
  const result = await db.run("DELETE FROM users WHERE id = ?", [req.params.id]);
  if (result.changes === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(204).send();
});

export default router;
