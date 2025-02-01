import { uploadToCloudinary } from "../config/cloudinary.config.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socket.js";

class MessageService {
    static getMessageByUserId = async (currentUserId, otherUserId) => {
        try {
            const messages = await Message.find({ senderId: currentUserId, recieverId: otherUserId })
                .find({
                    $or: [
                        { senderId: currentUserId, recieverId: otherUserId },
                        { senderId: otherUserId, recieverId: currentUserId }
                    ]
                })
            return messages;
        } catch (err) {
            return null;
        }
    }

    static createMessage = async ({ senderId, recieverId, text, image }) => {
        let imageUrl;
        try {
            if (image) {
                const uploadResult = await uploadToCloudinary(image);
                imageUrl = uploadResult.secure_url;
            }
            const newMessage = await Message.create({
                senderId,
                recieverId,
                image: imageUrl,
                text
            })
            const receiverSocketId = getReceiverSocketId(recieverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }
        } catch (err) {
            return null;
        }

    }
}

export default MessageService;