import React from "react";
import { PiMessengerLogoDuotone } from "react-icons/pi";

const CommentButton = () => {
  return (
    <div>
      <div
        className="tooltip flex items-center hover:bg-gray-600/15 p-2 rounded-md"
        data-tip="Comment"
      >
        <PiMessengerLogoDuotone size={20} /> &nbsp;{0}
        {/* <span>0</span> */}
      </div>
    </div>
  );
};

export default CommentButton;
