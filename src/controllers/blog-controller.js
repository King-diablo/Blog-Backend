import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find({});
    } catch (error) {
        console.log(error);
    }
    if (!blogs) {
        return res.status(404).json({ message: 'No Blogs found' })
    }
    return res.status(200).json({ blogs });
}

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable to find user" });
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save();
        existingUser.blogs.push(blog);
        await existingUser.save();
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
    return res.status(200).json({ blog });
}

export const updateBlog = async (req, res, next) => {
    const blogId = req.params.id;
    const { title, description } = req.body;
    let blog;

    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to update the blog" });
    }
    return res.status(200).json({ blog });
}

export const getBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error);
    }

    if (!blog) {
        return res.status(404).json({ message: "No Blog Found With The Specified Id" });
    }
    return res.status(200).json({ blog });
}

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findOneAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        return console.log(error);
    }

    if (!blog) {
        return res.status(500).json({ message: "No Blog Found With The Specified Id" });
    }

    return res.status(200).json({ message: "Successfully Deleted Blog" });
}

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;

    let userBlogs;

    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        return console.log(error);
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ blogs: userBlogs });
}