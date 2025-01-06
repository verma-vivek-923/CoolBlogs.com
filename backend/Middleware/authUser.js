import jwt from 'jsonwebtoken'
import { user } from '../models/user.model.js';

//Authentication
export const isAuthenticated=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        console.log(token)

        if(!token){
            return res.status(401).json({message:"User not Authenticated"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("decoded",decoded);
        console.log("dId",decoded.userId);
        
        const user_find=await user.findById(decoded.userId);
        
        if(!user_find){
            return res.status(404).json({message:"User not Found"});
        }
        req.users=user_find;

        next();
    } catch (error) {
        console.log("Authentication Error :-",error);
        return res.status(401).json({message:"You are not Autheficated"})
    }
}

//Authorization
export const isAdmin=(...roles)=>{
    return (req,res,next)=>{

        if(!roles.includes(req.users.role)){
            return res.status(403).json({message:`user with this role ${req.users.role} not allowed`})
        }
        next();
    }
}

//is OTP verified
export const isUser=async (req,res,next)=>{
    const {email}=req.body;

    const find_user = await user.findOne({ email });
    
    if (!find_user) {
      return res.status(400).json({ message: "Invalid Email" });
    }
    next();

}