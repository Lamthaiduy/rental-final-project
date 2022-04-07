const mongoose = require('mongoose');


const PaymentSchema = new mongoose.Schema({
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    totalReceive: String,
    fromItem: {type: mongoose.Schema.Types.ObjectId, ref: "Posts"},
    paidBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
})


const PaymentModel = mongoose.model('Payments', PaymentSchema)

module.exports = PaymentModel;