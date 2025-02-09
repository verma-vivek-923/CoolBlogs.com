import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [showBar, setShowBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigateTo = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    console.log(searchText);

    if (searchText) {
      navigateTo(`/blog/search?query=${searchText.trim()}`);
    }
  };

  return (
    <div className="w-full h-max relative max-w-lg  ">
      <form
        onSubmit={handleSearch}
        className="flex border-2 h-10 md:h-8 input w-full  overflow-hidden input-bordered focus-within:outline-none focus-within:border-blue-700 items-center  pr-0 gap-2"
      >
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full h-12 "
          placeholder="Search"
          
        />

        <button
          type="submit"
          className="absolute right-0  bg-blue-700 w-10 text-white h-full rounded-sm rounded-r-lg hover:bg-blue-800 duration-300 flex items-center justify-center"
        >
          <FaMagnifyingGlass size={12} />
        </button>
      </form>
      {/* <button onClick={()=>setShowBar(!showBar)} className="block  md:hidden">
        <HiMiniMagnifyingGlass size={24} />
      </button> */}

      {/* {showBar && (
       <> <div className="absolute  w-full left-0 ">
          <form
            onSubmit={handleSearch}
            className="flex border-2 input overflow-hidden input-bordered focus-within:outline-none focus-within:border-blue-700 items-center h-8 pr-0 gap-2"
          >
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              className=""
              placeholder="Search"
            />

            <button
              type="submit"
              className="absolute right-0  bg-blue-700 w-10 text-white h-full rounded-sm rounded-r-lg hover:bg-blue-800 duration-300 flex items-center justify-center"
            >
              <FaMagnifyingGlass size={12} />
            </button>
          </form>
        </div>
       </>
       
      )} */}
    </div>
  );
};

export default Searchbar;
