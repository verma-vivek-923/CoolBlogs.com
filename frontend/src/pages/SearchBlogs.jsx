import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Link, useSearchParams } from "react-router-dom";

const SearchBlogs = () => {
  const [search] = useSearchParams();
  const [resultBlogs, setResultBlogs] = useState();

  const searchText = search.get("query");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blog/search/${searchText}`,
          {
            withCredentials: true,
          }
        );
        // console.log(data.find_blog);
        setResultBlogs(data.find_blog);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResult();
  }, [searchText]);

  console.log(resultBlogs);

  return (
    <div className="container min-h-screen mx-auto z-50">
      <h3 className="text-lg lg:text-xl font-semibold ml-4 pt-4">
        Search Results for "{searchText}"
      </h3>
      <div className="py-4 container grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5  gap-y-4">
        {resultBlogs && resultBlogs.length > 0 ? (
          resultBlogs.slice(0).map((element) => {
            return (
              <div
                key={element._id}
                className="p-1 bg-slate-300 border group border-gray-400 rounded-lg shadow-xl mx-2 hover:shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <Link to={`/blog/${element._id}`} className="flex md:flex-col">
                  <div className="relative border-2 bg-blue-700 rounded-md overflow-hidden  border-b-gray-400">
                    <img
                      src={element.blogImage.url}
                      alt="blog"
                      className="w-20 h-20 md:w-full md:h-48 object-cover rounded-md "
                    />
                    {/* <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
                      {element.category}
                    </div> */}
                    <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80  transition-transform duration-300 "></div>
                  </div>
                  <div className="px-2 pb-2  rounded-b-lg gap-2  flex flex-col justify-end">
                    <h1
                      className="text-xl  font-bold mb-1 capitalize truncate overflow-hidden text-ellipsis transition-all duration-300 group-hover:tracking-wider"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {element.tittle}
                    </h1>
                    <div className="flex  space-x-2 items-center">
                      <img
                        src={element.adminPhoto}
                        alt="author_avatar"
                        className="w-4 h-4 md:w-8 md:h-8 rounded-full"
                      />
                      <p className="text-xs font-semibold text-gray-800 capitalize truncate ">
                        {element.adminName}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : resultBlogs?.length <= 0 ? (
          <div className=" col-span-full mt-24 flex flex-col h-screen items-center">
            <h1 className="text-xl text-center">
              No Blogs Found Related to <br/><span className="text-3xl font-semibold">"{searchText}"</span>
            </h1>
          </div>
        ) : (
          <div className=" flex h-screen w-full  col-span-full items-start justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBlogs;
