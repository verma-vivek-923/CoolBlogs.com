import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'
import CreateBlog from '../dashboard/CreateBlog';
import MyBlogs from '../dashboard/MyBlogs';
import MyProfile from '../dashboard/MyProfile'
import Slider from '../dashboard/Slider'
import Update_Blog from '../dashboard/Update_Blog';

function Dashboard() {
  const location=useLocation();
  const initial_component=location.state?.active_component || undefined;
  const [component,setComponent]=useState(initial_component);
  const {isAuthenticated }=useAuth();

//   console.log(profile,isAuthenticated);
//  console.log(isAuthenticated);
// console.log(component)  

  if(isAuthenticated===false){
    window.location.pathname="/"
    toast.error("Login to Continue")
    //console.log(isAuthenticated);
  } 


  return (
    <div  >
      <div >
        <Slider component={component} setComponent={setComponent} />
      </div>
      <div>
            {
              component==='My Blogs' ?(
                <MyBlogs setComponent={setComponent}/>
              ):component==="Create Blog" ?(
                  <CreateBlog/>
              ): component==="Update Blog" ?(
                  <Update_Blog/>
              ): (
                <MyProfile/>
              )
            }
      </div>
    </div>
  )
}

export default Dashboard
