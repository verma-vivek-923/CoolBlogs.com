import React, { createContext, useContext, useState } from 'react'
import axiosInstance from '../utilities/axiosInstance';


const AuthorContext=createContext();

export const AuthorActivityProvider = ({children}) => {
  const [isFollowed,setIsFollowed]=useState();

  try {
     const followAuthor=async (author_Id)=>{
     
    const {data}=await  axiosInstance.post(`/user/${author_Id}/follow`);

    setIsFollowed(!isFollowed);
    return data
  }
  } catch (error) {
    console.log(error)
  }
 
    
// useEffect(() => {
//  setIsFollowed(autho?r.followedBy?.includes(profile._id)) 

// }, [])

  return (
    <AuthorContext.Provider value={{followAuthor,isFollowed}}>
       {children}
    </AuthorContext.Provider>
  )
}

export const authorActivity=()=>useContext(AuthorContext)
