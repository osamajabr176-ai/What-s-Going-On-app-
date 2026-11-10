import {userNotExists} from "../errors.js";
import * as userRepo from '../repositry/user.repo.js'
import fs from "node:fs";
import { AppError } from "../../../lib/error/error.js";


export async function uploadUserPic(id,file) {
    const user = await userRepo.findUserById(id);
    if (!user) {
        throw userNotExists;
    }
    if (user.profilePicPath){
        fs.unlinkSync(user.profilePicPath)
    }
    await userRepo.updateUserByEmail(user.email,{profilePicPath:file.path})
}

export async function requestUserIdentity (msgId) {
        if (!msgId) {
            throw new AppError('Message ID is required',400);
        }

        const message = await userRepo.getRecieverIdByMsgId(msgId);
        if (!message) {
            throw new AppError('Message not found',404);
        }
        await userRepo.createIdentityRequest({
            msgId: message._id,
            senderOfRequest: message.receiver,
            receiverOfRequest: message.sender 
        });
}

export async function getUserRequests(userId) {

    const user = await userRepo.findUserById(userId);

    if (!user) {
        throw userNotExists;
    }

    const requests = await userRepo.getUserRequests(userId);

    return requests;
}

export async function sendIdentityRequestNotification(response) {

    const { senderOfRequest, receiverOfRequest } = await userRepo.getRequestDetails(response.requestId)
    const messages = await userRepo.getMessagesByMsgId(senderOfRequest, receiverOfRequest);
    return await userRepo.sendIdentityRequestNotification(response, senderOfRequest, receiverOfRequest, messages);
}