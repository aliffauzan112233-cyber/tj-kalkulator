require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
const { calculations } = require("./schema");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ================= DATABASE ================= */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

const db = drizzle(pool);

/* ================= ROUTES ================= */
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// SAVE DATA
app.post("/save", async (req, res) => {
  const { expression, result } = req.body;

  try {
    await db.insert(calculations).values({
      expression,
      result,
    });

    res.json({ message: "Saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save" });
  }
});

// GET HISTORY
app.get("/history", async (req, res) => {
  try {
    const data = await db.select().from(calculations);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
});

/* ================= LOCAL SERVER ================= */

// Kalau dijalankan lokal → pakai port
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

/* ================= EXPORT FOR VERCEL ================= */

module.exports = app;