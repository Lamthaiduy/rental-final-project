const messageRoute = require('express').Router();
const authorize = require('../middleware/authorize');
const passport = require('passport');
const ConservationModel = require('../models/conservation');
const ChatModel = require('../models/chat');
const UserModel = require('../models/user');


messageRoute.use([passport.authenticate('jwt', {session: false}), authorize([process.env.USER, process.env.SELLER])])


messageRoute.get('/', async (req, res) => {
    const user = req.user;
    if(user.role === process.env.USER) {
        const data = await ConservationModel.find({user: user._id}).sort({updatedAt: 1}).populate('user').populate('seller').populate({path: 'messages', populate: {path: 'sender'}});
        res.status(200).json(data);
    }
    else {
        const data = await ConservationModel.find({seller: user._id}).sort({updatedAt: 1}).populate('user').populate('seller').populate({path: 'messages', populate: {path: 'sender'}});
        res.status(200).json(data);
    }
})

messageRoute.get('/:id', async (req, res) => {
    const user = req.user;
    if(user.role === process.env.USER) {
        const data = await ConservationModel.findById(req.params.id).populate('user').populate('seller').populate({path: 'messages', populate: {path: 'sender'}});
        res.status(200).json({data});
    }
    else {
        const data = await ConservationModel.findById(req.params.id).populate('user').populate('seller').populate({path: 'messages', populate: {path: 'sender'}});
        res.status(200).json({data});
    }
})

module.exports = messageRoute;