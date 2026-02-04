import { Router } from "express";
import projectController from "../../controllers/projects.controller.js";
import upload from "../../middlewares/upload.middleware.js";

const router = Router();

router.post(
  "/",
  upload.single("image"), // name="image"
  projectController.createProject,
);

export default router;
