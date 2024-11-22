import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

function Hero() {

  const { blogs } = useAuth();

  return (
    <>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-6'>
        {blogs && blogs.length > 0 ? (
          blogs.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10).map((element,index) => {
            return (

              <Link to={"/"} key={element._id}
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
          <div className=" flex h-screen items-center justify-center">
            Loading....
          </div>
        )}
      </div>

    </>
  )
}

export default Hero
