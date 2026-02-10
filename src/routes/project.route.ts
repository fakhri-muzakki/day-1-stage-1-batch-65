import { Router } from 'express';
import projectController from '@/controllers/project.controller';
// import { validateHbs } from '../middlewares/validate';
// import { validateHbs } from '../../middlewares/validate';
import { validateHbs } from '@/middlewares/validate';
import {
  createProjectSchema,
  updateProjectSchema,
} from '@/validations/project.validation';
import { requireAuth } from '@/middlewares/requireAuth';

const router = Router();

router.get('/', requireAuth, projectController.renderProjects);
router.get('/:id', requireAuth, projectController.renderProjectById);

router.get('/:id/edit', requireAuth, projectController.renderEditById);
router.put(
  '/:id',
  validateHbs(updateProjectSchema),
  projectController.updateProject
);

router.post(
  '/',
  validateHbs(createProjectSchema),
  projectController.createProject
);
router.delete('/:id', projectController.deleteProject);

export default router;
