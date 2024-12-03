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
exports.RecipieController = void 0;
const asynch_1 = __importDefault(require("../../middleware/asynch"));
const response_1 = __importDefault(require("../../utils/response"));
const recipie_services_1 = require("./recipie.services");
// import FacilityModel from "./facility.model";
// import { facilityValidationSchema } from "./facility.validation";
const http_status_codes_1 = require("http-status-codes");
const recipie_model_1 = __importDefault(require("./recipie.model"));
const createRecipie = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, time, image, recipe, user, rating } = req.body;
    const recipieData = {
        // Or however you're generating IDs
        title,
        time,
        image,
        recipe,
        user,
        rating,
        isPublished: true,
        isDeleted: false,
        createdAt: new Date(), // Set to the current date
        updatedAt: new Date(), // Set to the current date
        likedBy: [], // Initialize as an empty array
        dislikedBy: [], // Initialize as an empty array
    };
    console.log(recipieData);
    // এখানে মন্তব্য করা যাচাইয়ের অংশ যোগ করুন (যদি প্রয়োজন হয়)
    const result = yield recipie_services_1.RecipieServices.createRecipe(recipieData);
    console.log(result);
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Recipe created successfully", // এখানে সঠিক মেসেজ ব্যবহার করুন
        data: result,
    });
}));
const getAllRacipie = (0, asynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // sendResponse(res, {
    //   statusCode: StatusCodes.OK,
    //   success: true,
    //   message: "Bookings retrieved successfully",
    //   data: result,
    // });
    try {
        const result = yield recipie_services_1.RecipieServices.getAllRecipiesFromDB();
        if (!result || result.length === 0) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "No Recipie found",
                data: [],
            });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Facility retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Server error",
                error: err.message,
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Unknown server error",
            });
        }
    }
}));
const getSingleRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Get the facility ID from request params
        console.log(id);
        const recipe = yield recipie_services_1.RecipieServices.getRecipeByIdFromDB(id);
        if (!recipe) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "recipie not found",
                data: {},
            });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Facility retrieved successfully",
            data: recipe,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Server error",
                error: err.message,
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Unknown server error",
            });
        }
    }
});
const getSingleRecipeByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params; // Get the user's email from request query
        console.log(email);
        if (!email) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Email is required",
            });
        }
        console.log(email); // Debugging: Ensure you're receiving the correct email
        // Fetch the recipe based on the provided email
        const facility = yield recipie_services_1.RecipieServices.getRecipeByEmailFromDB(email);
        if (!facility) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Recipe not found",
                data: null,
            });
        }
        // Return success response with the facility data
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Recipe retrieved successfully",
            data: facility,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            // If error is instance of Error, send server error response
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Server error",
                error: err.message,
            });
        }
        else {
            // Handle unknown server errors
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Unknown server error",
            });
        }
    }
});
const deleteRecipe = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("this is id", id);
    try {
        const result = yield recipie_services_1.RecipieServices.deleteRecipeInDB(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                message: "No Data Found",
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            message: "Recipe deleted successfully",
            data: result,
        });
    }
    catch (error) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Error deleting facility",
                error: error.message,
            });
        }
        else {
            // Handle unexpected error types
            res.status(500).json({
                success: false,
                message: "Error deleting facility",
                error: "An unexpected error occurred.",
            });
        }
    }
}));
const updateRecipieStates = (0, asynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    const updateData = req.body;
    const result = yield recipie_services_1.RecipieServices.updateReciceStatusInDB(id);
    console.log("up", result);
    if (!result) {
        return res.status(404).json({
            success: false,
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: "No Data Found",
            data: [],
        });
    }
    (0, response_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Facility updated successfully",
        data: result,
    });
}));
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recipeId, userId, comment } = req.body;
        console.log(recipeId, userId, comment);
        // Find the recipe by ID
        const recipe = yield recipie_model_1.default.findById(recipeId);
        console.log(recipe);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        // Ensure that the comments array is initialized
        if (!recipe.comments) {
            recipe.comments = []; // Initialize comments if it is undefined
        }
        // Create a new comment object
        const newComment = {
            userId, // ID of the user commenting
            comment, // Comment text
            // Optional rating (if applicable, you can include this based on your design)
            // rating: rating || null, // Uncomment if you have a rating field
        };
        // Add the new comment to the comments array of the recipe
        recipe.comments.push(newComment);
        // Save the updated recipe document
        yield recipe.save();
        res.status(201).json({
            message: "Comment added successfully",
            comments: recipe.comments, // Return updated comments
        });
    }
    catch (error) {
        console.error("Error adding comment:", error); // Log the error for debugging
        res
            .status(500)
            .json({ message: "Server error", error: error.message });
    }
});
const postRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recipeId, rating, userId } = req.body;
        // Find the recipe by ID
        const recipe = yield recipie_model_1.default.findById(recipeId);
        // Check if the recipe exists
        if (!recipe) {
            return res
                .status(404)
                .json({ success: false, message: "Recipe not found" });
        }
        // Ensure ratings is initialized
        if (!recipe.ratings) {
            recipe.ratings = []; // If ratings is undefined, initialize as an empty array
        }
        // Check if the user has already rated the recipe
        const existingRating = recipe.ratings.find((r) => r.userId.toString() === userId);
        if (existingRating) {
            // Update the existing rating
            existingRating.rating = rating;
        }
        else {
            // Add a new rating
            recipe.ratings.push({ userId, rating });
        }
        // Recalculate the average rating
        const totalRatings = recipe.ratings.length;
        const sumOfRatings = recipe.ratings.reduce((sum, r) => sum + (r.rating || 0), // Handle possible undefined rating
        0);
        const averageRating = totalRatings ? sumOfRatings / totalRatings : 0; // Avoid division by zero
        // Update the recipe's average rating
        recipe.rating = averageRating;
        // Save the updated recipe
        yield recipe.save();
        return res.status(200).json({
            success: true,
            message: "Rating submitted successfully",
            rating: recipe.rating,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateRecipeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Recipe ID from URL params
    const { title, time, image, recipe } = req.body; // Recipe data from the request body
    console.log("hiii", id, title, time, image, recipe);
    try {
        // Validate required fields
        if (!id || !title || !time || !image || !recipe) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Use the service to update the recipe
        const updatedRecipe = yield recipie_services_1.RecipieServices.updateRecipe(id, {
            title,
            time,
            image,
            recipe,
        });
        // If no recipe is found, return an error
        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        // Respond with success and the updated recipe
        return res
            .status(200)
            .json({ message: "Recipe updated successfully", data: updatedRecipe });
    }
    catch (error) {
        console.error("Error updating recipe:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
const likeRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId, userId } = req.body;
    console.log("Recipe ID:", recipeId, "User ID:", userId);
    try {
        const recipe = yield recipie_model_1.default.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        // Check if the user has already liked the recipe
        if (recipe.likedBy.includes(userId)) {
            console.log(`User with ID ${userId} has already liked the recipe: ${recipeId}`);
            // Use $pull to remove the user from likedBy in MongoDB
            yield recipie_model_1.default.updateOne({ _id: recipeId }, { $pull: { likedBy: userId } });
            console.log(`User with ID ${userId} unliked the recipe: ${recipeId}`);
        }
        else {
            // If the user is in dislikedBy, remove them first
            if (recipe.dislikedBy.includes(userId)) {
                console.log(`User with ID ${userId} is in dislikedBy, removing...`);
                // Use $pull to remove the user from dislikedBy array in MongoDB
                yield recipie_model_1.default.updateOne({ _id: recipeId }, { $pull: { dislikedBy: userId } });
                console.log(`User with ID ${userId} removed from dislikedBy`);
            }
            // Add the user to likedBy
            recipe.likedBy.push(userId);
            console.log(`User with ID ${userId} liked the recipe: ${recipeId}`);
        }
        // Save the updated recipe
        yield recipe.save();
        return res
            .status(200)
            .json({ message: "Recipe liked/unliked successfully", data: recipe });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        console.error(`Error processing like/unlike action: ${errorMessage}`);
        return res.status(500).json({
            message: `Error liking/unliking recipe: ${errorMessage}`,
        });
    }
});
const dislikeRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Destructure recipeId and userId from req.body
    const { recipeId, userId } = req.body;
    console.log("Recipe ID:", recipeId, "User ID:", userId);
    try {
        // Find the recipe by its ID
        const recipe = yield recipie_model_1.default.findById(recipeId);
        console.log(recipe); // Logging the recipe to check its details
        if (!recipe) {
            // If no recipe is found, return a 404 error
            return res.status(404).json({ message: "Recipe not found" });
        }
        // Check if the user has already disliked the recipe
        if (recipe.dislikedBy.includes(userId)) {
            console.log(`User with ID ${userId} has already disliked the recipe: ${recipeId}`);
            // Use $pull to remove the user from dislikedBy in MongoDB
            yield recipie_model_1.default.updateOne({ _id: recipeId }, { $pull: { dislikedBy: userId } });
            console.log("User removed dislike from the recipe:", recipeId);
        }
        else {
            // If the user has liked the recipe, remove them from likedBy first
            if (recipe.likedBy.includes(userId)) {
                console.log(`User with ID ${userId} is currently in likedBy, removing...`);
                // Use $pull to remove the user from likedBy in MongoDB
                yield recipie_model_1.default.updateOne({ _id: recipeId }, { $pull: { likedBy: userId } });
                console.log("User removed from likedBy");
            }
            // Add the user to dislikedBy
            yield recipie_model_1.default.updateOne({ _id: recipeId }, { $addToSet: { dislikedBy: userId } } // Use $addToSet to avoid duplicates
            );
            console.log("User disliked the recipe:", recipeId);
        }
        // Return a success message
        return res.status(200).json({
            message: "Recipe disliked/undisliked successfully",
            data: recipe,
        });
    }
    catch (error) {
        // Check if the error is an instance of Error
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        // Log the error and return an appropriate message
        console.error(error);
        return res.status(500).json({
            message: `Error disliking/undisliking recipe: ${errorMessage}`,
        });
    }
});
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id;
    const recipeId = req.body.recipeId; // Get the recipe ID from the request body
    console.log("commentId:", commentId);
    console.log("recipeId:", recipeId);
    try {
        // Find the recipe containing the comment by its ID
        const recipe = yield recipie_model_1.default.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        // Ensure comments array exists
        if (!recipe.comments || recipe.comments.length === 0) {
            return res.status(404).json({ message: "No comments found for this recipe" });
        }
        // Find the comment index to delete
        const commentIndex = recipe.comments.findIndex((comment) => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }
        // Remove the comment from the comments array
        recipe.comments.splice(commentIndex, 1);
        // Save the updated recipe with the comment removed
        yield recipe.save();
        return res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({ message: "Error deleting comment", error });
    }
});
exports.RecipieController = {
    createRecipie,
    getAllRacipie,
    getSingleRecipe,
    getSingleRecipeByEmail,
    deleteRecipe,
    updateRecipieStates,
    addComment,
    postRating,
    updateRecipeController,
    likeRecipe,
    dislikeRecipe,
    deleteComment,
};
