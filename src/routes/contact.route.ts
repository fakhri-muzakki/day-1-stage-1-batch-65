import { Router } from 'express';
import contactController from '@/controllers/contact.controller';

const router = Router();

router.get('/', contactController.renderContact);

export default router;
