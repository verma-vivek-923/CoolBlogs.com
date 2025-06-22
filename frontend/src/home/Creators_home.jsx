import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loading from "../components/loading";
import axios from "axios";

function Creators_home() {
  const { blogs } = useAuth();
  const [admins, setAdmins] = useState([]);

  //console.log(blogs);
  const dev_blogs = blogs?.filter((key) => key.category === "devotional");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/admins`, {
        withCredentials: true,
      });
      //console.log(data);
      setAdmins(data);
    };
    fetchData();
  }, []);
  //console.log(admins);

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
                  <Link>
                    <div className="flex flex-col gap-1 items-center border border-slate-300  justify-center shadow-md rounded-md group relative ">
                      <img
                        src={element.image.url}
                        alt="blog"
                        className="w-32 h-32 object-cover p-2 rounded-full"
                      />
                      <p className="text-sm  text-gray-500 capitalize">
                        {element.role}
                      </p>
                      <h1
                        className="text-md w-full text-center capitalize truncate bg-slate-300 px-1 rounded-sm  py-1 bottom-1 left-3 text-gray-800  overflow-hidden  transition-all duration-300 group-hover:tracking-wider"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {element.name}
                      </h1>
                    </div>
                    {/* <div className=" h-56 flex flex-col items-center justify-center  bg-slate-300 shadow-md rounded-md group relative">
                      <img
                        src={element.image.url}
                        alt="name"
                        className="w-24 h-24 rounded-full mb-4"
                      />
                      <h3 className="text-lg font-semibold transition-all duration-300 group-hover:tracking-wider capitalize">
                        {element.name}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {element.role}
                      </p>
                      <button className="mt-1 px-4 text-sm py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Learn more
                      </button>
                    </div> */}
                  </Link>
                </div>
              );
            })}
          </Carousel>
        ) : (
          // <div className="flex h-44 justify-center items-center space-x-2">
          //   <Loading className="!text-black"/>
          //   <span>Loading....</span>
          // </div>
          <Carousel responsive={responsive} className="py-4  px-2">
            <div className="skeleton h-44 mx-2"></div>
            <div className="skeleton h-44 mx-2"></div>
            <div className="skeleton h-44 mx-2"></div>
            <div className="skeleton h-44 mx-2"></div>
            <div className="skeleton h-44 mx-2"></div>
            <div className="skeleton h-44 mx-2"></div>
            <div className="skeleton h-44 mx-2"></div>
          </Carousel>
        )}
      </div>
    </div>
  );
}

export default Creators_home;
