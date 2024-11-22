import { user } from "../models/user.model.js";
// import bycrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import { blog } from '../models/blog.model.js';
import mongoose from "mongoose";

export const createBlog=async(req,res)=>{
    try {
        if(!req.files ||Object.keys(req.files).length==0){
            return res.status(400).json({message:"No File uploaded"})
        }
        const {blogImage}=req.files;
        const allowed_formats=["image/jpeg","image/png"]
        if(!allowed_formats.includes(blogImage.mimetype)){
            return res.status(400).json({message:"Invalid Photo Format"})
        }

        const { tittle,category,about}=req.body;
        const adminName=req?.users?.name;
        const adminPhoto=req?.users?.image?.url;
        const createdBy=req?.users?._id;
    
            const cloudinaryResponse=await cloudinary.uploader.upload(blogImage.tempFilePath);
            if(!cloudinaryResponse ||cloudinaryResponse.error){
                console.log("cloud error")
                
            }
  
                const create_blog={
                    tittle,about,category,adminName,adminPhoto,createdBy,
                   blogImage:{
                    public_id:cloudinaryResponse.public_id,
                    url:cloudinaryResponse.url
                   }
                }
                 const blog_data=await blog.create(create_blog);;
                    res.status(200).json({message:"Blog created Successfully",blog_data})
           
    } catch (error) {
        console.log(error)
       
        res.status(500).json({message:"Internal Server Error"})
    }
}
    
export const deleteBlog=async (req,res)=>{
    const {id}=req.params;

    const find_blog=await blog.findById(id)

    if(!find_blog){
     return res.status(400).json({message:"Blog Not Found"})
    }
    await find_blog.deleteOne();
    res.status(200).json({message:"Blog deleted Successfully"})
}

export const getAllBlogs=async(req,res)=>{
    
    const all_blogs= await blog.find();
    // console.log(all_blogs)
    
    res.status(200).json(all_blogs)
    
}

export const singleBlog=async (req,res)=>{ 
    const {id}=req.params;

    const find_blog=await blog.findById(id)
    
    if(!find_blog){
        return res.status(400).json({message:"Blog Not Found"})  
    }
    
    res.status(200).json({message:"blog are :-",find_blog})
    
}

export const updateBlog=async (req,res)=>{
    const {id}=req.params;
    const {tittle,category,about}=req.body;
   
   // check object id is valid or not (it check only format not value)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"Invalid Object Id"})  
    }

    // const new_data={
    //     tittle,category,about
    // }
 const updated_blog=  await blog.findByIdAndUpdate(id,req.body,{new:true});
  
    if(!updated_blog){
        return res.status(400).json({message:"Blog not Found"});
    }
         res.status(200).json({message:"Blog updated Successfully",updated_blog})  
}