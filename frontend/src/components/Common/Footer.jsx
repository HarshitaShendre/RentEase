import React from 'react'
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">RentEase</h2>
          <p className="mt-4 text-gray-500">
            
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-gray-300">
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <RiTwitterXLine className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Service */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Service</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-gray-300">Product</a></li>
            <li><a href="#" className="hover:text-gray-300">Help & Support</a></li>
            <li><a href="#" className="hover:text-gray-300">Pricing</a></li>
            <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Product</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-gray-300">Sofa</a></li>
            <li><a href="#" className="hover:text-gray-300">Chair</a></li>
            <li><a href="#" className="hover:text-gray-300">Living Room</a></li>
            <li><a href="#" className="hover:text-gray-300">Office</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Contact</h3>
          <div className="flex items-center space-x-2 mb-6">
            <FiPhoneCall className="text-gray-500" />
            <p className="text-gray-600">1234567890</p>
          </div>
          <p className="text-gray-500">Pune, Maharashtra, India</p>
          <p className="text-gray-500">rentease@gmail.com</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          &#169; RentEase All rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
