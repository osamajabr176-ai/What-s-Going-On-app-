import { Router } from "express";
import * as messageController from '../message/controllers/message.controller.js'
import {authGuard} from "../../lib/auth/guard.js";
export const messageRouter = Router()

messageRouter.post('/send-message',authGuard,messageController.sendMessage);
messageRouter.post('/send-message/public',messageController.sendMessage);
messageRouter.get('/get-all-messages',authGuard,messageController.getAllMessages);