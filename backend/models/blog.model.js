import mongoose from "mongoose";

const blog_schema=mongoose.Schema({
        
    tittle:{
        type:String,
        required:true
    },
    blogImage:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    category:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true,
    },
    adminName:{
        type:String,
       
    },
    adminPhoto:{
        type:String,
    
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    }


    }
)
export const blog=mongoose.model("blogs",blog_schema)
