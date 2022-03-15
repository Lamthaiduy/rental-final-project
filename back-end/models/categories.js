const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    name: String,
})


const CategoryModel = mongoose.model('Categories', CategorySchema)

module.exports = CategoryModel;