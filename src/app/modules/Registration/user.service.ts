import { startSession } from "mongoose";
import mongoose from "mongoose";
import { IUser } from "./user.interface";
import { UserRegModel } from "./user.model";

//creating data into db using rollback and transiction
const createUserIntoDB = async (userData: IUser) => {
  try {
    // Check if user already exists
    const existingUser = await UserRegModel.findOne({ userId: userData.userId });
    if (existingUser) {
      throw new Error("User with this userId already exists");
    }

    // Create a new user
    const newUser = await UserRegModel.create(userData);

    return newUser;
  } catch (err: any) {
    throw new Error(err.message || "Failed to create user");
  }
};



const getAllUserFromDB = async () => {
  const result = await UserRegModel.find(); // Filter for isDeleted being false
  if (!result || result.length === 0) {
    // Check if result is empty
    throw new Error("No data Found");
  }
  return result;
};






export const UserServices = {
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
