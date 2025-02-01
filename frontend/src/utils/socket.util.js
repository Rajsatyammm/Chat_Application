import { useContext } from "react";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const connectSocket = () => {
    if (!authUser || get().socket?.connected)
        return;

    const socket = io(BASE_URL, {
        query: {
            userId: authUser._id,
        },
    });
    socket.connect();
    setSocket(socket);

    socket.on("getOnlineUsers", (userIds) => {
        setOnlineUsers(userIds)
    });
}

export const disconnectSocket = () => {
    if (socket?.connected)
        socket.disconnect();
}