import * as messageService from "../services/message.service.js";
import {validation} from "../../../lib/validation/validation.js";
import {messageDTO} from "../dto/message.dto.js";


export async function sendMessage(req,res,next) {
    try {

        const data = validation(messageDTO,req.body);

        const {content,receiver,sender} = data;

        const createdMessage = await messageService.sendMessage(content,receiver,sender);
        res.status(201).json({
            message : "Message sent succesfully",
            success : true,
            data : createdMessage
        })
    } catch (error) {
        next(error)
    }
}

export async function getAllMessages(req,res,next) {
    try {
        const {userId} = req.body;
        const messages = await messageService.getAllMessages(userId);
        res.status(200).json({
            message : "Messages retrieved successfully",
            success : true,
            data : messages
        })
    } catch (error) {
        next(error)
    }
}