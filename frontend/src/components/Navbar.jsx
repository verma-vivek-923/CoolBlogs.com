import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { ImBlogger } from "react-icons/im";
import { TbLogin2 , TbLogout } from "react-icons/tb";
import { FaUsersLine ,FaPhoneVolume ,FaRegCircleUser } from "react-icons/fa6";
import { IoMdInformationCircle ,IoIosCloseCircleOutline } from "react-icons/io";
import { IoHome, IoCreateOutline,IoMenuOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import axios from "axios";
import { set } from "mongoose";

function Navbar() {
  const { profile ,setIsAuthenticated } = useAuth();
  const token = Cookies.get("jwt");
  const [show, setShow] = useState(false);


  const handleLogout = async (e) => {
    e.preventDefault();
    setShow(!show);

    try {
      const { data } = await axios.get("http://localhost:4500/user/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(data)
      setIsAuthenticated(false);
      setTimeout(() => {
        
        window.location.pathname = "/";
      }, 2000);
      toast.success("Logout Succesfully");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };


  return (
    <>
      <nav className="sticky top-0 left-0  bg-inherit shadow-xl px-4 py-1 border z-50">
        <div className="flex justify-between items-center container mx-auto ">
          <div className="font-semibold pl-2 text-xl">
            Cool<span className="text-blue-600">Blogs</span>
          </div>
          {/* Desktop */}
          <div>
            <ul className="hidden md:flex space-x-4">
              <Link
                className=" hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded"
                to="/"
              >
                HOME
              </Link>
              <Link
                className=" hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded"
                to="/blogs"
              >
                BLOGS
              </Link>
              <Link
                className=" hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded"
                to="/creators"
              >
                CREATORS
              </Link>
              <Link
                className=" hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded"
                to="/about"
              >
                ABOUT
              </Link>
              <Link
                className=" hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded"
                to="/contact"
              >
                CONTACT US
              </Link>
            </ul>
            {/* <div className="md:hidden flex space-x-2">
              <Link
                onClick={() => (window.location.pathname = "/dashboard")}
                className={`${
                  token ? "block" : "hidden"
                } bg-blue-600 h-9 w-9 text-sm text-white font-semibold hover:bg-blue-800 duration-300  rounded-full`}
              >
                <img
                  src={profile?.image?.url}
                  alt={"#"}
                  className="w-full h-full object-cover"
                />
              </Link>
              <Link
                to="/login"
                className={`${
                  token ? "hidden" : "block"
                } text-base text-gray-900 tracking-wider md:border border-gray-900  hover:text-white hover:bg-red-800 duration-300 px-2 py-1 rounded`}
              >
                LogIn
              </Link>
              <div
                className={` block md:hidden`}
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <IoIosCloseCircleOutline size={32} />
                ) : (
                  <IoMenuOutline size={32} />
                )}
              </div>
            </div> */}
          </div>
          <div className="flex  items-center space-x-2">
            <Link
              to="/dashboard"
              className={`${
                token ? "block" : "hidden"
              } overflow-hidden bg-blue-600 h-9 w-9 text-sm text-white font-semibold hover:bg-blue-800 duration-300 rounded-full`}
            >
              
              <img src={profile?.image?.url} alt={"#"} />
            </Link>
            <Link
              to="/login"
              className={`${
                token ? "hidden" : "block"
              } text-base text-gray-900 tracking-wider md:border border-gray-900 md:font-semibold hover:text-white hover:bg-red-800 duration-300 px-2  rounded`}
            >
              LogIn
            </Link>
            <div
                className={` block md:hidden`}
                onClick={() => setShow(!show)}
              >
                {show ? (
                  <IoIosCloseCircleOutline size={32} />
                ) : (
                  <IoMenuOutline size={32} />
                )}
              </div>
          </div>
        </div>
        {/* Mobile */}
        {show && (
          <div className="absolute shadow-lg  w-full left-0">
            <ul className=" flex flex-col px-4 pb-4 bg-slate-200 justify-center items-right md:hidden mt-2 text-xl">
              <Link
                onClick={() => setShow(!show)}
                smooth="true"
                className="hover:text-blue-600 flex  items-center gap-1 duration-150 hover:font-bold  px-2 py- text-base md:text-sm  rounded"
                to="/"
              >
               <IoHome size={13} /> <span>HOME</span>
              </Link>
              <Link
                onClick={() => setShow(!show)}
                smooth="true"
                className="hover:text-blue-600 flex justify-start items-center gap-1 duration-150 hover:font-bold  px-2 py- text-base md:text-sm  rounded"
                to="/blogs"
              >
               <ImBlogger size={12} /> <span> BLOGS</span>
              </Link>
              <Link
                onClick={() => setShow(!show)}
                smooth="true"
                className="hover:text-blue-600 flex items-center  gap-1 duration-150 hover:font-bold  px-2 py- text-base md:text-sm  rounded"
                to="/creators"
              >
              <FaUsersLine size={14}/><span>CREATORS</span>  
              </Link>
              <Link
                onClick={() => setShow(!show)}
                smooth="true"
                className="hover:text-blue-600 flex items-center gap-1 duration-150 hover:font-bold  px-2 py- text-base md:text-sm  rounded"
                to="/about"
              >
               <IoMdInformationCircle size={14} /><span>ABOUT</span> 
              </Link>
              <Link
                onClick={() => setShow(!show)}
                smooth="true"
                className="hover:text-blue-600 flex items-center gap-1 duration-150 hover:font-bold  px-2 py- text-base md:text-sm  rounded"
                to="/contact"
              >
               <FaPhoneVolume size={13}/><span>CONTACT US</span> 
              </Link>
              <Link
                onClick={() => setShow(!show)}
                smooth="true"
                className={`${token?"hidden":"flex"} items-center  gap-1 hover:text-blue-600 text-green-800  duration-150 hover:font-bold  px-2 text-base md:text-sm  rounded`}
                to="/login"
              >
              <FaRegCircleUser size={14}/> <span>Log In</span> 
              </Link>
              <Link
                onClick={() => setShow(!show)}
                smooth="true"
                className={`${token?"hidden":"flex"}  items-center  gap-1 hover:text-blue-600  text-green-800 duration-150 hover:font-bold  px-2 py- text-base md:text-sm  rounded`}
                to="/register"
              >
              <FaRegCircleUser size={14}/><span>Sign Up</span>  
              </Link>
              <Link
                onClick={handleLogout}
                smooth="true"
                className={`${!token?"hidden":"flex"} hover:text-blue-600 items-center gap-1 text-red-800 duration-150 hover:font-bold  px-2 py- text-base md:text-sm  rounded`}
                
              >
               <TbLogout size={14} /><span>Log Out</span> 
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
