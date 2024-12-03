"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
// routes/BlogRoutes.ts
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
// Define blog routes
router.post("/", blog_controller_1.createBlog); // Create a new blog
router.get("/", blog_controller_1.getAllBlogs); // Get all blogs
router.get("/:id", blog_controller_1.getBlogById); // Get a single blog by ID
router.put("/blogs/:id", blog_controller_1.updateBlog); // Update a blog
router.delete("/blogs/:id", blog_controller_1.deleteBlog); // Delete a blog
exports.BlogRoutes = router;
