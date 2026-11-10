import { model, Schema } from "mongoose";

const otpSchema = new Schema({

    code : {
        type : String,
        required : true,
        length : 6
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        Lowercase : true
    },
    expiresAt : {
        type : Date,
        required : true,
        index : {
            expires : 0
        }
    }
},
{
    timestamps : {
        createdAt : true,
        updatedAt : false
    }

});

export const OTP = model('OTP',otpSchema);