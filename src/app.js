/**
 * Pake express-handlebars
 */

// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import { engine } from "express-handlebars";

// import webRoutes from "./routes/web.route.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// app.engine(
//   "hbs",
//   engine({
//     extname: ".hbs",
//     defaultLayout: "main",
//     layoutsDir: path.join(__dirname, "views/layouts"),
//     partialsDir: path.join(__dirname, "views/partials"),
//   }),
// );

// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "views"));

// app.use(express.static(path.join(__dirname, "public")));
// app.use("/", webRoutes);

// export default app;

/**
 * Pake hbs
 */

import express from "express";
import path from "path";
import hbs from "hbs";
import { fileURLToPath } from "url";

import webRoutes from "./routes/web.route.js";

// ==================
// ESM __dirname FIX
// ==================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ==================
// VIEW ENGINE
// ==================
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

hbs.registerPartials(path.join(__dirname, "views/partials"));

// ==================
// STATIC FILES
// ==================
app.use(express.static(path.join(__dirname, "public")));

// ==================
// ROUTES
// ==================
app.use("/", webRoutes);

export default app;
