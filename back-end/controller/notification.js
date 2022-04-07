const notiRouter = require('express').Router();
const Notification = require('../models/notification');
const passport = require('passport');

notiRouter.use(passport.authenticate('jwt', {session: false}))

notiRouter.get('/', async (req, res) => {
    const receiver = req.user;
    const allNotification = await Notification.find({receiver: receiver._id}).sort({createdAt: -1});
    res.status(200).json({data: allNotification})
})

notiRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    await Notification.findByIdAndUpdate(id, {isRead: true});
    res.status(200).json({message: "Marked"})
})

module.exports = notiRouter;