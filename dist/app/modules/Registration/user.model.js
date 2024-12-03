"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegModel = void 0;
const mongoose_1 = require("mongoose"); // Added import for `model`
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    balance: { type: Number, required: true, },
}, {
    timestamps: true,
});
exports.UserRegModel = (0, mongoose_1.model)("TestUser", userSchema);
