import React, { useEffect, useState } from "react";
import { useActivity } from "../../context/BlogActivityProvider";
import { PiHeartStraightDuotone } from "react-icons/pi";
import toast from "react-hot-toast";

const LikeButton = ({ values: { user, blog } }) => {
  const [likes, setLikes] = useState(blog?.likes);
  const [isLiked, setIsLiked] = useState();

  const { likeBlog } = useActivity();

  console.log(blog);
  console.log(user);

  // Handle like Click
  const handleLike = async () => {
    if (!user) {
       toast.error("Login First to Like");
    }

    const data = await likeBlog(blog?._id, user?._id);

    if (data) {
      console.log(data);
      setLikes(data?.likes);
      setIsLiked(!isLiked);
    }
  };

  useEffect(() => {
    if (blog?.likedBy?.includes(user?._id)) {
      setIsLiked(true);
      // console.log("true");
    } else {
      setIsLiked(false);
      // console.log("false");
    }
  }, [user, blog]);

  return (
    <div className="lg:tooltip" data-tip="Like">
      <div
        onClick={handleLike}
        className=" flex flex-row active:scale-95 items-center hover:bg-gray-600/15 p-2 rounded-md"
       
      >
        <PiHeartStraightDuotone
          className={`${isLiked ? "text-red-800" : ""}`}
          size={20}
        />{" "}
        &nbsp;{likes}

        {/* <span>0</span> */}
      </div>
    </div>
  );
};

export default LikeButton;
