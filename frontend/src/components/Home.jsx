import React from 'react'
import Creators_home from '../home/Creators_home'
import Devotional from '../home/Devotional'
import Hero from '../home/Hero'
import Trending from '../home/Trending'
import { Toast } from 'react-hot-toast'

function Home() {
  return (
    <div className=' px-4 py-2 border' >
      <Hero/>
     <Trending/>
     <Devotional/>
     <Creators_home/>
    </div>
  )
}

export default Home;
