import jwt from "jsonwebtoken"
import { user } from "../models/user.model.js"


export const  createTokenAndSaveCookies=async(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"2d"
    })
    res.cookie("jwt",token,{
        httpOnly:true, //protect form xss
        secure:true,
        sameSite:"strict" //protect from csrf
    })
    await user.findByIdAndUpdate(userId,{token})
    return token;
}