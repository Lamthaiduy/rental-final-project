const mongoose = require('mongoose');


const ChatSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    message: String,
})


const ChatModel = mongoose.model('Chats', ChatSchema)

module.exports = ChatModel;