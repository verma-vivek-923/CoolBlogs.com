import React, { use, useState } from "react";
import { PiShareFatDuotone } from "react-icons/pi";
import toast from "react-hot-toast";
import { IoMdPrint } from "react-icons/io";
import {} from "react-to-print";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const ShareButton = ({ values: { url, tittle } }) => {
  const [shareLink, setShareLink] = useState(url);
  const [copied, setCopied] = useState(false);

  const handleNativeShare = async () => {
    document.getElementById("my_modal_2").close();
    try {
      const shareData = await navigator.share({
        url,
        title: tittle,
        text: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopyLink = async () => {
    console.log("link");
    try {
      const link = await navigator.clipboard.writeText(url);
      toast.success("link Copied ");
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("failed to copy link");
    }
  };

  const handlePrint = () => {
    document.getElementById("my_modal_2").close();
    window.print();
  };

  return (
    <div>
      <div
        onClick={() => document.getElementById("my_modal_2").showModal()}
        className="lg:tooltip active:scale-90 flex items-center hover:bg-gray-600/15 p-2 rounded-md"
        data-tip="Share"
      >
        {/* <PiHeartStraightDuotone  /> */}
        <PiShareFatDuotone size={20} />
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal ">
        <div className="modal-box space-y-2 ">
          <h2 className="font-bold text-[#212121] mb-2 text-xl">Share</h2>
          {/* <p className="py-4">{tittle}</p> */}

          {/* <div className="w-full h-[20px] px-4 py-1">
            <input type="text" className="px-4" value={url} />
            <button className="">Copy Link</button>
          </div> */}

          <div className="flex   items-center border border-[#0d0d0d]/70 rounded-md w-full  shadow-inner">
            <input
              type="text"
              disabled={true}
              placeholder="Write Your Task"
              value={shareLink}
              onChange={(e) => setShareLink(e.target.value)}
              className="flex-grow bg-transparent w-full text-[#0d0d0d] text-md outline-none px-2 lg:px-4 py-1   rounded-md "
            />
            <button
              onClick={handleCopyLink}
              className=" px-2 py-1 bg-[#212121] text-sm flex items-center hover:bg-[#0d0d0d] text-gray-200 font-semibold rounded-md shadow-md  scale-105 hover:scale-110 "
            >
              {copied ?"✔️ Copied": "Copy Link"}
            </button>
          </div>

          <div className="py-2 flex flex-col items-center space-y-2  w-full">
            <div
              onClick={handleNativeShare}
              className="w-full border hover:border-2 border-gray-800/40 px-4 py-1 flex hover:bg-gray-600/20 bg-gray-400/20 rounded-md justify-start items-center space-x-2 hover:tracking-widest hover:scale-105 duration-200 "
            >
              <PiShareFatDuotone size={20} />
              <h1 className="text-lg">Share</h1>
            </div>
            <div
              onClick={handlePrint}
              className="w-full border hover:border-2 border-gray-800/40 px-4 py-1 flex hover:bg-gray-600/20 bg-gray-400/20 rounded-md justify-start items-center space-x-2 hover:tracking-widest hover:scale-105 duration-200 "
            >
              <IoMdPrint size={20} />
              <h1 className="text-lg">Print</h1>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop ">
            <button className="btn btn-sm btn-circle btn-gray-800  absolute right-2 top-2">
              ✕
            </button>
            {/* <button>close</button> */}
          </form>
        </div>

        <form method="dialog" className="modal-backdrop ">
          {/* <button className="btn btn-sm btn-circle btn-ghost  absolute right-2 top-2">✕</button> */}
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ShareButton;
