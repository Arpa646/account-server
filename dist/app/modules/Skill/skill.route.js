"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRoutes = void 0;
// routes/skillRoutes.ts
const express_1 = __importDefault(require("express"));
const skill_controller_1 = require("./skill.controller");
const router = express_1.default.Router();
// Add a new skill
router.post("/", skill_controller_1.addSkill);
// Get all skills
router.get("/", skill_controller_1.getSkills);
exports.SkillRoutes = router;
