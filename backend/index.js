import { config } from 'dotenv';
import express from 'express';
import { connectToDB } from './config/db.config.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import cloudinaryConfig from './config/cloudinary.config.js';

config();
cloudinaryConfig();

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)


const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
    console.log(`Server running at PORT:${PORT}`)
    await connectToDB();
});