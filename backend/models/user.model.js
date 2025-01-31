import mongoose from 'mongoose';

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
        unique: true,
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
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);



export default User;