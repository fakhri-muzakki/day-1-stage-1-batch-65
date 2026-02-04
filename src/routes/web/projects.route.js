import { Router } from "express";
import projectController from "../../controllers/projects.controller.js";

const router = Router();

router.get("/", projectController.renderProjectsPage);
router.get("/:id", projectController.renderProjectById);

export default router;
