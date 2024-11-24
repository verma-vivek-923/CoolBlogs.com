import axios, { Axios } from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';


export const authContext=createContext();

export const AuthProvider = ({children}) => {

    const [blogs,setBlogs]=useState();
    const[profile,setProfile]=useState();
    const [isAuthenticated,setIsAuthenticated]=useState(false)

    useEffect(()=>{
        const fetchBlogs=async()=>{
            try {
                const {data}=await axios.get("http://localhost:4500/blog/allblogs"); //{data}==response.data
                setBlogs(data)
                setIsAuthenticated(true)
            } catch (error) {
                console.log(error)
            }
        };

        const fetchProfile=async ()=>{
            try {
                const token=Cookies.get('jwt')
               
        if (token) {          
                const  {data}=await axios.get("http://localhost:4500/user/my-profile",
                {
                    withCredentials: true,
                    headers: {
                      "Content-Type": "application/json",
                    },
            });
                console.log(data)
                setProfile(data);
                setIsAuthenticated(true);

        }
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlogs(); 
        fetchProfile();
    },[]);
  return (
       <authContext.Provider value={{ blogs,profile,isAuthenticated }}>{children}</authContext.Provider>
  );
};

export const useAuth=()=> useContext(authContext);