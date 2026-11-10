import { Router } from "express";
import {uploadFields, uploadSingleFile} from "../../lib/media/multer.js";
import {fileValidation} from "../../lib/media/file.validation.js";
import {allowedTypes} from "../../lib/media/file.validation.js";
import {authGuard} from "../../lib/auth/guard.js";
import * as userController from "./controllers/user.controller.js";

export const userRouter = Router()
userRouter.post("/upload-profile-pic",authGuard, uploadSingleFile('pp'),fileValidation(allowedTypes.image),userController.uploadUserPic);

userRouter.post("/upload-cv", uploadSingleFile('cv',allowedTypes.cv),fileValidation(['application/pdf','application/msword']),(req, res,next) => {
    res.json({ok:'ok'});
});

userRouter.post("/request-identity",userController.requestUserIdentity);
userRouter.post("/requests",userController.getUserRequests);
userRouter.patch("/request-notification",userController.sendIdentityRequestNotification);

