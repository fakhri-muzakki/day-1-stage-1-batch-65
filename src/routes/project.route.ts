import { Router } from 'express';
import projectController from '@/controllers/project.controller';
import { validateHbs } from '@/middlewares/validate';
import {
  createProjectSchema,
  updateProjectSchema,
} from '@/validations/project.validation';

const router = Router();

router.get('/', projectController.renderProjects);
router.get('/:id', projectController.renderProjectById);

router.get('/:id/edit', projectController.renderEditById);
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
