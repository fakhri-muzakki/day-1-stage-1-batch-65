import { Router } from 'express';
import homeRoutes from './home.route';
import contactRoutes from './contact.route';
import projectRoutes from './project.route';

const router = Router();

router.use('/', homeRoutes);
router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);

export default router;
