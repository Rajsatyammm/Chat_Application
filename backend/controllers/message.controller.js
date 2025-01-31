import MessageService from "../service/message.service.js";
import ApiResponse from "../utils/api.response.js";

export const getMessageById = async (req, res) => {
    try {
        const { id: currentUser } = req.user;
        const { id: otherUser } = req.params;
        const allMessages = await MessageService.getMessageByUserId(currentUser, otherUser);
        res.status(200).json(new ApiResponse(200, true, "sucess", allMessages));
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, false, 'server-error'));
    }
}

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user.id;
        const { id: recieverId } = req.params;
        const { text, image } = req.body;
        if (!text && !image)
            return res.status(400).json(new ApiResponse(400, false, 'one of the fields are required'))
        const message = await MessageService.createMessage({ senderId, recieverId, text, image })
        if (!message)
            return res.status(500).json(new ApiResponse(400, false, 'error while sending message'))
    } catch (err) {
        return res.status(500).json(new ApiResponse(500, false, err.message || 'server-error'))
    }
}