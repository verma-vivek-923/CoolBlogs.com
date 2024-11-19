import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

function Creators_home() {
  const { blogs } = useAuth();
  const [admins,setAdmins]=useState([]); 

  const dev_blogs=blogs?.filter((key)=>
        key.category==="devotional")

useEffect(()=>{
  const fetchData= async()=>{
    const {data}= await axios.post("http://localhost:4500/user/admins",{
      withCredentials:true,
    });
    console.log(data)
    setAdmins(data)
  }
  fetchData();
},[]);
console.log(admins)


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <div className=" container mx-auto mt-12 ">
      <div className="w-full px-4 py-1 md:px-12 flex justify-between items-center bg-blue-300  rounded-md ">
           <h1 className=" text-2xl font-semibold ">Popular Creators</h1>
           <Link to={"/creators"} className="text-lg  hover:underline hover:font-bold hover:tracking-wider cursor-pointer duration-300">View All</Link>
      </div>
      <Carousel responsive={responsive} className="py-4">
        {admins && admins.length > 0 ? (
          admins.slice(0, 10).map((element) => {
        
            return (
              <div
                key={element._id}
                className="  rounded-lg  mx-2 overflow-hidden "
              >
                <Link to={`/blog/${element._id}`}>
                  <div className=" group relative ">
                    <img
                      src={element.image.url}
                      alt="blog"
                      className="w-full h-48 object-cover rounded-full"
                    />
                  
                    <h1
                      className="text-md  text-center bg-slate-300 px-1 mt-2 py-1 bottom-1 left-3 text-gray-800  mb-1 overflow-hidden  transition-all duration-300 group-hover:tracking-wider"
                      
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {element.name}
                    </h1>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className=" flex w-full h-screen items-center justify-center">
            Loading Data,Please Wait........
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default Creators_hom
