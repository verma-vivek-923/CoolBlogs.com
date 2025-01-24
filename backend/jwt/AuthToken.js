import jwt from "jsonwebtoken"
import { user } from "../models/user.model.js"


export const  createTokenAndSaveCookies=async(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        httpOnly:false, //protect form xss
        sameSite:"None",
        secure:true,
        path:"/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
        domain: ".cool-blogs-com.vercel.app",
    })
    await user.findByIdAndUpdate(userId,{token})
    return token;
}