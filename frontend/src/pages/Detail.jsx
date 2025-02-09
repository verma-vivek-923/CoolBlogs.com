import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loading from "../components/loading";

function Detail() {
  const { id } = useParams();
  const [blogs, setblogs] = useState({});
  const [show, setShow] = useState();
  const [loading, setLoading] = useState();

  const { profile } = useAuth();

  // console.log(blogs);
  useEffect(() => {
    const fetchblogs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blog/singleblog/${id}`,

          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        setblogs(data.find_blog);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblogs();
  }, [id]);

  useEffect(() => {
    if (blogs?.createdBy === profile?._id) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [blogs, profile]);

  console.log(blogs);
  console.log(Object.keys(blogs).length);

  return (
    <div>
      <div className="min-h-screen flex relative justify-center pt-8 items-start">
        <Link
          to={"/"}
          className=" absolute  top-4  left-4 px-2 md:px-10 flex  items-center space-x-1"
        >
          <IoHome />
          <span>Home</span>
        </Link>
        <div className="group w-full bg-white max-w-3xl p-4 shadow-2xl rounded-md  mx-auto">
          {blogs && Object.keys(blogs).length > 0 ? (
            <div>
              <div className="relative ">
                <img
                  className="w-full h-96 object-cover rounded-lg mb-2 group-hover:h-96 transition-all ease-in-out"
                  src={blogs?.blogImage?.url}
                  alt="blog image"
                />
                <div className="absolute w-full h-full rounded-md inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-20  transition-transform duration-300 "></div>
              </div>

              <div>
                <div className="flex justify-between px-4">
                  <h1 className="text-xl md:text-2xl lg:text-3xl capitalize font-semibold text-indigo-800">
                    {blogs?.tittle}
                  </h1>
                  <Link
                    to={`/blog/update/${blogs._id}`}
                    className={`border-2 ${
                      show ? "flex" : "hidden"
                    }  items-center text-sm gap-2 rounded-md px-2 py-1 bg-red-500 hover:bg-red-600 text-white duration-300`}
                  >
                    <CiEdit size={16} /> Edit
                  </Link>
                </div>
                <div className="flex  space-x-2 mt-4 items-center">
                  <img
                    src={blogs?.adminPhoto}
                    alt="author_avatar"
                    className="w-6 h-6 md:w-8 md:h-8 object-cover rounded-full border-2 border-yellow-800"
                  />
                  <p className="text-xs  capitalize font-semibold text-gray-700 ">
                    {blogs.adminName}
                  </p>
                  <span className="font-light">|</span>
                  <span className="text-sm ">
                    {new Date(blogs?.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="mt-3 border-t border-gray-300" />
              </div>
              <div className="mt-6 mb-12 text-gray-600">{blogs?.about}</div>
            </div>
          ) : (
            <div className="h-96 flex px-2 py-4 justify-center">
              {/* <span className="loading loading-spinner loading-lg"></span> */}
              <div className="flex w-full justify-center flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="skeleton h-36 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
                  <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                  </div>
                </div>

                <div className="flex flex-col pr-8 gap-4 items-start">
                  <div className="skeleton h-4  w-full"></div>
                  <div className="skeleton h-4  w-full"></div>
                  <div className="skeleton h-4  w-full"></div>
                  <div className="skeleton h-4  w-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
