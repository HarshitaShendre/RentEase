import React from 'react'
import Furniture from "../../assets/Furniture.jpg";
import HomeAppliences from "../../assets/HomeAppliences.jpg";
import { Link } from 'react-router-dom';

function TypesOfProducts() {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className="container mx-auto text-center mb-10 relative">
            <h2 className="text-3xl font-bold mb-4">Types Of Products</h2>
            <div className='container mx-auto flex flex-col md:flex-row gap-8'>
                {/**Furniture */}
                <div className='relative flex-1'>
                    <img src={Furniture} alt="Furniture" className='w-full h-[700px] object-cover' />
                    <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                            Furniture Collection
                        </h2>
                        <Link to="/collection/all?type=Furniture" 
                        className='text-gray-900 underline'>
                            Shop Now
                        </Link>
                    </div>
                </div>
                {/**Home Appliences */}
                <div className='relative flex-1'>
                    <img src={HomeAppliences} 
                    alt="Hone Appliences" className='w-full h-[700px] object-cover' />
                    <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                            Home Appliences Collection
                        </h2>
                        <Link to="/collection/all?category=Appliances" 
                        className='text-gray-900 underline'>
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TypesOfProducts
