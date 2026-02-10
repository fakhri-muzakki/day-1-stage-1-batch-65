import { Router } from 'express';
import homeRoutes from './home.route';
import contactRoutes from './contact.route';
import projectRoutes from './project.route';
import userRoutes from './user.route';
import authRoutes from './auth.route';

const router = Router();

router.use('/', homeRoutes);
router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);
router.use('/users', userRoutes);
router.use('/', authRoutes);

export default router;
