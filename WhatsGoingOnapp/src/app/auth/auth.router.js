import { Router } from "express";
import * as authController from '../auth/controllers/auth.controller.js';
import { User } from "../user/model/user.model.js";
import { withCache } from "../../lib/cache/withCache.js";
import { idempotency } from "../../lib/idempotency/idempotency.js";

export const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.patch('/verify-account', authController.verifyAccount);
authRouter.post('/login', authController.login);
authRouter.post('/send-otp', authController.sendOtp);
authRouter.patch('/reset-password', idempotency(), authController.resetPassword);
authRouter.post('/login-with-google-code', authController.loginWithGoogle);
authRouter.post('/enable-2step-verification', authController.enable2stepVarification);
authRouter.post('/refresh-token', authController.refreshToken);