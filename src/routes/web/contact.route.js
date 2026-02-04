import { Router } from "express";
import contactController from "../../controllers/contact.controller.js";

const router = Router();

router.get("/", contactController.renderContactPage);

export default router;
