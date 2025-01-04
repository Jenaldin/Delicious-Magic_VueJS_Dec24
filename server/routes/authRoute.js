import express from 'express';
import { registerUser, loginUser, logoutUser, getUser, editUser, addFavorite } from '../controllers/authController.js';
import { isGuest, isAuth } from '../middlewares/authMiddleware.js';
import { isProfileOwner } from '../middlewares/ownerMiddleware.js';

const router = express.Router();

router.post('/register', isGuest, registerUser);
router.post('/login', isGuest, loginUser);
router.get('/logout', isAuth, logoutUser);

router.get('/:userId', isAuth, getUser);
router.get('/edit/:userId', isProfileOwner, editUser);
router.patch('/addFav', addFavorite);

export default router;