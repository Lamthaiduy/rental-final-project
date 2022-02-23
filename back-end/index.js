const express = require('express');
const config = require('dotenv').config();
const morgan = require('morgan'),
    cors=require('cors'),
    errorhandler=require('errorhandler'),
    passport=require('passport');
const authRouter = require('./controller/auth');
const db = require('./db/db');
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

app.use('/api', authRouter);

app.listen(PORT, () => {
    console.log('Running on PORT: ' + PORT);
})