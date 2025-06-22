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

  return (
    <ActivityContext.Provider value={{ likeBlog }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => useContext(ActivityContext);
