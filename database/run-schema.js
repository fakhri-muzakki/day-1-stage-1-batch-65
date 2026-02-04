import fs from "fs";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg";
import env from "../src/configs/env.js";

const { Pool } = pkg;

// ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
});

async function runSchemas() {
  try {
    const schemaDir = path.join(__dirname, "schema");
    const files = fs
      .readdirSync(schemaDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const filePath = path.join(schemaDir, file);
      const sql = fs.readFileSync(filePath, "utf-8");

      console.log(`▶ Running ${file}`);
      await pool.query(sql);
    }

    console.log("✅ All schemas executed successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Schema execution failed");
    console.error(err);
    process.exit(1);
  }
}

runSchemas();
