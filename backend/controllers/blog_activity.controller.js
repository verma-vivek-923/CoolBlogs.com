import { user } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import { blog } from "../models/blog.model.js";
import mongoose from "mongoose";
import { comment_model } from "../models/comment.model.js";

// Handle likes

export const likeBlog = async (req, res) => {
  try {
    const { blogid } = req.params;
    const userId = req.users.id;
    let isLiked;

    console.log(blogid);
    console.log(userId);

    const find_blog = await blog.findById(blogid);

    if (!find_blog) {
      return res.status.json({ message: "Blog Not Found" });
    }

    // Add field if not available
    if (!find_blog.likedby) {
      find_blog.likedby = [];
    }

    const find_loged_user = await user.findById(userId);

    if (find_blog.likedBy.includes(userId)) {
      find_blog.likes -= 1;
      //   find_blog.likedBy=find_blog.likedBy.filter(val=>val !== userId)

      find_blog.likedBy = find_blog.likedBy.filter(
        (id) => id.toString() !== userId
      );

      isLiked = false;

      var message = "Unlike Success";
    } else {
      find_blog.likes += 1;

      await find_blog.likedBy.push(userId);
      isLiked = true;

      var message = "Liked Succes";
    }
    console.log(find_blog.likedBy);

    await find_blog.save();

    res.status(200).json({ message, find_blog,isLiked });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal Error", error });
  }
};

export const createComment = async (req, res) => {
//     const {comment}=req.body;

// const {blogId}=req.params;
// const userId=req.users._id;

// console.log(blogId,userId,comment)

// try {

//   const new_comment= new comment_model({
//          comment,
//          blogId,
//          createdBy:userId
//   })

//   await comment_model.save();

  
// } catch (error) {
  
// }

};
