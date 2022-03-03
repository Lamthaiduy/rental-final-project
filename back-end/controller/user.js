const userRouter = require('express').Router();
const passport = require('passport');
const authorize = require('../middleware/authorize');
const UserModel = require('../models/user');

userRouter.use([passport.authenticate('jwt', {session: false}), authorize(process.env.ADMIN)])
userRouter.get('/', async (req, res) => {
    let {role, page} = req.query;
    const limit = process.env.LIMIT;
    if(!page) page = 1;
    try {
        let usersInRoles, pages, users;
        if(role) {
            usersInRoles = await UserModel.find({role: role});
            pages = Math.ceil(usersInRoles.length / limit);
            users = await UserModel.find({role: role}).skip((page - 1) * limit).limit(limit);
        }
        else {
            usersInRoles = await UserModel.find().where('role').ne(process.env.ADMIN);
            pages = Math.ceil(usersInRoles.length / limit);
            users = await UserModel.find().where('role').ne(process.env.ADMIN).limit(limit);
        }
        res.status(200).json({
            pages: pages,
            data: users
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

userRouter.post('/process/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        const {status} = req.body;
        await UserModel.findByIdAndUpdate(userId, {status: status});
        res.status(200).json({message: "Action done"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})


module.exports = userRouter;