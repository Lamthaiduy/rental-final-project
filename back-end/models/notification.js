const mongoose = require('mongoose');


const NotificatationSchema = new mongoose.Schema({
    description: String,
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
})


const CategoryModel = mongoose.model('Notifications', NotificatationSchema)

module.exports = CategoryModel;