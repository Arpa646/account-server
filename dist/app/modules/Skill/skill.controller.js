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
exports.getSkills = exports.addSkill = void 0;
const skill_model_1 = __importDefault(require("./skill.model")); // Assuming you have a Skill schema/model
// Add a new skill
const addSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { iconUrl } = req.body;
        // Create the new skill object
        const newSkill = new skill_model_1.default({
            iconUrl,
        });
        // Save the skill to the database
        const savedSkill = yield newSkill.save();
        res.status(201).json({
            message: "Skill added successfully",
            skill: savedSkill,
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
exports.addSkill = addSkill;
// Get all skills
const getSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield skill_model_1.default.find();
        res.status(200).json(skills);
    }
    catch (error) {
        const errorMessage = error.message;
        res.status(500).json({
            message: "Failed to add experience",
            error: errorMessage
        });
    }
});
exports.getSkills = getSkills;
