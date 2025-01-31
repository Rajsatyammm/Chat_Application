import User from "../models/user.model.js"
import bcrypt from 'bcrypt'


class UserService {
    static getUserByEmail = async (email) => {
        try {
            return await User.findOne({ email: email }).select('+password');
        } catch (err) {
            return null;
        }
    }

    static getAllDatabaseUsersExceptMe = async (id) => {
        try {
            const allUsers = await User.find({ _id: { $ne: id } })
            return allUsers;
        } catch (err) {
            return null;
        }
    }

    static generateHashedData = async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return { salt, hashedPassword };
    }

    static matchPassowrd = async (salt, password, dbPassword) => {
        const hashedPassword = await bcrypt.hash(password, salt)
        return dbPassword === hashedPassword;
    }

    static createUser = async (user) => {
        try {
            const { firstName, lastName, email, password } = user;
            const hashedData = await this.generateHashedData(password);
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                salt: hashedData.salt,
                password: hashedData.hashedPassword,
                userName: email.split('@')[0],
            })
            return newUser;
        } catch (e) {
            return null;
        }
    }
}

export default UserService;