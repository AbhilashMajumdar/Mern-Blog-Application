const { default: mongoose } = require('mongoose');
const Blogs = require('../models/BlogModel');
const UserModel = require('../models/UserModel');

const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blogs.find().populate('user');
    } catch (error) {
        console.log(error);
    }
    if (!blogs) {
        return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ blogs });
};

const addBlogs = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await UserModel.findById(user);
    } catch (error) {
        console.log(error);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable to find user by this id!" });
    }
    const blog = new Blogs({
        title,
        description,
        image,
        user
    });
    try {

        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
    return res.status(200).json({ message: "Blog is created suceessfully!", blog });
};

const getBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blogs.findById(id);
    } catch (error) {
        console.log(error);
    }
    if (!blog) {
        return res.status(404).json({ message: "Blog not found!" });
    }
    return res.status(200).json({ blog });
};

const updateBlog = async (req, res, next) => {
    const id = req.params.id;
    const { title, description, image } = req.body;
    let blog;
    try {
        blog = await Blogs.findByIdAndUpdate(id, {
            title,
            description,
            image
        });
    } catch (error) {
        console.log(error);
    }
    if (!blog) {
        return res.status(404).json({ message: "Unable to update blog" });
    }
    return res.status(201).json({ message: "Blog updated successfully!" });
};

const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blogs.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        console.log(error);
    }
    if (!blog) {
        return res.status(404).json({ message: "Unable to delete blog" });
    }
    return res.status(200).json({ message: "Blog deleted successfully!" });
};

const getByUserID = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await UserModel.findById(userId).populate('blogs');
    } catch (error) {
        console.log(error);
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "No blogs found!" });
    }
    return res.status(200).json({ user : userBlogs });
};

exports.getAllBlogs = getAllBlogs;
exports.addBlogs = addBlogs;
exports.getBlog = getBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
exports.getByUserID = getByUserID;