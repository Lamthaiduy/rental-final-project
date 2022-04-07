const mongoose = require('mongoose');


const NotificatationSchema = new mongoose.Schema({
    description: String,
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    isRead: {type: Boolean, default: false}
}, {timestamps: true})


const CategoryModel = mongoose.model('Notifications', NotificatationSchema)

module.exports = CategoryModel;