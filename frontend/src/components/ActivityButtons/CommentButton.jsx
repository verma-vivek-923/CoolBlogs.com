import React, { useEffect, useRef, useState } from "react";
import {
  PiDotsThreeOutlineVerticalDuotone,
  PiMessengerLogoDuotone,
} from "react-icons/pi";
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
import { useAuth } from "../../context/AuthProvider";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { HiReply } from "react-icons/hi";
import CircleLoad from "../Loadings/CircleLoad";
import { AnimatePresence, motion } from "motion/react";

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
  const [showEditPannel, setShowEditPannel] = useState(false);

  const { profile } = useAuth();

  const { fetchAllComment, postComment, editComment, deleteComment } =
    useActivity();

  const textareaRef = useRef(null);

  useEffect(() => {
    const getAllComment = async () => {
      const all_comment = await fetchAllComment(blogId);

      setAllComments(all_comment);
      //  (all_comment);
    };
    getAllComment();
  }, []);

  const getMainComment = (comment) =>
    allComments?.filter((c) => c?.parentId === null);

  const getReply = (comment) =>
    allComments?.filter((c) => c.parentId === comment._id);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [newComment]); // Scrolls to bottom on each change

  const handlePost = async (new_Comment = newComment, parent_id = null) => {
    // e.preventDefault();
    if (!profile) {
      return toast.error("Please Login To Comment !!");
    }

    setLoading(true);
    if (!new_Comment) {
      return;
    }

    new_Comment = new_Comment.trim();

    const posted_Comment = await postComment(new_Comment, blogId, parent_id);

    setAllComments([posted_Comment, ...allComments]);
    setNewComment("");
    setNewReply("");
    setLoading(false);
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

  const isEdited = (comment) => comment.modifyAt;

  const isAuthor = (comment) => {
    return comment?.commentedBy?._id === profile?._id;
  };

  return (
    <>
      <div className=" dropdown dropdown-end dropdown-bottom ">
        <div className="lg:tooltip " data-tip="Comment">
          <div
            onClick={() => setShowBox(!showBox)}
            className={`${
              showBox ? "bg-gray-800/20" : ""
            } active:scale-90 duration-200 flex items-center hover:bg-gray-600/15 p-2 rounded-md`}
          >
            <PiMessengerLogoDuotone size={20} />
            &nbsp;{allComments?.length}
            {/* <span>{allComments.length}</span> */}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showBox && (
            <motion.div
              initial={{ opacity: 0, scale: 0, x: "20%", y: "1%" }}
              animate={{ opacity: 1, scale: 1, x: "20%", y: "1%" }}
              exit={{ opacity: 0, scale: 0, x: "20%", y: "1%" }}
              style={{ transformOrigin: "calc(100% - 25%) 10px" }}
              transition={{ duration: 0.1 }}
              className="absolute duration-500 right-0    left 0 card border border-gray-400  translate-x-[20%] translate-y-[1%] bg-base-300 rounded-md z-20  shadow-md"
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
                      className={`${
                        profile
                          ? "hover:bg-gray-400 hover:text-gray-800"
                          : "bg-gray-400/40 text-gray-800/40 border-none "
                      } active:scale-95 flex items-center px-2 text-sm bg-blue-800 text-base-100 border-2  duration-300 border-blue-800 rounded-[.25rem] space-x-1"
                `}
                    >
                      {!loading ? (
                        <>
                          <span>POST</span> <MdOutlineSend size={14} />
                        </>
                      ) : (
                        <div>
                          <CircleLoad />
                        </div>
                      )}
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
                            {formatDistanceToNowStrict(new Date(comment.modifyAt ? comment.modifyAt : comment.createdAt), { addSuffix: true})}
                            {/* {formatDistance(new Date(comment.createdAt), { addSuffix: true})} */}
                            {/* {moment(comment.modifyAt ? comment.modifyAt : comment.createdAt).fromNow()} */}
                          </h2>
                          <p
                            className={`${
                              isEdited(comment) ? "" : "hidden"
                            } ml-auto text-gray-500 `}
                          >
                            edited
                          </p>
                        </div>

                        {/* {console.log(isEdited(comment))} */}
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

                          {console.log(isAuthor(comment))}
                          {profile && (
                            <>
                              {/* Reply Button */}
                              <button
                                // disabled={!isAuthor(comment)}
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
                                className={` active:scale-95 flex items-center gap-1 hover:underline duration-300 text-green-900 `}
                              >
                                <HiReply />
                                Reply
                              </button>

                              {console.log(showEditPannel)}
                              <div className=" dropdown ">
                                <div
                                  role="button"
                                  onClick={() => {
                                    setShowEditPannel({
                                      [comment._id]:
                                        !showEditPannel[comment._id],
                                    });
                                    setTimeout(() => {
                                      setShowEditPannel({
                                        [comment._id]: false,
                                      });
                                    }, 3000);
                                  }}
                                  className="p-1 z-50"
                                >
                                  <PiDotsThreeOutlineVerticalDuotone />
                                </div>

                                {showEditPannel[comment._id] && (
                                  <ul className="fixed  right-4 bg-gray-300  z-40 w-max px-1 py-2 rounded-md shadow-sm">
                                    {/* Edit Button  */}

                                    <button
                                      disabled={isAuthor()}
                                      onClick={() => {
                                        setEditText(comment?.comment);
                                        setEditField({
                                          [comment._id]:
                                            !editField[comment._id],
                                        });
                                      }}
                                      className={`${
                                        isAuthor(comment)
                                          ? "text-blue-900"
                                          : "text-gray-400"
                                      } active:scale-95 flex items-center gap-1 px-2 pr-4 py-1 hover:bg-blue-500/30 w-full rounded-md hover:underline duration-300 `}
                                    >
                                      <MdOutlineModeEditOutline />
                                      {!editField[comment._id]
                                        ? "EDIT"
                                        : "CANCEL"}
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                      disabled={isAuthor()}
                                      onClick={() => handleDelete(comment._id)}
                                      className={`${
                                        isAuthor(comment)
                                          ? "text-red-900"
                                          : " text-gray-400"
                                      } active:scale-95 flex items-center gap-1 px-2 pr-4 py-1 hover:bg-red-400/20 w-full rounded-md  hover:underline duration-300 `}
                                    >
                                      <MdDelete />
                                      DELETE
                                    </button>
                                  </ul>
                                )}

                                {/* {showEditPannel && (
                                <div
                                  onClick={() => setShowEditPannel(false)}
                                  className="fixed top-0 left-0 bg-red-800/40  z-10 w-full h-full"
                                ></div>
                              )} */}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Replies if available */}

                        {/* reply box */}
                        {showReply[comment._id] && (
                          <motion.div
                            transition={{ duration: 0.2 }}
                            className="space-y-1 scale-90 transition-all  duration-300"
                          >
                            {replyBox[comment._id] && (
                              <div className=" w-[90%] ml-auto mb-4 gap-2 border-x-1  flex flex-col justify-between items-center border-gray-900  ">
                                <div className="flex  w-full rounded focus-within:border-2 transition-all duration-100 focus-within:border-blue-800  border border-gray-800 overflow-auto justify-start items-center">
                                  <textarea
                                    name={newReply}
                                    placeholder="Type a Reply"
                                    value={newReply}
                                    rows={2}
                                    onChange={(e) =>
                                      setNewReply(e.target.value)
                                    }
                                    className="resize-y h-7 px-2  flex-grow  rounded-md  "
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
                                    <span>POST</span>{" "}
                                    <MdOutlineSend size={14} />
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
                                  <h2 className="text-sm">
                                    {" "}
                                    | {moment(reply.createdAt).fromNow()}
                                  </h2>
                                </div>

                                {/* <p className="text-sm px-4">{reply.comment}</p> */}
                                {!editField[reply._id] ? (
                                  <p className="text-sm px-4">
                                    {reply.comment}
                                  </p>
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
                                              [reply._id]:
                                                !editField[reply._id],
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

                                {profile && (
                                  <div className="space-x-2 flex items-center justify-end pr-4">
                                    <button
                                      disabled={!isAuthor(reply)}
                                      onClick={() => {
                                        comment;
                                        setEditText(reply?.comment);
                                        setEditField({
                                          [reply._id]: !editField[reply._id],
                                        });
                                        editField;
                                      }}
                                      className={`${
                                        isAuthor(reply)
                                          ? "text-blue-900"
                                          : " text-gray-400"
                                      }  active:scale-95 hover:underline duration-300 `}
                                    >
                                      {!editField[reply._id]
                                        ? "Edit"
                                        : "Cancel"}
                                    </button>

                                    <button
                                      onClick={() =>
                                        handleDelete(reply._id, comment._id)
                                      }
                                      className={`${
                                        isAuthor(reply)
                                          ? "text-red-900"
                                          : "text-gray-400"
                                      } active:scale-95  hover:underline duration-300 `}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <button className="px-4 py-1 text-md bg-base-300 border border-gray-400   duration-300 absolute right-2 -top-7">✕</button> */}
            </motion.div>
          )}
        </AnimatePresence>

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
