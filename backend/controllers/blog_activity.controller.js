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

    res.status(200).json({ message, find_blog, isLiked });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal Error", error });
  }
};

export const createComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.users._id; //loged in user id
    const { comment, parentId } = req.body;

    console.log(blogId);
    console.log(userId);
    console.log(comment);

    if (!comment || !blogId) {
      return res.status.json({ message: "Fill All field " });
    }

    const find_blog = blog.findById(blogId);
    if (!find_blog) {
      return res.status(200).json({ message: "not found" });
    }

    const new_comment = new comment_model({
      comment,
      blogId,
      commentedBy: userId,
      parentId: parentId ? parentId : null,
    });

    console.log(new_comment);
    await new_comment.save();

    if (parentId) {
      const parent_comment = await comment_model.findById(parentId);

      parent_comment?.replies.push(new_comment._id);
      await parent_comment.save();
    }
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unsuccess", error });
  }
};

export const getAllComment = async (req, res) => {
  try {
    const { blogId } = req.params;

    const all_comment = await comment_model
      .find({ blogId })
      .populate("userId")
      .lean();

    if (!all_comment) {
      return res.status(500).json({ message: "No Comment Found" });
    }
    console.log(all_comment);
    res.status(200).json({ all_comment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const editComment = async (req, res) => {
  try {
    const { commentId, newText } = req.body;
    const userId = req.users._id;

    const find_comment = await comment_model.findById(commentId);

    if (!find_comment)
      return res.status(500).json({ message: "Comment Not Found" });

    if (find_comment.commentedBy.toString() !== userId.toString())
      return res.status(500).json({ message: "You Not Created this Comment" });

    const updated_comment = await comment_model.findByIdAndUpdate(
      commentId,
      {
        comment: newText,
        modifyAt: Date.now(),
      },
      { new: true, runValidation: true } // use $set:{} if new data is bounded in object insted of destructured
    );
    // const updated_comment = await comment_model.findByIdAndUpdate(
    //   commentId, { $set: {comment: newText,modifyAt: Date.now(), },},{ new: true}
    // );

    console.log(updated_comment);
    res.status(200).json({ message: "Updated Successfully", updated_comment });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.body;
  const userId = req.users._id;

  const find_comment = await comment_model.findById(commentId);

  if (!find_comment)
    return res.status(500).json({ message: "Comment Not Found" });

  if (find_comment.commentedBy.toString() !== userId.toString())
    return res.status(500).json({ message: "You Not Created this Comment" });

  
  // delete All replies
   for(let i=0;i<find_comment.replies.length;i++){
         await comment_model.findByIdAndDelete(find_comment.replies[i])
   }

  await comment_model.deleteMany({parentId:commentId})
  
  // await find_comment.deleteOne();

  res.status(200).json({ message: "Comment Deleted " });
};
