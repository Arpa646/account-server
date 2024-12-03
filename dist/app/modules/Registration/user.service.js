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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
//creating data into db using rollback and transiction
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user already exists
        const existingUser = yield user_model_1.UserRegModel.findOne({ userId: userData.userId });
        if (existingUser) {
            throw new Error("User with this userId already exists");
        }
        // Create a new user
        const newUser = yield user_model_1.UserRegModel.create(userData);
        return newUser;
    }
    catch (err) {
        throw new Error(err.message || "Failed to create user");
    }
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserRegModel.find(); // Filter for isDeleted being false
    if (!result || result.length === 0) {
        // Check if result is empty
        throw new Error("No data Found");
    }
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
};
// const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     const newFaculty = await Faculty.create([payload], { session });
//     await session.commitTransaction();
//     await session.endSession();
//     return newFaculty;
//   } catch (err: any) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(err);
//   }
// };
