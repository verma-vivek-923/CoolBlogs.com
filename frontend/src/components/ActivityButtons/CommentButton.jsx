import React, { useEffect, useRef, useState } from "react";
import { PiMessengerLogoDuotone } from "react-icons/pi";
import { MdOutlineSend } from "react-icons/md";

const CommentButton = () => {
  const [newComment, setNewComment] = useState();
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [newComment]); // Scrolls to bottom on each change

  const handlePost = () => {};
  const handleCancel = () => {};

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
        className="dropdown-content  card border border-gray-400  translate-x-[20%] translate-y-[4%] bg-base-300 rounded-md z-1  shadow-md"
      >
        <div className="px-4 py-2 pb-4 ">
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
              <button onClick={handleCancel} className="px-2 text-sm text-blue-800 border-2 border-blue-800 hover:bg-gray-400 hover:text-gray-800 rounded-[.25rem] duration-300">
                CANCEL
              </button>
              <button onClick={handlePost} className=" flex items-center px-2 text-sm bg-blue-800 text-base-100 border-2 hover:bg-gray-400 hover:text-gray-800 duration-300 border-blue-800 rounded-[.25rem] space-x-1">
                <span>POST</span> <MdOutlineSend size={14} />
              </button>
            </div>
          </div>

          {/* Comment List */}
          <div>
              
          </div>
        </div>
      
      {/* <button className="px-2 py-1  rounded-full hover:bg-gray-800/20 duration-300 absolute right-0 top-0">✕</button> */}
   
      </div>

    </div>
  );
};

export default CommentButton;
