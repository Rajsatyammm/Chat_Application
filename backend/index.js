import { config } from 'dotenv';
import express from 'express';
import { connectToDB } from './config/db.config.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import cloudinaryConfig from './config/cloudinary.config.js';
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors';
import socketRequestHandler from './socket.js';

config();
cloudinaryConfig();

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: [`${process.env.FRONTEND_URL}`]
    }
});
socketRequestHandler(io);

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)


const PORT = process.env.PORT || 4000;

server.listen(PORT, async () => {
    console.log(`Server running at PORT:${PORT}`)
    await connectToDB();
});

export { io };