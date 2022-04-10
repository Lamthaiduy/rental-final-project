const mongoose = require('mongoose');


const DepositSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    target: {type: mongoose.Schema.Types.ObjectId, ref: "Posts"},
    totalDeposit: String,
    status: {type: String, enum: ['In Deposit', 'Refund Request', 'Had Refund', 'Paid'], default: 'In Deposit'},
    orderId: String,
    isPaid: {type: Boolean, default: false}
}, {timestamps: true})


const DepositModel = mongoose.model('Deposits', DepositSchema)

module.exports = DepositModel;