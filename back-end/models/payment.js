const mongoose = require('mongoose');


const PaymentSchema = new mongoose.Schema({
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    totalReceive: String,
    fromDeposit: {type: mongoose.Schema.Types.ObjectId, ref: "Deposits"},
})


const PaymentModel = mongoose.model('Payments', PaymentSchema)

module.exports = PaymentModel;