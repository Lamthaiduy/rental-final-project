const categoryRouter = require('express').Router();
const passport = require('passport');
const authorize = require('../middleware/authorize');
const CategoryModel = require('../models/categories');

categoryRouter.use(passport.authenticate('jwt', {session: false}));
categoryRouter.get('/', async (req, res) => {
    try {
        const allCategory = await CategoryModel.find({});
        res.status(200).json({data: allCategory})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

categoryRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const category = await CategoryModel.findById(id).populate('items');
        res.status(200).json({data: category})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

categoryRouter.post('/', authorize(process.env.ADMIN),async (req, res) => {
    const name = req.body.name;
    const check = await CategoryModel.findOne({name});
    if(check) {
        res.status(400).json({message: 'Category already Existed'})
    }
    else {
        const newOne = new CategoryModel({name});
        await newOne.save();
        res.status(201).json({mesage: 'Create category success', data: newOne})
    }
})

categoryRouter.put('/:id', authorize(process.env.ADMIN),async (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    const check = await CategoryModel.findOne({name});
    if(check) {
        res.status(400).json({message: 'Category already Existed'})
    }
    else {
        await CategoryModel.findByIdAndUpdate(id, {name});
        res.status(200).json({mesage: 'Update category success'})
    }
})


categoryRouter.delete('/:id',authorize(process.env.ADMIN), async (req, res) => {
    const id = req.body.id;
    const check = await CategoryModel.findById(id);
    if(check.items.length > 0) {
        res.status(400).json({message: 'Category already in used'});
    }
    else {
        res.status(200).json({message: "Category Deleted"})
    }

})

module.exports = categoryRouter;