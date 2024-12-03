"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getAllBlogs = exports.createBlog = void 0;
const blog_model_1 = __importDefault(require("./blog.model")); // Assuming this is a Mongoose model or similar
// Create a new blog post
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, blogContent, image, author } = req.body;
    try {
        const newBlog = {
            title,
            blogContent,
            image,
            author,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        // Save blog post in the database (using MongoDB as an example)
        const blog = new blog_model_1.default(newBlog);
        yield blog.save();
        res.status(201).json({ message: "Blog created successfully", blog });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating blog", error });
    }
});
exports.createBlog = createBlog;
// Get all blog posts
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_model_1.default.find({});
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving blogs", error });
    }
});
exports.getAllBlogs = getAllBlogs;
// Get a blog post by ID
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const blog = yield blog_model_1.default.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving blog", error });
    }
});
exports.getBlogById = getBlogById;
// Update a blog post
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, blogContent, image } = req.body;
    try {
        const updatedBlog = yield blog_model_1.default.findByIdAndUpdate(id, { title, blogContent, image, updatedAt: new Date() }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog updated successfully", updatedBlog });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating blog", error });
    }
});
exports.updateBlog = updateBlog;
// Delete a blog post
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedBlog = yield blog_model_1.default.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting blog", error });
    }
});
exports.deleteBlog = deleteBlog;
