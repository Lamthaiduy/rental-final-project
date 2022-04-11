const express = require('express');
const config = require('dotenv').config();
const app = express();
const socket = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const morgan = require('morgan'),
    cors=require('cors'),
    errorhandler=require('errorhandler'),
    passport=require('passport');
    passporMidleware = require('./middleware/authentication');
const authRouter = require('./controller/auth');
const userRouter = require('./controller/user');
const categoryRouter = require('./controller/category');
const db = require('./db/db');
const postRouter = require('./controller/post');
const depositRouter = require('./controller/deposits');
const notiRouter = require('./controller/notification');
const paymentRoute = require('./controller/payment');
const messageRoute = require('./controller/message');
const ConversationModel = require('./models/conservation');
const ChatModel = require('./models/chat');
require('./models/user');

const PORT = process.env.PORT || 8080;

//chatting helpers
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const io = socket(5000, {cors: {origin: "*"}});
io.on('connection', (socket) => {

        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            console.log("user connected: " + socket.id)
        });
    
      socket.on("sendMessage", async ({ senderId, receiverId, conversationId, text }) => {
        const receiver = getUser(receiverId);
        const sender = getUser(senderId);
        let conversation = await ConversationModel.findById(conversationId);
        const message = new ChatModel({sender: senderId, message: text});
        await message.save();
        conversation.messages.push(message);
        await conversation.save();
        console.log(receiver.socketId);
        console.log(sender.socketId);
        const responseMessage = await ConversationModel.findById(conversationId).populate('user').populate('seller').populate({path: 'messages', populate: {path: 'sender'}});;
        io.to([receiver.socketId, sender.socketId]).emit("getMessage", responseMessage);
      });

    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
      });
})

app.use(cors({
    origin: '*',
    credentials: false
}))


app.use(morgan('dev'));
app.use(errorhandler());
app.use(passport.initialize());
app.use(express.json());

db.connect(process.env.CONNECTION_STRING);
db.createDataSample();

app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/posts', postRouter);
app.use('/api/deposits', depositRouter);
app.use('/api/notifications', notiRouter);
app.use("/api/payment", paymentRoute)
app.use("/api/messages", messageRoute)




app.listen(PORT, () => {
    console.log('Running on PORT: ' + PORT);
})
