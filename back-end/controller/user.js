const userRouter = require('express').Router();
const passport = require('passport');
const authorize = require('../middleware/authorize');
const UserModel = require('../models/user');

userRouter.use(passport.authenticate('jwt', {session: false}))
userRouter.get('/',authorize(process.env.ADMIN), async (req, res) => {
    let {role, page} = req.query;
    const limit = process.env.LIMIT;
    if(!page) page = 1;
    try {
        let usersInRoles, pages, users;
        if(role) {
            usersInRoles = await UserModel.find({role: role});
            pages = Math.ceil(usersInRoles.length / limit);
            users = await UserModel.find({role: role}).sort({createdAt: -1}).skip((page - 1) * limit).limit(limit);
        }
        else {
            usersInRoles = await UserModel.find().where('role').ne(process.env.ADMIN);
            pages = Math.ceil(usersInRoles.length / limit);
            users = await UserModel.find().where('role').ne(process.env.ADMIN).sort({createdAt: -1}).limit(limit);
        }
        res.status(200).json({
            pages: pages,
            data: users
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

userRouter.post('/process/:userId', authorize(process.env.ADMIN), async (req, res) => {
    try {
        const {userId} = req.params;
        const {status} = req.body;
        await UserModel.findByIdAndUpdate(userId, {status: status});
        res.status(200).json({message: "Action done"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

userRouter.post('/select-role', async (req, res) => {
    const {_id} = req?.user;
    const {role} = req.body;
    try {
        await UserModel.findByIdAndUpdate(_id, {role});
        res.status(201).json({message: 'Action done'});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

userRouter.get('/profile', async (req, res) => {
    const {_id} = req.user;
    const user = await UserModel.findById(_id);
    res.status(200).json({user});
})


userRouter.put('/profile', async (req, res) => {
    const {_id} = req.user;

    const {...updateProfile} = req.body;
    await UserModel.findByIdAndUpdate(_id, {...updateProfile});
    res.status(200).json({message: "Update sucess"});
})

userRouter.put('/add-vnpay-wallet', async (req, res) => {
    const {...walletInfo} = body;
    const {_id} = req.user;

    const userWallets = await UserModel.findById(_id);
    await UserModel.findByIdAndUpdate(_id, {wallets: [...userWallets.wallets, {...walletInfo}]})
    res.status(200).json({message: "Add sucess"});
})

userRouter.put('/remove-vnpay-wallet', async (req, res) => {
    const {walletNumber}= req.body;
    const {_id} = req.user;

    const users = await UserModel.findById(_id);
    const walletList = users.wallets.filter(item => item.walletNumber !== walletNumber);
    await UserModel.findByIdAndUpdate(_id, {wallets: walletList})
    res.status(200).json({message: "Remove sucess"});

})

module.exports = userRouter;