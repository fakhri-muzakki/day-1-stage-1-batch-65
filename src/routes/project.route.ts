import { Router } from 'express';
import projectController from '@/controllers/project.controller';
import { validateHbs } from '@/middlewares/validate';
import {
  createProjectSchema,
  updateProjectSchema,
} from '@/validations/project.validation';
import { requireAuth } from '@/middlewares/requireAuth';
import upload from '@/middlewares/upload';

const router = Router();

router.get('/', requireAuth, projectController.renderProjects);
router.get('/:id', requireAuth, projectController.renderProjectById);

router.get('/:id/edit', requireAuth, projectController.renderEditById);
router.put(
  '/:id',
  upload.single('image'),
  validateHbs(updateProjectSchema),
  projectController.updateProject
);

router.post(
  '/',
  upload.single('image'),
  validateHbs(createProjectSchema),
  projectController.createProject
);
router.delete('/:id', projectController.deleteProject);

export default router;
