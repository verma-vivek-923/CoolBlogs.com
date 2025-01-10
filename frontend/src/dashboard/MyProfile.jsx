import React from "react";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();
  // console.log(profile);
  return (
    <div className="min-h-screen flex flex-col mt-0  ">
       <h3 className="text-2xl font-semibold text-center pt-4">My Profile</h3>
      {profile ?(   
      <div className="w-full flex-grow  flex justify-center items-start md:items-center flex-wrap py-4 gap-5 overflow-hidden">
        <div
          key={profile._id}
          className="m-2  flex flex-col creators-center rounded-lg shadow-lg overflow-hidden group"
        >
          <div className="w-80 h-24 md:w-96 md:h-24 relative flex justify-center">
            <img
              className="w-full h-full bg-black object-cover"
              src={profile?.image?.url || "/default-image.jpg"}
              alt="profile"
            />
            <div className="absolute -bottom-9 w-16 h-16 rounded-full bg-yellow-400 overflow-hidden border-2  duration-500 ease-in-out">
              <img
                className="bg-red-300 rounded-full border border-yellow-800 w-full h-full  duration-500 ease-in-out"
                src={profile?.image?.url || "/default-avatar.jpg"}
                alt="avatar"
              />
            </div>
            <Link
                to={`/user/update/${profile._id}`}
                className={` absolute right-5 -bottom-12 border-2 flex items-center text-sm gap-2 rounded-md px-2 py-1 bg-red-500 hover:bg-red-600 text-white duration-300`}
              >
              <CiEdit  size={16}/>  Edit
              </Link>
          </div>

          <div className="pt-10 ml-6 ">
            <label >Name :</label>
            <h1 className="font-semibold mb-3 text-slate-600 capitalize">
              {profile?.name }
            </h1>
            <label >Email :</label>
            <p className="font-semibold mb-3 text-slate-600">
              {profile?.email }
            </p>
            <div className="flex flex-col py-2">
            <label >Contact No. :</label>
              <p className="text-slate-600 mb-3 font-semibold text-base">
                {profile?.phone }
              </p>
              <label >Education :</label>
              <p className="text-slate-600 mb-3 font-semibold text-base uppercase">
                {profile?.education }
              </p>
            </div>
          </div>

          {/* <Link
            to={`/user/update/admin/profile/${profile._id}`}
            className="border-2 rounded-lg py-1 m-2 bg-blue-400 hover:bg-blue-500  duration-300 ease-in-out text-white text-center"
          >
            Update
          </Link> */}
        </div>
      </div>
      ):(
        <div className=" flex h-screen w-full absolute left-0 top-0 items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
      )}
    </div>
  );
}

export default MyProfile;
