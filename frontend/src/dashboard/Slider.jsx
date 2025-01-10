import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { ImBlogger } from "react-icons/im";
import { CgProfile, CgCloseO } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";

import { IoHome, IoCreateOutline } from "react-icons/io5";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { IoIosWarning } from "react-icons/io";

const Slider = ({ setComponent }) => {
  const { profile, setIsAuthenticated } = useAuth();
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();

  const handleComponent = (value) => {
    setComponent(value);
    setShow(!show);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(data)
      setIsAuthenticated(false);
      window.location.pathname = "/";
      toast.success("Logout Succesfully");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div>
      <div
        className="md:hidden sm:flex  pointer  fixed top-4 left-4 z-50"
        onClick={() => setShow(!show)}
      >
        {!show ? <AiOutlineMenuUnfold size={28} /> : <CgCloseO size={28} />}
      </div>
      <div
        className={` transition-transform transform duration-500  rounded-md sm:-translate-x-full md:translate-x-0 w-60 min-h-screen fixed  top-0 left-0 z-40 py-6 pl-2 bg-white border
        ${show ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="flex flex-col items-center justify-center ">
          <img
            src={profile?.image?.url}
            alt="profile image"
            className="w-28 h-28 rounded-full bg-blue-600 border-2 border-yellow-700 mb-4"
          />
          <h1 className="text-center text-md py-0.5 px-2 text-gray-800 bg-slate-300 rounded-md">
            {profile?.name}
          </h1>
        </div>
        <div className="space-y-1 mt-4">
          <button
            onClick={() => handleComponent("My Profile")}
            className="flex justify-start focus:border-2 focus:border-blue-400 rounded-s-md items-center  hover:text-blue-500 hover:tracking-wider hover:underline hover:font-bold duration-300 border-r-transparent  py-2 px-6 w-full  space-x-2"
          >
            <CgProfile size={20} /> <h1 className="text-xl">My Profile</h1>{" "}
          </button>
          <button
            onClick={() => {
              if (profile?.role == "admin") {
                handleComponent("Create Blog");
              } else {
                setShow(!show);
                document.getElementById("my_modal_1").showModal();
              }
            }}
            className="flex justify-start focus:border focus:border-blue-400 rounded-md items-center  hover:text-blue-500 hover:tracking-wider hover:underline hover:font-bold duration-300 border-r-transparent  py-2 px-6 w-full  space-x-2"
          >
            <IoCreateOutline size={20} />{" "}
            <h1 className="text-xl">Create Blog</h1>{" "}
          </button>
          <button
            onClick={() => {
              if (profile?.role == "admin") {
                handleComponent("My Blogs")
              } else {
                setShow(!show);
                document.getElementById("my_modal_1").showModal();
              }
            }}
            className="flex justify-start focus:border focus:border-blue-400 rounded-md items-center  hover:text-blue-500 hover:tracking-wider hover:underline hover:font-bold duration-300 border-r-transparent  py-2 px-6 w-full  space-x-2"
          >
            <ImBlogger /> <h1 className="text-xl">My Blogs</h1>{" "}
          </button>
          <button
            onClick={() => navigateTo("/")}
            className="flex justify-start rounded-md items-center  hover:text-blue-400 hover:tracking-wider hover:underline hover:font-bold duration-300 border-r-transparent  py-2 px-6 w-full  space-x-2"
          >
            <IoHome /> <h1 className="text-xl">Home</h1>{" "}
          </button>
          <button
            onClick={handleLogout}
            className="flex justify-start rounded-md items-center  hover:text-red-600  hover:tracking-wider hover:underline hover:font-bold duration-300 border-r-transparent  py-2 px-6 w-full  space-x-2 text-red-500"
          >
            <TbLogout size={20} /> <h1 className="text-xl">Logout</h1>{" "}
          </button>
        </div>

        {/* Show Warning: Unauthorized user access */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => document.getElementById("my_modal_1").close()}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-2xl flex justify-start gap-2 items-center text-gray-800">
            <IoIosWarning /> Warning
            </h3>
            <p className="py-4 text-gray-600 text-sm md:text-base">
              It seems like you are not allowed to create blog as you are not Admin,Please updrade your account to admin to create and post blog
            </p>
            <div className="modal-action">
              <form method="dialog" className="flex justify-end space-x-4">
                <button
                  onClick={() => document.getElementById("my_modal_1").close()}
                  className="px-4 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>

                <button
                  // onClick={() => handleUpdate(element._id)}
                  className="px-4 py-1 bg-red-700 text-white rounded-lg hover:bg-red-900 text-sm md:text-base focus:outline-none focus:ring-2 duration-300 focus:ring-red-500"
                >
                 <Link
                to={`/user/update/${profile?._id}`}
                // className={` absolute right-5 -bottom-12 border-2 flex items-center text-sm gap-2 rounded-md px-2 py-1 bg-red-500 hover:bg-red-600 text-white duration-300`}
              >
               Update
              </Link>
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <div
        onClick={() => setShow(!show)}
        className={`${
          show ? "flex" : "hidden"
        } opacity-60 z-10 md:hidden absolute bg-slate-900 h-full w-full`}
      ></div>
    </div>
  );
};

export default Slider;
