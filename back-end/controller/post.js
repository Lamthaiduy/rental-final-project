const postRouter = require('express').Router({mergeParams: true});
const passport = require('passport');
const authorize = require('../middleware/authorize');
const CategoryModel = require('../models/categories');
const PostModel = require('../models/posts');
const UserModel = require('../models/user');

postRouter.use(passport.authenticate('jwt', {session: false}))
postRouter.get('/', authorize([process.env.USER, process.env.SELLER]), async(req, res) => {
    let {page, categories, search} = req.query;
    console.log(categories);
    if(!page) page = 1;
    const limit = process.env.LIMIT;
    let totalPage;
    try {
        let allPosts;
        if(!categories) {
            if(!search || search === "") {
                allPosts = await PostModel.find({isWaitingForEditAllow: false}).skip(limit * (page -1)).limit(limit).sort({createdAt: -1}).populate('categories', 'name');
            totalPage = Math.ceil((await PostModel.find({isWaitingForEditAllow: false})).length / limit);
            }
            else {
                allPosts = await PostModel.find({address: new RegExp(search, 'i'), isWaitingForEditAllow: false}).skip(limit * (page -1)).limit(limit).sort({createdAt: -1}).populate('categories', 'name');
            totalPage = Math.ceil((await PostModel.find({address: new RegExp(search, 'i'), isWaitingForEditAllow: false})).length / limit);
            }
        }
        else {
            if(!search || search === "") {
                allPosts = await PostModel.find({"categories": {$all: categories.split(',')}, isWaitingForEditAllow: flase}).skip(limit * (page -1)).limit(limit).sort({createdAt: -1}).populate('categories', 'name', "Categories");
            totalPage = Math.ceil((await PostModel.find({"categories": {$all: categories.split(',')}, isWaitingForEditAllow: false})).length / limit);
            }
            else {
                allPosts = await PostModel.find({"categories": {$all: categories.split(',')}, address: new RegExp(search, 'i'), isWaitingForEditAllow: false}).skip(limit * (page -1)).limit(limit).sort({createdAt: -1}).populate('categories', 'name', "Categories");
            totalPage = Math.ceil((await PostModel.find({"categories": {$all: categories.split(',')}, address: new RegExp(search, 'i'), isWaitingForEditAllow: false})).length / limit);
            }
        }
        res.status(200).json({data: allPosts, totalPage});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

postRouter.get("/owner/list", authorize(process.env.SELLER), async (req, res) => {
    const seller = req.user;
    let {page} = req.query;
    if(!page) page = 1;
    const limit = process.env.LIMIT;
    let totalPage;
    try {
        const allPostsOfSeller = await PostModel.find({seller: seller._id}).populate('categories', 'name').skip(limit * (page -1)).limit(limit);
        totalPage = Math.ceil((await PostModel.find({seller: seller._id})).length / limit)
        res.status(200).json({data: allPostsOfSeller, totalPage})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

postRouter.get("/:id", authorize(), async(req, res) => {
    const {id} = req.params;
    try {
        const postInDb = await PostModel.findById(id).populate('categories', 'name', 'Categories');
        res.status(200).json({data: postInDb});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

postRouter.post('/', authorize(process.env.SELLER), async (req, res) => {
    const {title} = req.body;
    const seller = req.user;
    try {
        const checkTitleUsed = await PostModel.findOne({title});
        if(checkTitleUsed) {
            res.status(400).json({message: "This title had been used, please try another one"});
        }
        else {
            const newPost = new PostModel({
                ...req.body,
                seller: seller._id
            })
            await newPost.save();
            res.status(201).json({message: "Created post done", data: newPost})
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

postRouter.put('/:id', authorize(process.env.SELLER), async (req, res) => {
    const {id} = req.params;
    try {
        const updateDocument = req.body;
    await PostModel.findByIdAndUpdate(id, {...updateDocument, isWaitingForEditAllow: true});
    res.status(202).json({message: "Post updated"})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

postRouter.put('/process/:id', authorize(process.env.ADMIN), async (req, res) => {
    const {status} = req.body;
    const {id}= req.params;
    try {
        if(status === 'approved') {
            await PostModel.findByIdAndUpdate(id, {isWaitingForEditAllow: false});
            res.status(202).json({message: "Action done"})
        }
        else {
            await PostModel.findByIdAndDelete(id);
            res.status(202).json({message: "Action done"})
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})



module.exports = postRouter;