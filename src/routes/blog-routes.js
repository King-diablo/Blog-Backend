import express from "express";
import { addBlog, deleteBlog, getAllBlogs, getBlog, getByUserId, updateBlog } from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlog);
blogRouter.get("/user/:id", getByUserId);
blogRouter.post("/add", addBlog);
blogRouter.put("/updateBlog/:id", updateBlog);
blogRouter.delete("/:id", deleteBlog);


export default blogRouter;
