import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const getMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4500/blog/my-blogs",
          {
            withCredentials: true,
          }
        );
        console.log(data);
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);

    console.log("inside");

    try {
      await axios.delete(`http://localhost:4500/blog/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Blog Deleted");
      // const updatedBlog=myBlogs.filter((key)=>{key.id !== id});
      setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      // setMyBlogs(myBlogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen mt-0  ">
      <h3 className="text-2xl font-semibold text-center pt-4">My Blog</h3>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:ml-60 p-6">
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs.map((element, index) => {
            return (
              <Link
                //to={"/"}
                key={element._id}
                className={`bg-slate-300 z-1 flex flex-col group border-2  rounded-lg shadow-lg hover:shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-200
                    ${index >= 4 ? "hidden md:flex" : ""}
                `}
              >
                <div className=" relative ">
                  <img
                    src={element.blogImage.url}
                    alt="img"
                    className="w-full  h-40 object-cover"
                  />
                  <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300 "></div>
                  <h1 className="absolute bottom-1 left-3 text-white text-sm md:lext-base lg:text-xl  group-hover:text-yellow-300 transition-all duration-300 group-hover:tracking-wider">
                    {element.tittle}
                  </h1>
                </div>
                <div className="flex justify-end items-center space-x-1 text-xs py-0.5 px-1">
                  <Link
                    to={`/blog/update/${element._id}`}
                    className="border-2 rounded-md px-3 py-1  bg-blue-500 hover:bg-blue-600 text-white duration-300"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(element._id)}
                    className="border-2 rounded-md px-3 py-1  bg-red-500 hover:bg-red-600 text-white duration-300"
                  >
                    Delete
                  </button>
                </div>
              </Link>
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

export default MyBlogs;
