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
exports.addExperience = void 0;
const experience_model_1 = __importDefault(require("./experience.model")); // Assuming you have an Experience schema/model
// Add a new experience
const addExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, company, startDate, endDate, location } = req.body;
        // Assuming req.user contains the authenticated user's ID
        // Create the new experience object
        const newExperience = new experience_model_1.default({
            title,
            description,
            company,
            startDate,
            endDate,
            location,
        });
        // Save the experience to the database
        const savedExperience = yield newExperience.save();
        res.status(201).json({
            message: "Experience added successfully",
            experience: savedExperience
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to add experience",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
exports.addExperience = addExperience;
