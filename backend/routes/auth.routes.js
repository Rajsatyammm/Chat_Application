import express from 'express'
import { getAllUsers, login, logout, signUp } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', login)
router.post('/signup', signUp)
router.post('/logout', authMiddleware, logout)

router.get('/get-all-users', authMiddleware, getAllUsers)

export default router;