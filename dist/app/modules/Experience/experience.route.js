"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const experience_controller_1 = require("./experience.controller");
// Assuming you have authentication middleware
const router = express_1.default.Router();
// Route to add a new experience, protected by authentication middleware
router.post("/", experience_controller_1.addExperience);
exports.ExperienceRoutes = router;
