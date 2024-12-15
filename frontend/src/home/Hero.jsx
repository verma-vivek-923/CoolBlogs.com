import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

function Hero() {
  
  const { blogs } = useAuth();
  console.log(blogs)

  return (
    <>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-6'>
        {blogs && blogs.length > 0 ? (
          blogs.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10).map((element,index) => {
            return (

              <Link to={`/blog/${element._id}`} key={element._id}
                className={`bg-slate-300 flex flex-col group border-2  rounded-lg shadow-lg hover:shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-200
                    ${index >=4 ? 'hidden md:flex':""}
                `}>
                <div className=' relative '>
                  <img src={element.blogImage.url} alt="img"
                    className='w-full  h-40 object-cover'
                  />
                  <div className='absolute w-full h-full inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300 '></div>
                  <h1 className='absolute bottom-1 left-3 text-white text-xl  group-hover:text-yellow-300 transition-all duration-300 group-hover:tracking-wider'>{element.tittle}</h1>
                </div>
                <div className='flex px-4 py-2 items-center space-x-2 '>
                  <div className=''>
                    <img className='w-8 h-8 rounded-full object-cover border-2 border-yellow-400 ' src={element.adminPhoto} alt="user" />
                  </div>
                  <p className='text-md font-semibold text-gray-800  '>{element.adminName}</p>
                </div>
              </Link>

            )
          })
        ) : (
          // <div className=" flex w-full h-44 items-center justify-center">
          //   <h1>Loading....</h1>
          // </div>
          <div className="flex h-44 col-span-full justify-center items-center space-x-2">
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
          <span>Loading...</span>
        </div>
        )}
      </div>

    </>
  )
}

export default Hero
