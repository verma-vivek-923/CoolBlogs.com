import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
function Trending() {
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
    <div className=" container mx-auto mt-4">
      <div className="w-full px-4 py-1 md:px-12 flex justify-between items-center bg-blue-300  rounded-md ">
        <h1 className=" text-2xl font-semibold ">Trending</h1>
        <Link
          to={"/blogs"}
          className="text-lg  hover:underline hover:font-bold hover:tracking-wider cursor-pointer duration-300"
        >
          View All
        </Link>
      </div>
      <div>
        {blogs && blogs.length > 0 ? (
          <Carousel responsive={responsive} className="py-4">
            {blogs.slice(0, 10).map((element) => {
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
                      <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40  transition-transform duration-300 "></div>
                    </div>
                    <div className="px-2 pb-2  rounded-b-lg  flex flex-col justify-between">
                      <h1
                        className="text-lg capitalize truncate font-bold mb-1 overflow-hidden text-ellipsis transition-all duration-300 group-hover:tracking-wider"
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
                        <p className="text-sm font-semibold text-gray-800 capitalize truncate  ">
                          {element.adminName}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Carousel>
        ) : (
          // <div className="flex h-44 justify-center items-center space-x-2">
          //    <svg
          //      className="animate-spin h-5 w-5 text-slate-800"
          //      xmlns="http://www.w3.org/2000/svg"
          //      fill="none"
          //      viewBox="0 0 24 24"
          //    >
          //      <circle
          //        className="opacity-25"
          //        cx="12"
          //        cy="12"
          //        r="10"
          //        stroke="currentColor"
          //        strokeWidth="4"
          //      ></circle>
          //      <path
          //        className="opacity-75"
          //        fill="currentColor"
          //        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.28.805 4.373 2.143 6.027l1.857-1.736z"
          //      ></path>
          //    </svg>
          //    <span>Loding...</span>
          //  </div>
          // <div className="flex flex-col md:flex-row  justify-center gap-4 pt-2  items-center space-x-2">
          //   <div className="skeleton h-60 w-52"></div>
          // </div>
          <Carousel responsive={responsive} className="py-4  px-2">
             <div className="skeleton h-44 mx-2"></div>
             <div className="skeleton h-44 mx-2"></div>
             <div className="skeleton h-44 mx-2"></div>
             <div className="skeleton h-44 mx-2"></div>
             <div className="skeleton h-44 mx-2"></div>
             <div className="skeleton h-44 mx-2"></div>
             <div className="skeleton h-44 mx-2"></div>
             </Carousel>
        )}
      </div>
    </div>
  );
}

export default Trending;
