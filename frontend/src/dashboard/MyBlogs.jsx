import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const getMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blog/my-blogs`,
          {
            withCredentials: true,
          }
        );
        // //console.log(data);
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/blog/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Blog Deleted");
      setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      // setMyBlogs(myBlogs.filter((blog) => blog.id !== id));
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="min-h-screen mt-0  ">
      <h3 className="text-2xl font-semibold text-center pt-4">My Blog</h3>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:ml-60 p-6">
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs.map((element, index) => {
            return (
              <Link
                //to={"/"}
                key={element._id}
                className={`bg-slate-300 z-1 flex flex-col group border-2  rounded-lg shadow-lg hover:shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-200
                    ${index >= 4 ? "hidden md:flex" : ""}
                `}
              >
                <div className=" relative ">
                  <img
                    src={element.blogImage.url}
                    alt="img"
                    className="w-full  h-40 object-cover"
                  />
                  <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300 "></div>
                  <h1 className="absolute bottom-1 left-3 text-white text-sm md:lext-base lg:text-xl  group-hover:text-yellow-300 transition-all duration-300 group-hover:tracking-wider">
                    {element.tittle}
                  </h1>
                </div>
                <div className="flex justify-end items-center space-x-1 text-xs py-0.5 px-1">
                  <Link
                    to={`/blog/update/${element._id}`}
                    className="border-2 rounded-md px-3 py-1  bg-blue-500 hover:bg-blue-600 text-white duration-300"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                    className="border-2 rounded-md px-3 py-1  bg-red-500 hover:bg-red-600 text-white duration-300"
                  >
                    Delete
                  </button>
                </div>

                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_1").close()
                        }
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      >
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-base md:text-lg  text-gray-800">
                      Delete Blog
                    </h3>
                    <p className="py-4 text-gray-600 text-sm md:text-base">
                      Are you sure you want to delete this blog? This action
                      cannot be undone.
                    </p>
                    <div className="modal-action">
                      <form
                        method="dialog"
                        className="flex justify-end space-x-4"
                      >
                        {/* <button onClick={()=> handleDelete(element._id)} className="px-2 py-1 bg-red-400">Yes</button> */}
                        <button
                          onClick={() =>
                            document.getElementById("my_modal_1").close()
                          }
                          className="px-4 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => handleDelete(element._id)}
                          className="px-4 py-1 bg-red-700 text-white rounded-lg hover:bg-red-900 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </Link>
            );
          })
        ) : myBlogs.length <= 0 ? (
          <div className="col-span-full">
            <h1 className="text-lg">
              It Seems like You Havent Posted any blog Yet
            </h1>
          </div>
        ) : (
          <div className=" flex h-screen w-full absolute left-0 top-0 items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
