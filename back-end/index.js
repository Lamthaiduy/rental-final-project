const express = require('express');
const config = require('dotenv').config();
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
const app = express();
const PORT = process.env.PORT | 8080;
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

app.listen(PORT, () => {
    console.log('Running on PORT: ' + PORT);
})