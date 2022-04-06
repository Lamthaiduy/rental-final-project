const mongoose = require('mongoose');


const DepositSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    target: {type: mongoose.Schema.Types.ObjectId, ref: "Posts"},
    totalDeposit: String
}, {timestamps: true})


const DepositModel = mongoose.model('Deposits', DepositSchema)

module.exports = DepositModel;