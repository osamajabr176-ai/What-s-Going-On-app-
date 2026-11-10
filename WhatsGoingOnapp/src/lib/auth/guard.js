import { AppError } from "../error/error.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const authGuard = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(new AppError("No token provided", 401));
    }

    try {
        req.user = jwt.verify(token, env.jwt.secret, { algorithms: ['HS256'] });
        next();
    } catch (err) {
        // Covers TokenExpiredError, JsonWebTokenError, NotBeforeError
        return next(new AppError("Invalid or expired token", 401));
    }
};
