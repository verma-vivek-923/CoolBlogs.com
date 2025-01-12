import axios, { Axios } from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';


export const authContext=createContext();

export const AuthProvider = ({children}) => {
    const [blogs,setBlogs]=useState();
    const [profile,setProfile]=useState();
    const [isAuthenticated,setIsAuthenticated]=useState();
    console.log(isAuthenticated)

    useEffect(()=>{
        const fetchProfile=async ()=>{
            try {
                const token=Cookies.get('jwt');
                const islog=localStorage.getItem("user");

                console.log("this is token ",token);
       
        if (token || islog) {          
                const  {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/my-profile`,
                {
                    withCredentials: true,
                    headers: {
                      "Content-Type": "application/json",
                    },
            });
                console.log(data);
                // console.log(token);
                setProfile(data.user_data);
                setIsAuthenticated(true)
                console.log(profile,isAuthenticated);
        }else{
            setIsAuthenticated(false);
            console.log("isau"+isAuthenticated);
        }
            } catch (error) {
                console.log(error)
            }
        }
        const fetchBlogs=async()=>{
            try {
                const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/allblogs`); //{data}==response.data
                setBlogs(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchProfile();
        fetchBlogs(); 
    },[]);
  return (
       <authContext.Provider value={{ blogs,profile,isAuthenticated,setIsAuthenticated }}>{children}</authContext.Provider>
  );
};

export const useAuth=()=> useContext(authContext);