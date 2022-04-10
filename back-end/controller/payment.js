const PaymentModel = require('../models/payment');
const DepositModel = require('../models/deposit');
const PostModel = require('../models/posts');
const UserModel = require('../models/user');

const paymentRoute = require('express').Router();

paymentRoute.get('/', async (req, res) => {
    let {page} = req.query;
    const limit = process.env.LIMIT;
    if(!page) page = 1;
    try {
        const totalPage = Math.ceil((await (await PaymentModel.find()).length / limit));
        const paymentPerPage = await PaymentModel.find().populate('seller').populate({path: 'fromDeposit', populate: {path: 'user'}});
        res.status(200).json({data: paymentPerPage, totalPage})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


paymentRoute.post("/", async (req, res) => {
    try {
        const {sellerId, totalReceive, itemId } = req.body;
    const seller = await UserModel.findById(sellerId);
    const item = await DepositModel.findById(itemId);
    item.isPaid = true;
    await PostModel.findByIdAndUpdate(item.target, {status: 'Rented'});
    const newPayment = new PaymentModel({seller: seller._id, totalReceive, fromDeposit: item});
    await item.save();
    await newPayment.save();
    res.status(201).json({message: "Payment success"})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

module.exports = paymentRoute