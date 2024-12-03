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
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const asynch_1 = __importDefault(require("../../middleware/asynch"));
const response_1 = __importDefault(require("../../utils/response"));
const http_status_codes_1 = require("http-status-codes");
// import { userValidationSchema } from "./user.validation"; // Uncomment if you need validation
const user_model_1 = require("./user.model");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract `name` and `userId` from the request body
        const { name, userId } = req.body;
        // Prepare the user object with a default balance of 0
        const newUserData = {
            userId,
            name,
            balance: 0, // Default balance is 0
        };
        // Save the user to the database
        const result = yield user_service_1.UserServices.createUserIntoDB(newUserData);
        // Send a success response
        (0, response_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED, // 201 Created
            success: true,
            message: "User created successfully",
            data: result,
        });
    }
    catch (error) {
        // Handle errors explicitly
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Failed to create user",
            error: error.message || "Something went wrong",
        });
    }
});
// const addBalance = async (req: Request, res: Response) => {
//   try {
//     // Extract `id` (userId) and `deposit` from the request body
//     const { userId, deposit } = req.body;
//     // Check if the user exists
//     const user = await UserRegModel.findOne({ userId: userId });
//     if (!user) {
//       return res.status(StatusCodes.NOT_FOUND).send({
//         success: false,
//         message: `User with ID ${userId} not found`,
//       });
//     }
//     // Update the user's balance by adding the deposit
//     user.balance += deposit;
//     const updatedUser = await user.save();
//     // Send a success response with the updated user data
//     res.status(StatusCodes.OK).send({
//       success: true,
//       message: "Balance updated successfully",
//       data: updatedUser,
//     });
//   } catch (error) {
//     // Handle errors explicitly
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
//       success: false,
//       message: "Failed to update balance",
//       error: error.message || "Something went wrong",
//     });
//   }
// };
const addBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract `id` (userId) and `deposit` from the request body
        const { userId, deposit } = req.body;
        // Check if the user exists
        const user = yield user_model_1.UserRegModel.findOne({ userId: userId });
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
                success: false,
                message: `User with ID ${userId} not found`,
            });
        }
        // Update the user's balance by adding the deposit
        user.balance += deposit;
        const updatedUser = yield user.save();
        // Send a success response with the updated user data
        res.status(http_status_codes_1.StatusCodes.OK).send({
            success: true,
            message: "Balance updated successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        // Handle errors explicitly
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Failed to update balance",
            error: error.message || "Something went wrong",
        });
    }
});
const transferBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderId, receiverId, amount } = req.body;
        // Validate request body
        if (!senderId || !receiverId || !amount || amount <= 0) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                success: false,
                message: "Invalid input. Please provide valid senderId, receiverId, and amount.",
            });
        }
        // Fetch sender and receiver details from the database
        const sender = yield user_model_1.UserRegModel.findOne({ userId: senderId });
        const receiver = yield user_model_1.UserRegModel.findOne({ userId: receiverId });
        if (!sender || !receiver) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
                success: false,
                message: "Sender or Receiver not found!",
            });
        }
        // Check if the sender has sufficient balance
        if (sender.balance < amount) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                success: false,
                message: "Insufficient balance!",
            });
        }
        // Update balances
        sender.balance -= amount;
        receiver.balance += amount;
        // Save the updated user data
        yield sender.save();
        yield receiver.save();
        // Send success response
        res.status(http_status_codes_1.StatusCodes.OK).send({
            success: true,
            message: "Balance transferred successfully!",
            data: {
                sender: {
                    userId: sender.userId,
                    name: sender.name,
                    balance: sender.balance,
                },
                receiver: {
                    userId: receiver.userId,
                    name: receiver.name,
                    balance: receiver.balance,
                },
            },
        });
    }
    catch (error) {
        // Handle errors explicitly
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "Failed to transfer balance",
            error: error.message || "Something went wrong",
        });
    }
});
const getAllUser = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getAllUserFromDB();
    if (result.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Data Found",
            data: [],
        });
    }
    (0, response_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
}));
exports.userControllers = {
    createUser,
    getAllUser,
    addBalance,
    transferBalance
};
