import "dotenv/config";

import app from "./app.js";
import env from "./configs/env.js";
import pool from "./database/index.js";

const PORT = env.app.port;

async function startServer() {
  try {
    // Test DB connection
    await pool.query("SELECT 1");
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ GAGAL MENJALANKAN SERVER");
    console.error("👉 Database kamu belum dijalankan atau tidak bisa diakses.");
    console.error("👉 Pastikan PostgreSQL aktif dan konfigurasi .env benar.");
    // console.error(err);
    process.exit(1);
  }
}

startServer();
