import UserService from "../service/user.service.js";
import ApiResponse from "../utils/api.response.js";
import { generateJwtToken } from "../utils/jwtUtil.js";
import { getDecryptedObjectFromEncryptedString, getEncryptedStringFromObject } from "../utils/utils.js";

export const login = async (req, res) => {
    try {
        const { data } = req.body;
        if (!data)
            return res.status(400).json(new ApiResponse(400, false, "All fields are required"))
        const { email, password } = getDecryptedObjectFromEncryptedString(data);
        if (!email || !password)
            return res.status(400).json(new ApiResponse(400, false, "All fields are required"))

        const user = await UserService.getUserByEmail(email);
        if (!user)
            return res.status(400).json(new ApiResponse(400, false, 'invalid credentials'))

        const isPasswordMatched = await UserService.matchPassowrd(user.salt, password, user.password)
        if (!isPasswordMatched)
            return res.status(400).json(new ApiResponse(400, false, 'invalid credentials'))

        const token = generateJwtToken(user, res);
        const encryptedData = getEncryptedStringFromObject({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePic: user.profilePic
        })
        return res.status(200).json(new ApiResponse(200, true, 'success', encryptedData))
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, false, err.message || 'server-error'))
    }
}

export const signUp = async (req, res) => {
    try {
        const { data } = req.body;
        if (!data)
            return res.status(400).json(new ApiResponse(400, false, "All fields are required"))
        const { firstName, lastName, email, password } = getDecryptedObjectFromEncryptedString(data);
        if (!firstName || !lastName || !email || !password)
            return res.status(400).json(new ApiResponse(400, false, 'All fields are required'))

        const userByEmail = await UserService.getUserByEmail(email);
        if (userByEmail)
            return res.status(400).json(new ApiResponse(400, false, 'user already exists'))

        const user = await UserService.createUser({ firstName, lastName, email, password });
        if (!user) {
            return res.status(500).json(new ApiResponse(500, false, 'error creating user'))
        }
        // generate and set jwt token to cookies
        const token = generateJwtToken(user, res);
        const encryptedUserData = getEncryptedStringFromObject({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePic: user.profilePic
        })
        return res.status(200).json(new ApiResponse(200, true, 'success', encryptedUserData))
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, false, err.message || 'server-error'))
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await UserService.getUserById(userId);
        if (!user)
            return res.status(404).json(new ApiResponse(500, false, "user not found"));
        return res.status(200).json(new ApiResponse(200, true, 'success', getEncryptedStringFromObject(user)))
    } catch (err) {

    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const profilePic = req.file?.buffer;
        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }
        const updatedUser = await UserService.updateProfile(userId, profilePic);
        if (!updateProfile)
            return res.status(500).json(new ApiResponse(500, false, 'error while updating profile'))
        return res.status(200).json(new ApiResponse(200, true, 'success', getEncryptedStringFromObject(updatedUser)));
    } catch (error) {
        console.log("error in update profile:", error);
        return res.status(500).json(new ApiResponse(500, false, "Internal server error"));
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('token', '', { expiresIn: 0 })
        return res.status(200).json(new ApiResponse(200, true, 'success'))
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, false, err.message || 'server-error'))
    }
}

export const getAllUsersForSidebar = async (req, res) => {
    try {
        const user = req.user;
        const users = await UserService.getAllDatabaseUsersExceptMe(user._id);
        if (!users)
            return res.status(500).json(new ApiResponse(500, false, 'no user in db'));
        return res.status(200).json(new ApiResponse(200, true, 'success', getEncryptedStringFromObject(users)));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, false, err.message || 'server-error'));
    }
}

export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json(new ApiResponse(200, true, 'success', getEncryptedStringFromObject(req.user)))
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, false, err.message || 'server-error'))
    }
}