import { Router } from 'express';
import authController from '@/controllers/auth.controller';
import { validateHbs } from '@/middlewares/validate';
import { loginSchema, registerSchema } from '@/validations/auth.validation';
import { requireGuest } from '@/middlewares/requireGuest';

const router = Router();

router.get('/login', requireGuest, authController.renderLogin);
router.get('/register', requireGuest, authController.renderRegiter);

router.get('/logout', authController.logout);

router.post('/login', validateHbs(loginSchema), authController.login);
router.post('/register', validateHbs(registerSchema), authController.register);

export default router;
