import React from "react";
import Creators_home from "../home/Creators_home";
import Devotional from "../home/Devotional";
import Hero from "../home/Hero";
import Trending from "../home/Trending";
import { LuPlus } from "react-icons/lu";
import { useAuth } from "../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

function Home({setComponent}) {
  const {isAuthenticated}=useAuth();
  const navigateTo = useNavigate();
  
  const handleClick=()=>{
    // setComponent("create blog");
    navigateTo("/dashboard",{state:{active_component:"Create Blog"}});
  }

  return (
    <div className=" px-4 py-2 border">
      <Hero />
      <Trending />
      <Devotional />
      <Creators_home />

    { isAuthenticated &&
     <div className=" fixed group bg-blue-600 hover:bg-blue-800 text-white rounded-lg right-10 lg:right-12  bottom-8">
        <button onClick={handleClick} className="flex items-center p-2">
          <LuPlus size={32} />
          <p className="hidden lg:block transition-all duration-300 origin-left">
            Create Blog
          </p>
        </button>
      </div>
    } 
    </div>
  );
}

export default Home;
