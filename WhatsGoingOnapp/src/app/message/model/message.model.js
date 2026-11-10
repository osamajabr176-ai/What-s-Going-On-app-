import { model, Schema } from "mongoose";

const messageSchema = new Schema({
    content : {
        type : String,
        required : true,
        trim : true,
        minLength : 3,
        maxLength: 200
    },
    receiver : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    sender : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},
{
    timestamps : {
        createdAt : true,
        updatedAt : true
    }

});

export const Message = model('Message',messageSchema);