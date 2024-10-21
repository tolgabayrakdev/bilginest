import express from 'express';
import { AuthController } from '../controllers/auth-controller';
import { verifyToken } from '../middlewares/verify-token';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/verify', verifyToken, authController.verify);
router.post('/logout', authController.logout);

export default router;