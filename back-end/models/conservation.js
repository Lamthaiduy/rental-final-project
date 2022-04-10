const mongoose = require('mongoose');


const ConservationSchema = new mongoose.Schema({
    message: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chats'}],
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
}, {timestamps: true})


const ConservationModel = mongoose.model('Conservations', ConservationSchema)

module.exports = ConservationModel;