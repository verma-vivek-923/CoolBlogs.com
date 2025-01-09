import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Creators() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:4500/user/admins", {
        withCredentials: true,
      });
      console.log(data);
      setAdmins(data);
    };
    fetchData();
  }, []);
  console.log(admins);

  return (
    <div className="min-h-screen mt-0  ">
      <h3 className="text-2xl font-semibold text-center pt-4">All Users</h3>
      <div className=" grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-4 md:mx-auto p-6">
        {admins && admins.length > 0 ? (
          admins.map((element, index) => {
            return (
              <div
                key={element._id}
                className="  rounded-lg  mx-2 overflow-hidden  "
              >
                <Link>
                  <div className=" group relative  border border-slate-300  ">
                    <img
                      src={element.image.url}
                      alt="blog"
                      className="w-full aspect-square p-2 object-cover rounded-full"
                    />
                    <p className="text-sm text-center text-gray-500 capitalize">
                      {element.role}
                    </p>
                    <h1
                      className="text-md truncate text-center bg-slate-300 px-1  py-1 bottom-1 left-3 text-gray-800  overflow-hidden  transition-all duration-300 group-hover:tracking-wider"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {element.name}
                    </h1>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="flex h-44 justify-center items-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-slate-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.28.805 4.373 2.143 6.027l1.857-1.736z"
              ></path>
            </svg>
            <span>Loading....</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Creators;
