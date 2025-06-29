import React, { useEffect, useRef, useState } from "react";
import { PiMessengerLogoDuotone } from "react-icons/pi";
import { MdOutlineSend } from "react-icons/md";
import { useActivity } from "../../context/BlogActivityProvider";
import axiosInstance from "../../utilities/axiosInstance";
import { IoCheckmarkCircle, IoCheckmarkDoneSharp } from "react-icons/io5";
import {
  formatDistanceStrict,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import moment from "moment";
import toast from "react-hot-toast";

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

const CommentButton = ({ values: { blogId, userId } }) => {
  const [newComment, setNewComment] = useState();
  const [loading, setLoading] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [showReply, setShowReply] = useState({});
  const [editField, setEditField] = useState({});
  const [editText, setEditText] = useState();
  const [replyBox, setReplyBox] = useState({});
  const [newReply, setNewReply] = useState();
  const [showBox, setShowBox] = useState(false);

  const { fetchAllComment, postComment, editComment, deleteComment } =
    useActivity();

  const textareaRef = useRef(null);

  useEffect(async () => {
    const all_comment = await fetchAllComment(blogId);

    setAllComments(all_comment);
    //  (all_comment);
  }, []);

  const getMainComment = (comment) =>
    allComments?.filter((c) => c.parentId === null);

  const getReply = (comment) =>
    allComments?.filter((c) => c.parentId === comment._id);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [newComment]); // Scrolls to bottom on each change

  const handlePost = async (new_Comment = newComment, parent_id = null) => {
    // e.preventDefault();
    if (!new_Comment) {
      return;
    }

    new_Comment = new_Comment.trim();

    const posted_Comment = await postComment(new_Comment, blogId, parent_id);

    setAllComments([posted_Comment, ...allComments]);
    setNewComment("");
    setNewReply("");
  };

  const handleEdit = async (comment_Id) => {
    const updated_Comment = await editComment(editText, comment_Id, blogId);

    console.log(updated_Comment);
    // console.log(allComments)
    console.log(editField);
    console.log(editField[comment_Id]);

    setAllComments((prev) =>
      prev.map((comment) =>
        comment._id === comment_Id ? updated_Comment : comment
      )
    );

    setEditField({
      [comment_Id]: !editField[comment_Id],
    });

    toast.success("Comment Updated");
  };
  const handleCancel = () => {};

  const handleDelete = async (comment_Id, parent_Id = null) => {
    console.log();
    console.log(allComments);

    const remain_Comment = await deleteComment(comment_Id, parent_Id, blogId);

    setAllComments((prev) =>
      prev
        .filter((comm) => comm._id !== comment_Id)
        .map((comm) => {
          if (comm.replies?.includes(comment_Id)) {
            return {
              ...comm,
              replies: comm.replies.filter((id) => id !== comment_Id),
            };
          }
          return comm;
        })
    );

    console.log(allComments);
  };

  const isChanged = (commentText) => commentText !== editText.trim();

  const isDisable = (commLen) => (commLen > 0 ? false : true);

  return (
    <>
      <div className=" dropdown dropdown-end dropdown-bottom ">
        <div
          onClick={() => setShowBox(!showBox)}
          className={`${
            showBox ? "bg-gray-800/20" : ""
          } active:scale-90 duration-200 tooltip flex items-center hover:bg-gray-600/15 p-2 rounded-md`}
          data-tip="Comment"
        >
          <PiMessengerLogoDuotone size={20} /> &nbsp;{allComments.length}
          {/* <span>0</span> */}
        </div>

        {showBox && (
          <div className="absolute duration-500 right-0 card border border-gray-400  translate-x-[20%] translate-y-[1%] bg-base-300 rounded-md z-20  shadow-md">
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
                    onClick={() => {
                      setShowBox(!showBox);
                      setNewComment("");
                      setNewReply("");
                    }}
                    className="active:scale-95 px-2 text-sm text-blue-800 border-2 border-blue-800 hover:bg-gray-400 hover:text-gray-800 rounded-[.25rem] duration-300"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={() => handlePost()}
                    className="active:scale-95 flex items-center px-2 text-sm bg-blue-800 text-base-100 border-2 hover:bg-gray-400 hover:text-gray-800 duration-300 border-blue-800 rounded-[.25rem] space-x-1"
                  >
                    <span>POST</span> <MdOutlineSend size={14} />
                  </button>
                </div>
              </div>

              {/* Comment List */}
              <div className="mt-6 min-h-0 max-h-[50vh] px-4 space-y-2 py-1 overflow-y-auto rounded bg-gray-100">
                {getMainComment()?.map((comment) => {
                  //  (comment);
                  //  (users[comment.commmentedBy]);
                  return (
                    <div
                      key={comment._id}
                      className="flex border-l   border-gray-400 px-2 md:px-4 py-1 flex-col "
                    >
                      <div className="flex items-center">
                        <h1 className="text-md font-semibold ">
                          @ {comment?.commentedBy?.name} |{" "}
                        </h1>
                        <h2 className="text-sm">
                          | <span> </span>
                          {/* {new Date(comment.createdAt).toLocaleTimeString()} */}
                          {/* {formatDistanceToNowStrict(new Date(comment.createdAt), { addSuffix: true})} */}
                          {moment(comment.createdAt).fromNow()}
                        </h2>
                      </div>

                      {console.log(editField)}
                      {!editField[comment._id] ? (
                        <p className="text-sm px-4">{comment.comment}</p>
                      ) : (
                        <div className="flex transition-all duration-300 w-full space-x-1">
                          <div className="flex flex-grow  rounded focus-within:border-b-2  bg-red-800/10 transition-all duration-100 border-red-800 overflow-auto justify-start items-center">
                            <textarea
                              name="editText"
                              placeholder="Type new Comment"
                              value={editText}
                              onBlur={() =>
                                setTimeout(() => {
                                  setEditField({
                                    [comment._id]: false,
                                  });
                                }, 300)
                              }
                              autoFocus
                              onChange={(e) => {
                                setEditText(e.target.value);
                              }}
                              className="input resize-y h-[30px] bg-transparent focus:outline-none flex-grow  rounded-md  "
                            />
                          </div>

                          <button
                            disabled={!isChanged(comment.comment)}
                            onClick={() => {
                              handleEdit(comment._id);
                            }}
                            className={` ${
                              isChanged(comment.comment)
                                ? "bg-green-900/20 text-green-900 hover:bg-green-900/40"
                                : "bg-gray-400/20 text-gray-400"
                            } active:scale-95  p-1 rounded  cursor-pointer duration-300 `}
                          >
                            <IoCheckmarkDoneSharp size={20} />
                          </button>
                        </div>
                      )}

                      <div className="space-x-2 mt-2 flex items-center justify-end mx-0 md:mx-4">
                        <button
                          disabled={isDisable(comment.replies.length)}
                          onClick={() => {
                            setReplyBox(!comment._id);
                            setShowReply({
                              ...showReply,
                              [comment._id]: !showReply[comment._id],
                            });
                          }}
                          className={`${
                            isDisable(comment.replies.length)
                              ? "text-gray-400"
                              : "text-blue-900"
                          } active:scale-95  hover:underline duration-300  mr-auto`}
                        >
                          {!showReply[comment._id]
                            ? "View Replies"
                            : "Hide Replies"}{" "}
                          (<span>{comment?.replies?.length}</span>)
                        </button>

                        <button
                          onClick={() => {
                            //  (replyBox);
                            setReplyBox({
                              [comment._id]: !replyBox[comment._id],
                            });
                            setShowReply({
                              ...showReply,
                              [comment._id]: true,
                            });
                          }}
                          className="active:scale-95 hover:underline duration-300 text-green-900"
                        >
                          Reply
                        </button>

                        <button
                          onClick={() => {
                            setEditText(comment?.comment);
                            setEditField({
                              [comment._id]: !editField[comment._id],
                            });
                          }}
                          className="hover:underline duration-300 text-blue-900"
                        >
                          {!editField[comment._id] ? "Edit" : "Cancel"}
                        </button>

                        <button
                          onClick={() => handleDelete(comment._id)}
                          className="active:scale-95  hover:underline duration-300 text-red-900"
                        >
                          Delete
                        </button>
                      </div>

                      {/* Replies if available */}

                      {/* reply box */}
                      {showReply[comment._id] && (
                        <div className="space-y-1 scale-90 transition-all  duration-300">
                          {replyBox[comment._id] && (
                            <div className=" w-[90%] ml-auto mb-4 gap-2 border-x-1  flex flex-col justify-between items-center border-gray-900  ">
                              <div className="flex  w-full rounded focus-within:border-2 transition-all duration-100 focus-within:border-blue-800  border border-gray-800 overflow-auto justify-start items-center">
                                <textarea
                                  name={newReply}
                                  placeholder="Type a Comment"
                                  value={newReply}
                                  rows={2}
                                  onChange={(e) => setNewReply(e.target.value)}
                                  className="input resize-y h-7  flex-grow  rounded-md  "
                                />
                              </div>

                              <div className="flex w-full space-x-4 pr-2 items-center justify-end">
                                <button
                                  onClick={() => {
                                    ("first");
                                    // setReplyBox(!comment._id);
                                    setNewReply("");
                                  }}
                                  className="active:scale-95  px-2 text-sm text-blue-800 border-2 border-blue-800 hover:bg-gray-400 hover:text-gray-800 rounded-[.25rem] duration-300"
                                >
                                  CANCEL
                                </button>
                                <button
                                  onClick={() =>
                                    handlePost(newReply, comment._id)
                                  }
                                  className="active:scale-95  flex items-center px-2 text-sm bg-blue-800 text-base-100 border-2 hover:bg-gray-400 hover:text-gray-800 duration-300 border-blue-800 rounded-[.25rem] space-x-1"
                                >
                                  <span>POST</span> <MdOutlineSend size={14} />
                                </button>
                              </div>
                            </div>
                          )}

                          {getReply(comment).map((reply) => (
                            <div
                              key={reply._id}
                              className="flex border-l mx-4   border-gray-400 px-4  flex-col "
                            >
                              <div className="flex items-center">
                                <h1 className="text-md font-semibold ">
                                  @ {reply?.commentedBy?.name} |{" "}
                                </h1>
                                <h2 className="text-sm">| 1 day ago</h2>
                              </div>

                              {/* <p className="text-sm px-4">{reply.comment}</p> */}
                              {!editField[reply._id] ? (
                                <p className="text-sm px-4">{reply.comment}</p>
                              ) : (
                                <div className="flex  w-full space-x-1">
                                  <div className="flex flex-grow  rounded focus-within:border-b-2  bg-red-800/10 transition-all duration-100 border-red-800 overflow-auto justify-start items-center">
                                    <textarea
                                      name="editText"
                                      placeholder="Type new reply"
                                      value={editText}
                                      onBlur={() =>
                                        setTimeout(() => {
                                          setEditField({
                                            [reply._id]: !editField[reply._id],
                                          });
                                        }, 300)
                                      }
                                      autoFocus
                                      onChange={(e) => {
                                        setEditText(e.target.value);
                                      }}
                                      className="input resize-y h-[30px] bg-transparent focus:outline-none flex-grow  rounded-md  "
                                    />
                                  </div>
                                  <button
                                    disabled={!isChanged(reply.comment)}
                                    onClick={() => handleEdit(reply._id)}
                                    className={` ${
                                      isChanged(reply.comment)
                                        ? "bg-green-900/20 text-green-900 hover:bg-green-900/40"
                                        : "bg-gray-400/20 text-gray-400"
                                    } active:scale-95  p-1 rounded  cursor-pointer duration-300 `}
                                  >
                                    <IoCheckmarkDoneSharp size={20} />
                                  </button>
                                </div>
                              )}

                              <div className="space-x-2 flex items-center justify-end pr-4">
                                <button
                                  onClick={() => {
                                    comment;
                                    setEditText(reply?.comment);
                                    setEditField({
                                      [reply._id]: !editField[reply._id],
                                    });
                                    editField;
                                  }}
                                  className="active:scale-95 hover:underline duration-300 text-blue-900"
                                >
                                  {!editField[reply._id] ? "Edit" : "Cancel"}
                                </button>
                                <button
                                  onClick={() =>
                                    handleDelete(reply._id, comment._id)
                                  }
                                  className="active:scale-95  hover:underline duration-300 text-red-900"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <button className="px-4 py-1 text-md bg-base-300 border border-gray-400   duration-300 absolute right-2 -top-7">✕</button> */}
          </div>
        )}

        {showBox && (
          <div
            onClick={() => setShowBox(false)}
            className="fixed top-0 left-0  z-10 w-screen h-screen"
          ></div>
        )}
      </div>
    </>
  );
};

export default CommentButton;
