import React, { useEffect, useState } from "react";
import { authorActivity } from "../../context/AuthorActivityProvider";
import { IoCheckmarkCircle, IoCheckmarkDoneSharp } from "react-icons/io5";
import { useAuth } from "../../context/AuthProvider";

const AuthorFollowButton = ({ values: { author } }) => {
  const [isFollowed,setIsFollowed]=useState();
  const {  followAuthor } = authorActivity();
  const {profile}=useAuth();

  const handleFollow = async () => {
    console.log(author?._id);

    const data = await followAuthor(author?._id);

    setIsFollowed(!isFollowed)

  };

useEffect(() => {
  setIsFollowed(author.followedBy?.includes(profile?._id)) 
}, [])



  return (
    <div className="ml-4 flex flex-col items-center">
      <button
        onClick={handleFollow}
        className={`${isFollowed ? "bg-green-900/40 text-green-900 hover:bg-green-900/50" :"bg-blue-800/90 " } active:scale-95 flex items-center gap-1 text-xs  duration-30 rounded-[4px]  text-gray-200 px-2 py-1 lg:px-4`}
      >
        {isFollowed ? (
          <>
            <IoCheckmarkDoneSharp size={20} /> Following
          </>
        ) : (
          "Follow"
        )}
      </button>
    </div>
  );
};

export default AuthorFollowButton;
