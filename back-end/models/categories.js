const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    name: String,
    items: [{type: mongoose.Types.ObjectId, ref: 'Posts'}]
})


const CategoryModel = mongoose.model('Categories', CategorySchema)

module.exports = CategoryModel;