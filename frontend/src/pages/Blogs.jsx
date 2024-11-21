import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function Blogs() {
  const { blogs } = useAuth();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
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
    <div className=" container mx-auto mt-12">
      {/* <div className="w-full px-4 py-1 md:px-12 flex justify-between items-center bg-blue-300  rounded-md ">
           <h1 className=" text-2xl font-semibold ">Trending</h1>
           <Link to={"/blogs"} className="text-lg  hover:underline hover:font-bold hover:tracking-wider cursor-pointer duration-300">View All</Link>
      </div> */}
      <div  className="py-4 container grid grid-cols-5 gap-y-8">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0,).map((element) => {
            return (
              <div
                key={element._id}
                className="p-1 bg-slate-300 border group border-gray-400 rounded-lg shadow-xl mx-2 hover:shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <Link to={`/blog/${element._id}`}>
                  <div className="relative border-2  border-b-gray-400">
                    <img
                      src={element.blogImage.url}
                      alt="blog"
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
                      {element.category}
                    </div>
                    <div className='absolute w-full h-full inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40  transition-transform duration-300 '></div>
                  </div>
                  <div className="px-2 pb-2  rounded-b-lg  flex flex-col justify-between">
                    <h1
                      className="text-lg font-bold mb-1 overflow-hidden text-ellipsis transition-all duration-300 group-hover:tracking-wider"
                      
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {element.tittle}
                    </h1>
                    <div className="flex  space-x-2 items-center">
                      <img
                        src={element.adminPhoto}
                        alt="author_avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <p className="text-sm font-semibold text-gray-800  ">
                        {element.adminName}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className=" flex h-screen items-center justify-center">
            Loading....
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
