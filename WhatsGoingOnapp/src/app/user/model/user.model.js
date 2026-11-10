import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        minLength : 3,
        maxLength: 30
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        Lowercase : true
    },
    password : {
        required : function(){
            return this.provider === 'Local'
        },
        type : String
    },
    provider : {
        type : String,
        enum : ['Local','google','facebook'],
        default : 'Local'
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    dob : Date,
    gender : {
        type : String,
        enum : ['Male' , 'Female'],
        default : 'Male'
    },
    profilePicPath:String,
    coverImagePath:[String],
    cvPath:String,
},
{
    timestamps : {
        createdAt : true,
        updatedAt : true
    }

});

export const User = model('User',userSchema);