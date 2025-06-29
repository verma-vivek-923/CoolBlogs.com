import React, { useState } from "react";
import { PiShareFatDuotone } from "react-icons/pi";

const ShareButton = ({ values: { url, tittle } }) => {

 const [task, setTask] = useState("");

  const handleNativeShare = async () => {
    try {
      const shareData = await navigator.share({
        url,
        title: tittle,
        text: "A Blog that can sharre",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare=()=>{

  }

  return (
    <div>
      <div
        onClick={() => document.getElementById("my_modal_2").showModal()}
        className="tooltip active:scale-90 flex items-center hover:bg-gray-600/15 p-2 rounded-md"
        data-tip="Share"
      >
        {/* <PiHeartStraightDuotone  /> */}
        <PiShareFatDuotone size={20} />
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-[#121212]">
          <h3 className="font-bold text-lg">Share</h3>
          {/* <p className="py-4">{tittle}</p> */}

          {/* <div className="w-full h-[20px] px-4 py-1">
            <input type="text" className="px-4" value={url} />
            <button className="">Copy Link</button>
          </div> */}

          <div className="flex  items-center border border-gray-600 rounded-full w-full max-w-2xl mx-auto shadow-inner">
            <input
              type="text"
              placeholder="Write Your Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="flex-grow bg-transparent outline-none px-4 py-2   rounded-full "
            />
            <button
              onClick={handleShare}
              className="ml-2 px-6 py-2 bg-[#00ffcc] text-black font-semibold rounded-full shadow-md hover:scale-105 transition-transform"
            >
              Copy Link
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ShareButton;
