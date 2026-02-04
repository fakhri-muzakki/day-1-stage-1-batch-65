import { Pool } from "pg";
import env from "../configs/env.js";

// import pkg from "pg";
// const { Pool } = pkg;

const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error", err);
  process.exit(1);
});

export default pool;
