import { Router } from 'express';
import homeController from '@/controllers/home.controller';
import { requireAuth } from '@/middlewares/requireAuth';

const router = Router();

router.get('/', requireAuth, homeController.renderHome);

export default router;
