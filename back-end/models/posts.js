const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: [{type: String}],
    address: String,
    status: {type: String, enum: ['Rented', "Deposited", "Unrented"], default: "Unrented"},
    price: String,
    petAllow: {type: String, enum: ['Allow', 'Not Allow']},
    peopleAllow: {type: String, enum: ['Male', 'Female', 'Both']},
    interior: {type: String, enum: ['Full Interior', 'No Interior']},
    personLimit: String,
    isWaitingForEditAllow: {type: Boolean, default: false},
    categories: [{type: mongoose.Types.ObjectId, ref: 'Categories'}],
    seller: {type: mongoose.Types.ObjectId, ref: 'Users'}
}, {timestamps: true})

const PostModel = mongoose.model('Posts', PostSchema)

module.exports = PostModel;