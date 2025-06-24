import React, { useEffect, useRef, useState } from "react";
import { PiMessengerLogoDuotone } from "react-icons/pi";
import { MdOutlineSend } from "react-icons/md";

const CommentButton = () => {
  const [newComment, setNewComment] = useState();
  const [loading, setLoading] = useState(false);
  const [allComments, setAllComments] = useState();
  const [showReply, setShowReply] = useState({});

  const textareaRef = useRef(null);

  useEffect(() => {
    setAllComments(initialComments);
  }, []);

  const users = {
    "673f1361d8b40e1c40ec7c21": "Alice",
    "674705a6cce52dab882d2c77": "Bob",
    "6782b7cc048ecd587b2d2d1d": "Charlie",
  };

  const initialComments = [
    {
      _id: "1",
      comment: "Great post!",
      blogId: "678576edf2d4146953c63cc6",
      commmentedBy: "673f1361d8b40e1c40ec7c21",
      parentId: null,
      replies: [],
    },
    {
      _id: "2",
      comment: "Very informative, thanks.",
      blogId: "678576edf2d4146953c63cc6",
      commmentedBy: "674705a6cce52dab882d2c77",
      parentId: null,
      replies: ["5", "7"],
    },
    {
      _id: "3",
      comment: "I like the way you explained it.",
      blogId: "678576edf2d4146953c63cc6",
      commmentedBy: "6782b7cc048ecd587b2d2d1d",
      parentId: null,
      replies: [],
    },
    {
      _id: "4",
      comment: "Can you elaborate more?",
      blogId: "678576edf2d4146953c63cc6",
      commmentedBy: "673f1361d8b40e1c40ec7c21",
      parentId: null,
      replies: ["6"],
    },
    {
      _id: "5",
      comment: "Nice article!",
      blogId: "678576edf2d4146953c63cc6",
      commmentedBy: "674705a6cce52dab882d2c77",
      parentId: "2",
      replies: [],
    },
    // Replies
    {
      _id: "6",
      comment: "Sure! I’ll update it soon.",
      blogId: "678576edf2d4146953c63cc6",
      commmentedBy: "6782b7cc048ecd587b2d2d1d",
      parentId: "4", // reply to comment 4
      replies: [],
    },
    {
      _id: "7",
      comment: "Agree with you!",
      blogId: "678576edf2d4146953c63cc6",
      commmentedBy: "673f1361d8b40e1c40ec7c21",
      parentId: "2", // reply to comment 2
      replies: [],
    },
  ];

  const getMainComment = (comment) =>
    allComments?.filter((c) => c.parentId === null);


  const getReply = (comment) =>
    allComments?.filter((c) => c.parentId === comment._id);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [newComment]); // Scrolls to bottom on each change

  const handlePost = () => {};
  const handleCancel = () => {};

  const isDisable=(commLen)=>commLen > 0 ? false :true ;

  return (
    <div className="dropdown dropdown-end dropdown-bottom  ">
      <div
        tabIndex={0}
        className="tooltip flex items-center hover:bg-gray-600/15 p-2 rounded-md"
        data-tip="Comment"
      >
        <PiMessengerLogoDuotone size={20} /> &nbsp;{0}
        {/* <span>0</span> */}
      </div>

      <div
        tabIndex={0}
        className="dropdown-content  card border border-gray-400  translate-x-[20%] translate-y-[1%] bg-base-300 rounded-md z-1  shadow-md"
      >
        <div className="px-4 py-4 pb-4 ">
          <div className="w-[85dvw] md:w-[50vw] lg:w-[30vw]  gap-2 border-x-1    flex flex-col justify-between items-center border-gray-900  ">
            <div className="flex  w-full  focus-within:border-2 transition-all duration-100 focus-within:border-blue-800 rounded-sm border border-gray-800 overflow-auto justify-start items-center">
              <textarea
                // type="text"
                ref={textareaRef}
                name={newComment}
                placeholder="Type a Comment"
                value={newComment}
                rows={2}
                onChange={(e) => setNewComment(e.target.value)}
                className="input resize-y h-10  flex-grow  rounded-md  "
              />
            </div>
            {/* <button>
              {!loading ? (
                <MdOutlineSend size={28} />
              ) : (
                <div className="flex justify-center items-center space-x-2">
                  
                  <span>Loging In...</span>
                </div>
              )}
            </button> */}
            <div className="flex w-full space-x-4 pr-4 items-center justify-end">
              <button
                onClick={handleCancel}
                className="px-2 text-sm text-blue-800 border-2 border-blue-800 hover:bg-gray-400 hover:text-gray-800 rounded-[.25rem] duration-300"
              >
                CANCEL
              </button>
              <button
                onClick={handlePost}
                className=" flex items-center px-2 text-sm bg-blue-800 text-base-100 border-2 hover:bg-gray-400 hover:text-gray-800 duration-300 border-blue-800 rounded-[.25rem] space-x-1"
              >
                <span>POST</span> <MdOutlineSend size={14} />
              </button>
            </div>
          </div>

          {/* Comment List */}
          <div className="mt-6 h-[50vh] px-4 space-y-2 py-1 overflow-y-auto rounded bg-gray-100">
            {getMainComment()?.map((comment) => {
                  // console.log(comment);
                  // console.log(users[comment.commmentedBy]);
                  return (
                    <div
                      key={comment._id}
                      className="flex border-l   border-gray-400 px-2 md:px-4 py-1 flex-col "
                    >
                      <div className="flex items-center">
                        <h1 className="text-md font-semibold ">
                          @ {users[comment.commmentedBy]} |{" "}
                        </h1>
                        <h2 className="text-sm">| 1 day ago</h2>
                      </div>
                      <p className="text-sm px-4">{comment.comment}</p>

                      <div className="space-x-2 mt-2 flex items-center justify-end mx-0 md:mx-4">
                        <button 
                        disabled={isDisable(comment.replies.length)  }
                        onClick={()=>{setShowReply( {...showReply,[comment._id]:!showReply[comment._id]} )
                
                      }}
                        className={`${isDisable(comment.replies.length) ? "text-gray-400" :"text-blue-900"} hover:underline duration-300  mr-auto`}>
                         {!showReply[comment._id] ? "View Replies" : "Hide Replies"} (<span>{comment?.replies?.length}</span>)
                        </button>


                        <button className="hover:underline duration-300 text-green-900">
                          Reply
                        </button>


                        <button className="hover:underline duration-300 text-blue-900">
                          Edit
                        </button>

                        <button className="hover:underline duration-300 text-red-900">
                          Delete
                        </button>
                      </div>

                      {/* Replies if available */}

                      {showReply[comment._id] && (
                        <div className="space-y-1 scale-92 transition-all  duration-300">
                          {getReply(comment).map((reply) => (
                            <div
                              key={reply._id}
                              className="flex border-l mx-4   border-gray-400 px-4  flex-col "
                            >
                              <div className="flex items-center">
                                <h1 className="text-md font-semibold ">
                                  @ {users[reply.commmentedBy]} |{" "}
                                </h1>
                                <h2 className="text-sm">| 1 day ago</h2>
                              </div>
                              <p className="text-sm px-4">{reply.comment}</p>

                              <div className="space-x-2 flex items-center justify-end pr-4">
                                <button className="hover:underline duration-300 text-green-900">
                                  Reply
                                </button>
                                <button className="hover:underline duration-300 text-blue-900">
                                  Edit
                                </button>
                                <button className=" hover:underline duration-300 text-red-900">
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
            }
          </div>
        </div>

        {/* <button className="px-4 py-1 text-md bg-base-300 border border-gray-400   duration-300 absolute right-2 -top-7">✕</button> */}
      </div>
    </div>
  );
};

export default CommentButton;
