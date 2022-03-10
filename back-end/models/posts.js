const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: [{type: String}],
    address: String,
    status: {type: String, enum: ['Rented', "Unrented"], default: "Unrented"},
    price: String,
    petAllow: {type: String, enum: ['Allow', 'Not Allow']},
    peopleAllow: {type: String, enum: ['Male', 'Female', 'Both']},
    interior: String,
    personLimit: String,
    isWaitingForEditAllow: Boolean,
    categories: [{type: mongoose.Types.ObjectId, ref: 'Categories'}]
})

const PostModel = mongoose.model('Posts', PostSchema)

module.exports = PostModel;