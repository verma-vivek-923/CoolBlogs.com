import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { IoMenuOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";

function Navbar() {
  const [show,setShow]=useState(false);

  const {blogs}=useAuth();
  // console.log(blogs)

  return (
    <><nav className='sticky top-0 left-0  bg-inherit shadow-xl px-4 py-2 border z-50'>
    <div className="flex justify-between items-center container mx-auto ">
      <div className='font-semibold pl-2 text-xl'>
        Cool<span className='text-blue-600'>Blogs</span>
      </div>
      {/* Desktop */}
      <div >
        <ul className='hidden md:flex space-x-4'>
        <Link className='hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded' to="/">HOME</Link>
        <Link className='hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded' to="/blogs">BLOGS</Link>
        <Link className='hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded' to="/creators">CREATORS</Link>
        <Link className='hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded' to="/about">ABOUT</Link>
        <Link className='hover:text-blue-600 hover:tracking-wider hover:font-semibold transition-all duration-300 px-2 py-1 text-1.5xl md:text-base rounded' to="/contact">CONTACT US</Link>
        </ul>
        <div className='block md:hidden' onClick={()=>setShow(!show)}>{show?<IoIosCloseCircleOutline size={24}/>:<IoMenuOutline size={24}/>}</div>
      </div>
      <div className='hidden md:flex space-x-2'>
        <Link to="/dashboard" className='bg-blue-600 text-sm text-white font-semibold hover:bg-blue-800 duration-300 px-2 py-1 rounded'>DASHBOARD</Link>
        <Link to="/login" className='bg-red-600 text-sm text-white font-semibold hover:bg-red-800 duration-300 px-2 py-1 rounded'>LOGIN</Link>
      </div>
    </div>
    {/* Mobile */}
    {show && (
      <div className='absolute shadow-lg  w-full left-0'>
        <ul className=' flex flex-col px-4 pb-4 bg-slate-200 justify-center items-right md:hidden mt-2 text-xl'>
        <Link onClick={()=>setShow(!show)} smooth="true" className='hover:text-blue-600  duration-150 hover:font-bold  px-2 py-1 text-base md:text-sm  rounded'
                to="/">HOME</Link>
        <Link onClick={()=>setShow(!show)} smooth="true" className='hover:text-blue-600  duration-150 hover:font-bold  px-2 py-1 text-base md:text-sm  rounded'
                to="/blogs">BLOGS</Link>
        <Link onClick={()=>setShow(!show)} smooth="true" className='hover:text-blue-600  duration-150 hover:font-bold  px-2 py-1 text-base md:text-sm  rounded'
           to="/creators">CREATORS</Link>
        <Link onClick={()=>setShow(!show)} smooth="true" className='hover:text-blue-600  duration-150 hover:font-bold  px-2 py-1 text-base md:text-sm  rounded'
                to="/about">ABOUT</Link>
        <Link onClick={()=>setShow(!show)} smooth="true" className='hover:text-blue-600  duration-150 hover:font-bold  px-2 py-1 text-base md:text-sm  rounded'
                to="/contact">CONTACT US</Link>
        </ul>
      </div>
    )}


    </nav>
    </>
  )
}

export default Navbar;
