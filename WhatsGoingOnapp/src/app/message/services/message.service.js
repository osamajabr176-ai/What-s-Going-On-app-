import * as userRepo from "../../user/repositry/user.repo.js";
import {userNotExists} from "../../user/errors.js"; 
import * as messageRepo from "../repositry/message.repo.js";
import { AppError } from "../../../lib/error/error.js";

export async function sendMessage(content,receiver,sender) {

    const user = await userRepo.findUserById(receiver);

    if(!user) throw userNotExists;

    return await messageRepo.createMessage(content,receiver,sender);
}
export async function getAllMessages(userId) {
    const messages = await messageRepo.getAllMessages(userId);

    if(messages.length === 0) throw new AppError("No messages found",404);

    return messages;
}