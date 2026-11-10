import {model, Schema} from "mongoose";

const requestSchema = new Schema({
    msgId: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    },
    senderOfRequest: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverOfRequest: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
},{timestamps: true}
);


export const Request = model('Request', requestSchema);