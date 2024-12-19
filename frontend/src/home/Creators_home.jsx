import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

function Creators_home() {
  const { blogs } = useAuth();
  const [admins, setAdmins] = useState([]);

  console.log(blogs);
  const dev_blogs = blogs?.filter((key) => key.category === "devotional");

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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <div className=" container mx-auto mt-12 ">
      <div className="w-full px-4 py-1 md:px-12 flex justify-between items-center bg-blue-300  rounded-md ">
        <h1 className=" text-2xl font-semibold ">Popular Creators</h1>
        <Link
          to={"/creators"}
          className="text-lg  hover:underline hover:font-bold hover:tracking-wider cursor-pointer duration-300"
        >
          View All
        </Link>
      </div>

      <div>
        {admins && admins.length > 0 ? (
          <Carousel responsive={responsive} className="py-4">
            {admins.slice(0, 10).map((element) => {
              return (
                <div
                  key={element._id}
                  className="  rounded-lg  mx-2 overflow-hidden "
                >
                  <Link >
                    <div className=" group relative ">
                      <img
                        src={element.image.url}
                        alt="blog"
                        className="w-48 h-48 p-5 object-cover rounded-full"
                      />

                      <h1
                        className="text-md  text-center bg-slate-300 px-1  py-1 bottom-1 left-3 text-gray-800  mb-1 overflow-hidden  transition-all duration-300 group-hover:tracking-wider"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {element.name}
                      </h1>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Carousel>
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

export default Creators_home;
