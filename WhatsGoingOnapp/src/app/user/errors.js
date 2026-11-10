import {AppError} from "../../lib/error/error.js";

export const userNotExists = new AppError("User not exists",404);
export const userAlreadyExists= new AppError("User already exists",409);
export const userAlreadyVerified = new AppError("User already verified",400);
export const userNotVerified = new AppError("The user is not verified",403);
export const userNot2StepVerified = new AppError("The user is not 2-step verified",403);