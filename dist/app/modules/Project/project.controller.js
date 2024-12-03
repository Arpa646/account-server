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
exports.getProject = exports.addProject = void 0;
const project_model_1 = __importDefault(require("./project.model")); // Assuming you have a Project schema/model
// Add a new project
const addProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, image, link } = req.body;
        // Create the new project object
        const newProject = new project_model_1.default({
            title,
            image,
            link,
        });
        // Save the project to the database
        const savedProject = yield newProject.save();
        res.status(201).json({
            message: "Project added successfully",
            project: savedProject
        });
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({
            message: "Failed to add experience",
            error: errorMessage
        });
    }
});
exports.addProject = addProject;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield project_model_1.default.find(); // Populate user info if needed
        res.status(200).json(projects);
    }
    catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Failed to fetch projects." });
    }
});
exports.getProject = getProject;
