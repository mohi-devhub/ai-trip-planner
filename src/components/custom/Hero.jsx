import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1
        className='font-extrabold text-[50px] text-center mt-16'
        >
            <span className='text-[#f56551]'>Discover Your Next Adventure</span><br></br>Powered by AI.</h1>
        <p className='text-xl text-gray-500 text-center'>Discover the easiest way to plan your dream getaway. Our AI-powered trip planner takes the hassle out of travel by creating personalized itineraries tailored to your preferences, budget, and schedule.</p>

        <Link to={'/create-trip'}>
        <Button className='cursor-pointer'>Get Started</Button>
        </Link>
    </div>
  )
}

export default Hero