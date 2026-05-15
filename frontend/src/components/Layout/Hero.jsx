import React from 'react'
import background from "../../assets/background.jpg";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='relative'>
        <img src={background} alt="Background" className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'/>
        <div className='absolute inset-0 bg-opacity-5 flex items-left justify-left'>
            <div className='text-left text-black p-6'>
                <h1 className='text-6xl md:text-4xl font-bold tracking-tighter uppercase mb-4'>
                    <span className='text-orange-500'>Make</span> Your Comfort <br/> Is Our <span className='text-orange-500'>Happiness</span>
                </h1>
                <p className='text-sm tracking-tighter md:text-lg mb-6'>
                    
                </p>
                <Link to="#" className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg'>
                    Shop Now
                </Link>
            </div>
        </div>
    </section>
  )
}

export default Hero
