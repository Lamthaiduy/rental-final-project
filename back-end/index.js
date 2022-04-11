const express = require('express');
const config = require('dotenv').config();
const app = express();
const {Server} = require('socket.io');
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
require('./models/chat');
require('./models/user');

const PORT = process.env.PORT || 8080;

const io = new Server(server, {cors: {origin: "*"}});

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


io.on('connection', (socket) => {
    console.log("user connected: " + socket.id)
})

app.listen(PORT, () => {
    console.log('Running on PORT: ' + PORT);
})