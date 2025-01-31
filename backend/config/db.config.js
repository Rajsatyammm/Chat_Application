import mongoose from 'mongoose';

export const connectToDB = async () => {
    try {
        const uri = await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to db");
    } catch (e) {

    }
}
