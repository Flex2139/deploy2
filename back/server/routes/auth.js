import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/auth/register', register);

router.post('/auth/login', login);

router.get('/users/me', protect, me);

export default router;
