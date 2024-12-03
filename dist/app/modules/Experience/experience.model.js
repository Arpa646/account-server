"use strict";
// import mongoose, { Schema, Document } from "mongoose";
// import { IExperience } from "./experience.interface";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// // Define Mongoose document extending the interface
// interface IExperienceDocument extends IExperience, Document {}
// // Create the schema for Experience
// const ExperienceSchema: Schema<IExperienceDocument> = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   company: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, default: null },
//   location: { type: String, required: true },
// });
// // Create the Experience model
// const Experience = mongoose.model<IExperienceDocument>("Experience", ExperienceSchema);
// export default Experience;
const mongoose_1 = __importStar(require("mongoose"));
// Create the schema for Experience
const ExperienceSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    location: { type: String, required: true },
});
// Create the Experience model
const Experience = mongoose_1.default.model("Experience", ExperienceSchema);
exports.default = Experience;
