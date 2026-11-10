import {model, Schema} from "mongoose";

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }},{timestamps: true});

const conversationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    ,
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [messageSchema]
},{timestamps: true});

export const Conversation = model('Conversation', conversationSchema);