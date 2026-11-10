import { Message } from "../model/message.model.js";
export async function createMessage(content,receiver,sender ) {
    return await Message.create({
        content,
        receiver,
        sender
    })
}
export async function getAllMessages(userId) {
    return await Message.find( { receiver: userId },{},{populate : {path : 'sender',select : 'name email'}});
}