import {Router} from "express";
import {authRouter} from "./app/auth/auth.router.js";
import {userRouter} from "./app/user/user.router.js";
import {messageRouter} from "../src/app/message/message.router.js";

export const appRouter = Router();
appRouter.use('/v1', authRouter);
appRouter.use('/v1/users', userRouter);
appRouter.use('/v1/message',messageRouter);
