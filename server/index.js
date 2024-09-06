/* 
 * Description: This file is the entry point of the server. 
 * It connects to the MongoDB database and starts the server on the specified port.
 */


// Import required modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Import routes
const userRouter = require('./routes/userRoute');
const chatRouter = require('./routes/chatRoute');
const messageRouter = require('./routes/messageRoute');

// Initialize express app
const app = express();


const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
	    origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/users', userRouter);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("/home/ubuntu/flashat-app/client/dist"));

    app.get('*', (req, res) => {
        res.sendFile("/home/ubuntu/flashat-app/client/dist/index.html");
    });
}
else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}


// Socket.io
let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    // Set up heartbeat interval (3 minutes)
    const heartbeatInterval = 3 * 60 * 1000; // 3 minutes
    let heartbeatTimeout;

    const sendHeartbeat = () => {
        socket.emit("ping");
        heartbeatTimeout = setTimeout(() => {
            console.log(`Client ${socket.id} failed to respond to heartbeat, disconnecting...`);
            socket.disconnect();
        }, heartbeatInterval);
    };

    // Start sending heartbeat pings
    const heartbeat = setInterval(sendHeartbeat, heartbeatInterval);

    // Listen for pong response from client
    socket.on("pong", () => {
        clearTimeout(heartbeatTimeout);
    });

    // Handle user addition
    socket.on("addNewUser", (userId) => {
        if (!onlineUsers.some((user) => user.userId === userId) && userId) {
            onlineUsers.push({ userId, socketId: socket.id });
        }
        io.emit("getOnlineUsers", onlineUsers);
    });

    // Handle message sending
    socket.on("sendMessage", (message) => {
        const recipient = onlineUsers.find((user) => user.userId === message.recipientId);
        if (recipient) {
            io.to(recipient.socketId).emit("getMessage", message);
            io.to(recipient.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date(),
            });
        }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        clearInterval(heartbeat);
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
    });
});


const port = process.env.PORT || 6808;
const uri = process.env.ATLAS_URI;

// Start the server
httpServer.listen(port, (req, res) => {
    console.log(`Server is running on port... ${port}`);
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the MERN Stack App');
});

// Connect to MongoDB database
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true }).then(() => {
    console.log('MongoDB database connection established successfully');
    }).catch((error) => {
        console.log("MongoDB connection failed: " + error.message);
    });
