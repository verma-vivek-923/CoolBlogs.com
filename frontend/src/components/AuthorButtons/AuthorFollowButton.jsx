import React, { useEffect, useState } from "react";
import { authorActivity } from "../../context/AuthorActivityProvider";
import { IoCheckmarkCircle, IoCheckmarkDoneSharp } from "react-icons/io5";
import { useAuth } from "../../context/AuthProvider";
import CircleLoad from "../Loadings/CircleLoad";

const AuthorFollowButton = ({ values: { author } }) => {
  const [isFollowed, setIsFollowed] = useState();
  const { followAuthor } = authorActivity();
  const [loading, setLoading] = useState(false);

  const { profile } = useAuth();

  const handleFollow = async () => {
    try {
      setLoading(true);

      const data = await followAuthor(author?._id);

      setIsFollowed(!isFollowed);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsFollowed(author.followedBy?.includes(profile?._id));
  }, []);

  return (
    <div className="ml-auto flex flex-col items-center">
      <button
        onClick={handleFollow}
        className={`${
          isFollowed
            ? "bg-green-900/40 text-green-900 hover:bg-green-900/50 px-2 py-1"
            : "bg-blue-800/90 px-4"
        } active:scale-95 flex items-center gap-1 text-sm lg:text-base  duration-30 rounded-[4px]  text-gray-200  py-1 lg:px-4`}
      >
        {!loading ? (
          <>
            {isFollowed ? (
              <>
                <IoCheckmarkDoneSharp size={20} /> Following
              </>
            ) : (
              "Follow"
            )}
          </>
        ) : (
          <div className="flex items-center justify-center space-x-2 ">
            <CircleLoad />
            <span>Wait...</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AuthorFollowButton;
