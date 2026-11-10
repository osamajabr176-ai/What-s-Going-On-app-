import {AppError} from "../../lib/error/error.js";

export const invailedPassword = new AppError("Invaid Password",403);
export const invalidCredentials = new AppError("Invalid credentials",400);
export const invalidOtp = new AppError("Invalid otp",403);
export const expiredOtp = new AppError("Expired",404);