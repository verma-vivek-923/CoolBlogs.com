import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'


export const authContext=createContext();
export const AuthProvider = ({children}) => {

    const [blogs,setBlogs]=useState()

    useEffect(()=>{
        const fetchBlogs=async()=>{
            try {
                const {data}=await axios.get("http://localhost:4500/blog/allblogs"); //{data}==response.data
                setBlogs(data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchBlogs(); 
    },[]);
  return (
       <authContext.Provider value={{ blogs }}>{children}</authContext.Provider>
  );
};

export const useAuth=()=> useContext(authContext);