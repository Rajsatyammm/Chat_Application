import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getMessageById, sendMessage } from '../controllers/message.controller.js';

const messageRouter = express.Router();

messageRouter.get('/message/:id', authMiddleware, getMessageById)
messageRouter.post('/send-message/:id', authMiddleware, sendMessage)

export default messageRouter;