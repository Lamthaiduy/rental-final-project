const depositRouter = require('express').Router({mergeParams: true});
const passport = require('passport');
const authorize = require('../middleware/authorize');
const UserModel = require('../models/user');
const PostModel = require('../models/posts');
const DepositModel = require('../models/deposit');
const ConservationModel = require('../models/conservation');
const NotificationModel = require('../models/notification');
const QueryString = require('qs');
const config = require('../config/vnpay')
const dateFormat = require('dateformat')

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

depositRouter.use(passport.authenticate('jwt', {session: false}))

depositRouter.get('/',authorize(process.env.ADMIN), async (req, res) => {
    let {page} = req.query;
    const limit = process.env.LIMIT;
    if(!page) page = 1;
    try {
        const totalPage = Math.ceil((await (await DepositModel.find()).length / limit));
        const depositPerPage = await DepositModel.find().skip(limit * (page-1)).limit(limit).populate('user').populate({path: 'target', populate: {path: 'seller'}})
        res.status(200).json({data: depositPerPage, totalPage})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

depositRouter.get('/list/personal',authorize(process.env.USER) ,async (req, res) => {
    const user = req.user;
    let {page} = req.query;
    const limit = process.env.LIMIT;
    if(!page) page = 1;
    try {
        const totalPage = Math.ceil((await (await DepositModel.find({user: user._id})).length / limit));
        const depositPerPage = await DepositModel.find({user: user._id}).skip(limit * (page-1)).limit(limit).populate('user').populate({path: 'target', populate: {path: 'seller'}})
        res.status(200).json({data: depositPerPage, totalPage})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

depositRouter.put('/status/:id',authorize([process.env.USER, process.env.ADMIN]), async (req, res) => {
     const {id} = req.params;
     const {status} = req.body;
     try {
         if(status == "Had Refund") {
            const depositInDB = await DepositModel.findById(id);
            await PostModel.findByIdAndUpdate(depositInDB.target, {status: "Unrented"});
         }
         await DepositModel.findByIdAndUpdate(id, {status})
         res.status(200).json({message: "status changed"})
     } catch (error) {
         res.status(400).json({message: error.message})
     }
})

depositRouter.post('/create-url', async(req, res) => {
    const {amount, postId} = req.body;
    let tmnCode = config.vnp_TmnCode;
    let secretKey = config.vnp_HashSecret;
    let vnpUrl = config.vnp_Url;
    let returnUrl = config.vnp_ReturnUrl;
    let date = new Date();
    let ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress 


    let createDate = dateFormat(date, 'yyyymmddHHmmss');
    let orderId = dateFormat(date, 'HHmmss');

    let locale = 'vn';
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = postId;
    vnp_Params['vnp_OrderType'] = postId;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    vnp_Params = sortObject(vnp_Params);

    let signData = QueryString.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + QueryString.stringify(vnp_Params, { encode: false });
    console.log(vnpUrl);
    res.status(201).json({url: vnpUrl})
})

depositRouter.post('/search', async (req, res) => {
    const {postId, totalDeposit, orderId} = req.body;
    const depositInDB = await DepositModel.findOne({target: postId, totalDeposit, orderId});
    if(depositInDB) {
        res.status(400).json({message: "Already Deposited"})
    }
    else {
        res.status(200).json({message: "Not yet"})
    }
})

depositRouter.post('/create-deposit', async (req, res) => {
    const {postId, totalDeposit, orderId} = req.body;
    const user = req.user;
    const postInDb = await PostModel.findById(postId);
    await PostModel.findByIdAndUpdate(postId, {status: "Deposited"})
    const check = await ConservationModel.findOne({user: user._id, seller: postInDb.seller._id});
    if(!check) {
        const newConservation = new ConservationModel({user: user._id, seller: postInDb.seller._id});
        await newConservation.save();
    }
    const newNotification = new NotificationModel({receiver: postInDb.seller._id, description: `${user.fullname} had made a deposit for ${postInDb.title}`});
    await newNotification.save();
    const newDeposit = new DepositModel({user: user._id, target: postId, totalDeposit, orderId});
    await newDeposit.save();
    res.status(201).json({message: "done"})
})


module.exports = depositRouter;