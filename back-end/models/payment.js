const mongoose = require('mongoose');


const PaymentSchema = new mongoose.Schema({
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    totalReceive: String
})


const PaymentModel = mongoose.model('Payments', PaymentSchema)

module.exports = PaymentModel;