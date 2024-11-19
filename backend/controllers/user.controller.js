import { user } from "../models/user.model.js";
import bycrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import { createTokenAndSaveCookies } from "../jwt/AuthToken.js";
import { blog } from "../models/blog.model.js";


export let register=async(req,res)=>{
    try {
        if(!req.files ||Object.keys(req.files).length==0){
            return res.status(400).json({message:"No File uploaded"})
        }
        const {photo}=req.files;
        const allowed_formats=["image/jpeg","image/png"]
        if(!allowed_formats.includes(photo.mimetype)){
            return res.status(400).json({message:"Invalid Photo Format"})
        }

        const { name,phone,email,role,education,password}=req.body;
        console.log( name,phone,email,role,education,password)
    
            let find_user=await user.findOne({email});
    
            if(find_user){
                return res.status(500).json({message:"user already exist"})
            }
            
            const cloudinaryResponse=await cloudinary.uploader.upload(photo.tempFilePath);
            if(!cloudinaryResponse ||cloudinaryResponse.error){
                return res.status(500).json({message:"Cloud Error.Try Again Letter"})  
            }
    
            {
                const hashed_pass=await bycrypt.hash(password,10)
    
            
                const create_user=new user({
                    name:name,
                    phone:phone,
                    role:role,
                    education:education,
                    email:email,
                   password:hashed_pass,
                   image:{
                    public_id:cloudinaryResponse.public_id,
                    url:cloudinaryResponse.url
                   }
                })
                    await create_user.save();
                    const token=await createTokenAndSaveCookies(create_user._id,res)
                    res.status(200).json({message:"User created Successfully",create_user,token:token})
            }
    } catch (error) {
        console.log(error)
       
        res.status(500).json({message:"Internal Server Error"})
    }
}
    
export let login=async (req,res)=>{
       try {
        const {email,password,role}=req.body;

        const find_user=await user.findOne({email});
        // const isMatch=await bycrypt.compare(password,find_user.password); // canot use bacause if user not fould then how it compare directly.
       let isMatch;

        if(find_user){
            
            isMatch=await bycrypt.compare(password,find_user.password);
           
            if(find_user.role !== role){
                return res.status(400).json({ message: `Invalid role ${role}`});
              }
        }
        
        if(!find_user || !isMatch){
            return res.status(400).json({message:"Invalid Email or Password"})
        }
        

        const token=await createTokenAndSaveCookies(find_user._id,res)
            res.status(200).json({message:"You Loged In Successfully",find_user,token:token})
       } catch (error) {
        console.log("Error:-",error.message)
        res.status(400).json({message:"Internal Server Error"})
    }
        
    }
    export const logout=async (req, res) => {

         res.clearCookie("jwt", { httpOnly: true });
        
         res.status(200).json({message: "User logged out successfully" });
        
 };

export const getMyProfile=async (req,res)=>{

    const user_data=await req.users;
    res.status(200).json({user_data});

}

export const getAllAdmin=async (req,res)=>{
    const all_admin=await user.find({role:"admin"});
    
    if(!all_admin || all_admin.length==0){
        return  res.status(400).json({message:"No admins found"})
    }
    res.status(200).json(all_admin);
}

