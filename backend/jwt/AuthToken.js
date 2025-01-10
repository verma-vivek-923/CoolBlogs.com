import jwt from "jsonwebtoken"
import { user } from "../models/user.model.js"


export const  createTokenAndSaveCookies=async(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"2d"
    })
    res.cookie("jwt",token,{
        httpOnly:false, //protect form xss
        sameSite:"none",
        secure:true,
        path:"/",
    })
    await user.findByIdAndUpdate(userId,{token})
    return token;
}