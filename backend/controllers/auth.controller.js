import UserService from "../service/user.service.js";
import ApiResponse from "../utils/api.response.js";
import { generateJwtToken } from "../utils/jwtUtil.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json(new ApiResponse(400, false, "All fields are required"))

        const user = await UserService.getUserByEmail(email);
        if (!user)
            return res.status(400).json(new ApiResponse(400, false, 'invalid credentials'))

        const isPasswordMatched = await UserService.matchPassowrd(user.salt, password, user.password)
        if (!isPasswordMatched)
            return res.status(400).json(new ApiResponse(400, false, 'invalid credentials'))

        const token = generateJwtToken(user, res);
        return res.status(200).json(new ApiResponse(200, true, 'success', {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePic: user.profilePic
        }))
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, false, err.message || 'server-error'))
    }
}

export const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password)
            return res.status(400).json(new ApiResponse(400, false, 'All fields are required'))

        const userByEmail = await UserService.getUserByEmail(email);
        if (userByEmail)
            return res.status(400).json(new ApiResponse(400, false, 'user already exists'))

        const user = await UserService.createUser({ firstName, lastName, email, password });
        if (!user) {
            return res.status(500).json(new ApiResponse(500, false, 'error creating user'))
        }
        const token = generateJwtToken(user, res);
        return res.status(200).json(new ApiResponse(200, true, 'success', {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePic: user.profilePic
        }))
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, false, err.message || 'server-error'))
    }
}

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
        return res.status(200).json(new ApiResponse(200, true, 'success', users));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, false, err.message || 'server-error'));
    }
}

export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json(new ApiResponse(200, true, 'success', req.user))
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, false, err.message || 'server-error'))
    }
}