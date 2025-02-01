import jwt from "jsonwebtoken";
import ApiResponse from "../utils/api.response.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.jwtToken || req.headers.authorization;
        if (!token) {
            return res.status(401).json(new ApiResponse(401, false, 'unauthorised user'))
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(400).json(new ApiResponse(400, false, 'user token not valid'))
        }
        req.user = decode;
        next();
    } catch (e) {
        return res.status(400).json(new ApiResponse(400, false, 'error while decoding token'))
    }
}
