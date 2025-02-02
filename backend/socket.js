const userToSocketMapping = new Map();

export function getReceiverSocketId(userId) {
    return userToSocketMapping[userId];
}

const socketRequestHandler = (io) => {
    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId)
            userToSocketMapping[userId] = socket.id;
        // io.emit() is used to send events to all the connected clients
        io.emit("getOnlineUsers", Object.keys(userToSocketMapping));

        socket.on("disconnect", () => {
            delete userToSocketMapping[userId];
            io.emit("getOnlineUsers", Object.keys(userToSocketMapping));
        });
    })
}

export default socketRequestHandler;