import React from 'react'
import { useAuth } from '../context/AuthProvider'
import MyProfile from '../dashboard/MyProfile'
import Slider from '../dashboard/slider'

function Dashboard() {
  const {profile,isAuthenticated}=useAuth();
  console.log(profile,isAuthenticated);

  return (
    <div  className='w-full flex min-h-screen'>
      <div >
        <Slider/>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Dashboard
