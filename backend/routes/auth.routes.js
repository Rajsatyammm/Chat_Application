import express from 'express'
import { checkAuth, getAllUsersForSidebar, getUserProfile, login, logout, signUp, updateProfile } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import multer from 'multer';

const storage = multer.memoryStorage(); // Store file in memory temporarily
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/login', login)
router.post('/signup', signUp)
router.post('/logout', authMiddleware, logout)
router.put('/update-profile', upload.single('profilePic'), authMiddleware, updateProfile)

router.get('/profile', authMiddleware, getUserProfile)
router.get('/check', authMiddleware, checkAuth);
router.get('/users', authMiddleware, getAllUsersForSidebar)

export default router;