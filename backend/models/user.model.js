import mongoose from "mongoose";
const user_schema=mongoose.Schema({     
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['user','admin']
    },
    image:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    education:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    token:{
        type:String
    },
    otp:String,
    otpExpires:Date,
    isOtpVerified:Boolean,
    createdAt:{
        type:Date,
        default:Date.now
    }


    }
)
export const user=mongoose.model("users",user_schema)
