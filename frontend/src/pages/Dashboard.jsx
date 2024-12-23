import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider'
import CreateBlog from '../dashboard/CreateBlog';
import MyBlogs from '../dashboard/MyBlogs';
import MyProfile from '../dashboard/MyProfile'
import Slider from '../dashboard/slider'
import Update_Blog from '../dashboard/Update_Blog';

function Dashboard() {
  const [component,setComponent]=useState();
  const {isAuthenticated }=useAuth();

//   console.log(profile,isAuthenticated);

//  console.log(isAuthenticated);
  
  if(isAuthenticated===false){
    window.location.pathname="/"
    toast.error("Login to Continue")
    console.log(isAuthenticated);
  } 


  return (
    <div  >
      <div >
        <Slider component={component} setComponent={setComponent} />
      </div>
      <div>
            {
              component==='My Profile' ?(
                <MyProfile/>
              ):component==="Create Blog" ?(
                  <CreateBlog/>
              ): component==="Update Blog" ?(
                  <Update_Blog/>
              ): (
                <MyBlogs/>
              )
            }
      </div>
    </div>
  )
}

export default Dashboard
