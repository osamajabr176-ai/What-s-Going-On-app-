import {User} from '../model/user.model.js'
import {Message} from '../../message/model/message.model.js'
import {Request} from '../../../lib/db/requests.model.js'
import {Conversation} from '../../../lib/db/converation.model.js'
import { AppError } from '../../../lib/error/error.js';



export async function updateUserByEmail(email,UpdatedData) {
    return await User.findOneAndUpdate(
        {email : email},
        UpdatedData,
        {returnDocument: 'after'}
    )
}

export async function findUserById(id) {
    return await User.findOne({_id : id,isDeleted : false},{password : 0});
}

export async function getRecieverIdByMsgId(msgId) {
    return await Message.findOne({_id : msgId});
}

export async function createIdentityRequest(requestData) {
    
    if (!requestData.msgId || !requestData.senderOfRequest) {
        throw new AppError('msgId, senderOfRequest, and receiverOfRequest are required');
    }

    return await Request.create(requestData);
}


export async function getUserRequests(userId) {
    return await Request.find({
        receiverOfRequest: userId
    })
    .populate("msgId")
    .populate("senderOfRequest", "name email");
}

export async function sendIdentityRequestNotification(response,senderId,receiverId,messages) {
    
    if (response.status == false) {
        return;
    }

    const request = await Request.findOneAndUpdate(
        { _id: response.requestId },
        { status: response.status ? 'accepted' : 'rejected' },
        { new: true }
    )

    if (response.status) {
    
        await Conversation.create({
            sender: senderId,
            receiver: receiverId,
            message: messages
        })
    }
    return request;
}

export async function getRequestDetails(requestId) {
    return await Request.findOne({_id: requestId})
        
}

export async function getMessagesByMsgId(senderId, receiverId) {
    let messages = await Message.find({sender: senderId, receiver: receiverId});
    messages =await messages.concat(await Message.find({sender: receiverId, receiver: senderId}));
    console.log(messages);
    return messages; 
}