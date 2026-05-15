import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser,HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2"
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { useState } from "react";
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const [drawerOpen,setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrewerOpen] = useState(false);
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

    const toggleNavDrawer = () =>{
        setNavDrewerOpen(!navDrawerOpen);
    }

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

  return (
    <>
        <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4">
            {/* Left Logo */}
            <Link to="/" className="text-2xl font-bold text-orange-500">
            RentEase</Link>
            

            {/* Center-Navigation Links */}
            <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
                <Link to="/collection/all" className="hover:text-red-500">Home</Link>
                <Link to="/collection/all?category=Furniture" className="hover:text-red-500">Furniture</Link>
                <Link to="/collection/all?category=Appliances" className="hover:text-red-500">Home Appliances</Link>
                <Link to="/newArrival" className="hover:text-red-500">New Arrival</Link>
                <Link to="/about" className="hover:text-red-500">About</Link>
                <Link to="/contact" className="hover:text-red-500">Contact</Link>
            </div>
            {/* Right Icons */}
            <div className="flex items-center space-x-4">
                {user && user.role === "admin" && (
                    <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>
                        Admin
                    </Link>
                )}
                
                <Link to="/profile" className='hover:text-black'>
                    <HiOutlineUser className="h-6 w-6 text-gray-700"/>
                </Link>
                <button onClick={toggleCartDrawer} className="relative hover:text-black">
                    <HiOutlineShoppingBag className="h-6 w-6 text-gray-700"/>
                    {cartItemCount > 0 && (
                        <span className='absolute -top-1 bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5'>
                            {cartItemCount}
                        </span>
                    )}
                </button>
                {/* Search Bar */}
                <div className='overflow-hidden'>
                    <SearchBar/>
                </div>
                

                <button onClick={toggleNavDrawer} className="md:hidden">
                    <HiBars3BottomRight className='h-6 w-6 text-gray-700'/>
                </button>
            </div>
        </nav>
        <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>

        {/* Mobile Navigation */}
        <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className='flex justify-end p-4'>
                <button onClick={toggleNavDrawer}>
                    <IoMdClose className='h-6 w-6 text-gray-600'/>
                </button>
            </div>
            <div className='p-4'>
                <h2 className='text-xl font-semibold mb-4'>Menu</h2>
                <nav className='space-y-4'>
                    <Link to="/collection/all" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">Home</Link>
                    <Link to="/collection/all?category=Furniture" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">Furniture</Link>
                    <Link to="/collection/all?category=Appliances" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">Home Appliences</Link>
                    <Link to="/newArrival" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">New Arrival</Link>
                    <Link to="/about" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">About</Link>
                    <Link to="/contact" onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">Contact</Link>
                </nav>
            </div>
        </div>
    </>

  )
};

export default Navbar
