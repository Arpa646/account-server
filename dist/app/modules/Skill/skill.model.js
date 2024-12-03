"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Skill.ts
const mongoose_1 = __importDefault(require("mongoose"));
// Skill Schema
const SkillSchema = new mongoose_1.default.Schema({
    iconUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model('Skill', SkillSchema);
