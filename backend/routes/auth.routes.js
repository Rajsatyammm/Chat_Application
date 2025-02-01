import express from 'express'
import { checkAuth, getAllUsersForSidebar, login, logout, signUp } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', login)
router.post('/signup', signUp)
router.post('/logout', authMiddleware, logout)

router.get('/check', authMiddleware, checkAuth);
router.get('/users', authMiddleware, getAllUsersForSidebar)

export default router;