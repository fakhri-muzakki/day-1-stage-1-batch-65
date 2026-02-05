import { Router } from "express";
import homeRoutes from "./web/home.route.js";
import contactRoutes from "./web/contact.route.js";
import projectsRoutes from "./web/projects.route.js";

const router = Router();

router.use("/", homeRoutes);
router.use("/contact", contactRoutes);
router.use("/projects", projectsRoutes);

export default router;
