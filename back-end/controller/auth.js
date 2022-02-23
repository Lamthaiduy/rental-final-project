const authRouter = require('express').Router();
const passport = require('passport');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

authRouter.post('/login',passport.authenticate('local', {session: false}), async (req, res) => {
    try {
        if(req.isAuthenticated()) {
            const user = req.user;
            const token = jwt.sign({sub: req.user}, process.env.SECRET_KEY, {expiresIn: '86400s'});
            res.status(200).json({
                user,
                token,
                isAuth: req.isAuthenticated()
            })
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

authRouter.post('/register', async (req, res) => {
    try {
        const body = req.body;
        const checkExisted = await UserModel.findOne({username: body.username});
        if(checkExisted) {
            res.status(400).json({message: "account already existed"});
        }
        else {
            const newAccount = new UserModel({...body});
            await newAccount.save();
            res.status(201).json({message: "account created"});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

module.exports = authRouter;