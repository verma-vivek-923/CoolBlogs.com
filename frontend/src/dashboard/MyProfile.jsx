import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function MyProfile() {
  const { profile } = useAuth();
  // console.log(profile?.user);
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center flex-wrap py-4 gap-5 overflow-hidden">
      <div
        key={profile._id}
        className="m-2 flex flex-col creators-center rounded-lg shadow-lg overflow-hidden group"
      >
        <div className="w-80 h-52 md:w-64 md:h-36 relative flex justify-center">
          <img
            className="w-full h-full bg-black object-cover"
            src={profile?.image?.url || "/default-image.jpg"}
            alt="profile"
          />
          <div className="absolute -bottom-7 w-16 h-16 rounded-full bg-yellow-400 overflow-hidden border-2 group-hover:rounded-md group-hover:-bottom-9 duration-500 ease-in-out">
            <img
              className="bg-red-300 rounded-full border border-yellow-800 w-full h-full group-hover:rounded-md duration-500 ease-in-out"
              src={profile?.image?.url || "/default-avatar.jpg"}
              alt="avatar"
            />
          </div>
        </div>

        <div className="pt-10 text-center ">
          <h1 className="font-bold capitalize">
            {profile?.name || "Anonymous"}
          </h1>
          <p className="font-semibold text-slate-600">
            {profile?.email || "No Email Available"}
          </p>
          <div className="flex justify-around py-2">
            <p className="text-gray-500 text-sm">
              {profile?.mobile || "No Number"}
            </p>
            <p className="text-gray-500 text-sm">
              {profile?.education || "No Education Info"}
            </p>
          </div>
        </div>

        <Link
          to={`/user/update/admin/profile/${profile._id}`}
          className="border-2 rounded-lg py-1 m-2 bg-blue-400 hover:bg-blue-500  duration-300 ease-in-out text-white text-center"
        >
          Update
        </Link>
      </div>
    </div>
    </div>
  );
}

export default MyProfile;
