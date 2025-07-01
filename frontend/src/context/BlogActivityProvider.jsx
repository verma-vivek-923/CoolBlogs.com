import React, { createContext, useContext, useState } from "react";
import axiosInstance from "../utilities/axiosInstance";
import toast from "react-hot-toast";

export const ActivityContext = createContext();

export const BlogActivityProvider = ({ children }) => {
  const likeBlog = async (blog_id, user_id) => {
    try {
      const { data } = await axiosInstance.post(`/blog/${blog_id}/like-blog`);

      console.log(data);
      return data.find_blog;
    } catch (error) {
      console.log(error);
      const errMsg = error?.response.data.message;

      if (errMsg) {
        toast.error(errMsg);
      }
    }
  };

  const fetchAllComment = async (blogId) => {
    try {
      const { data } = await axiosInstance.get(
        `/blog/${blogId}/get-all-comment`
      );
      return data.all_comment;
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async (newComment, blogId, parentId) => {
    try {
      const postData = {
        comment: newComment,
        parentId,
      };
      console.log(newComment);
      console.log(parentId);
      console.log(blogId);
      console.log(postData);

      const { data } = await axiosInstance.post(
        `/blog/${blogId}/add-comment`,
        postData
      );

      // console.log(data)
      return data.new_comment;
    } catch (error) {
      console.log(error);
    }
  };

  const editComment = async (edited_Comment, comment_Id, blogId) => {
    const edited_Data = {
      newText: edited_Comment,
      commentId: comment_Id,
    };

    const { data } = await axiosInstance.put(
      `/blog/${blogId}/edit-comment`,
      edited_Data
    );

    console.log(data);

    return data?.updated_comment;
  };

  const deleteComment = async (comment_Id, parent_Id, blogId) => {
    // console.log(comment_Id, parent_Id);
    const delete_data = {
      commentId: comment_Id,
    };

    const { data } =await axiosInstance.delete(
      `/blog/${blogId}/delete-comment`,
     { data:delete_data}
    );

    console.log(data);
    return data.all_comment
  };

  return (
    <ActivityContext.Provider
      value={{
        likeBlog,
        fetchAllComment,
        postComment,
        editComment,
        deleteComment,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);
