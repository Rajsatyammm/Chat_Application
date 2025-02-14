import mongoose from 'mongoose';
import { DEFAULT_USER_PROFILE_PIC_MALE } from '../utils/constants.js';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    userName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        select: false
    },
    profilePic: {
        type: String,
        default: DEFAULT_USER_PROFILE_PIC_MALE
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);



export default User;