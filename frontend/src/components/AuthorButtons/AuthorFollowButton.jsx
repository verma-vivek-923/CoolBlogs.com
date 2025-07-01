import React from 'react'

const AuthorFollowButton = () => {

  const handleFollow=()=>{
       
  }

  return (
    <div className='ml-4 flex flex-col items-center'>
         <button
         onClick={handleFollow}
         className='bg-blue-800 rounded-[4px]  text-gray-200 px-6 py-1'
         >
            Follow
         </button>

    </div>
  )
}

export default AuthorFollowButton