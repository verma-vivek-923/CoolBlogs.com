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
       
        if (token) {          
                const  {data}=await axios.get("http://localhost:4500/user/my-profile",
                {
                    withCredentials: true,
                    headers: {
                      "Content-Type": "application/json",
                    },
            });
                console.log(data)
                setProfile(data.user_data);
                setIsAuthenticated(true)
                console.log(profile,isAuthenticated);
        }else{
            setIsAuthenticated(false);
        }
            } catch (error) {
                console.log(error)
            }
        }
        const fetchBlogs=async()=>{
            try {
                const {data}=await axios.get("http://localhost:4500/blog/allblogs"); //{data}==response.data
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