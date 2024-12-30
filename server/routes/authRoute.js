import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController';
import { isGuest, isAuth } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', isGuest, registerUser);
router.post('/login', isGuest, loginUser);
router.get('/logout', isAuth, logoutUser);

export default router;