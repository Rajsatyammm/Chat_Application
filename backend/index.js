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
import ApiResponse from './utils/api.response.js';
import helmet from 'helmet'

config();
cloudinaryConfig();

const app = express();
const server = createServer(app);

const originURL =
  process.env.MODE == "development"
    ? process.env.FRONTEND_URL_DEV
    : process.env.FRONTEND_URL_PROD;

const io = new Server(server, {
    cors: {
        origin: [originURL],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
});
socketRequestHandler(io);

app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: [originURL],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)

app.get('/', (req, res) => {
    res.status(200).json(new ApiResponse(200, true, 'success'))
})

app.get('/health', (req, res) => {
    res.status(200).json(new ApiResponse(200, true, 'server is up and running'))
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, async () => {
    console.log(`Server running at PORT:${PORT}`)
    await connectToDB();
});

export { io };