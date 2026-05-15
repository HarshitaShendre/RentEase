import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h1>

        {/* Intro Section */}
        <p className="text-center text-gray-600 text-lg mb-10">
          Welcome to <span className="font-semibold text-blue-600">RentEase</span> —
          your one-stop platform for renting furniture and appliances with ease and affordability.
        </p>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
              alt="Furniture"
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-4">
              RentEase is designed to simplify your lifestyle by providing
              high-quality furniture and appliances on rent. Whether you're
              a student, working professional, or relocating, we make it
              easy to access what you need without heavy upfront costs.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              Our mission is to provide flexible, affordable, and sustainable
              rental solutions that improve your everyday living experience.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Affordable rental plans</li>
              <li>Wide range of furniture & appliances</li>
              <li>Easy booking and fast delivery</li>
              <li>Quality assurance & maintenance support</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Our Team
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Member 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Harshita
              </h3>
              <p className="text-gray-500">Frontend Developer</p>
            </div>

            {/* Member 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                John Doe
              </h3>
              <p className="text-gray-500">Backend Developer</p>
            </div>

            {/* Member 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Jane Smith
              </h3>
              <p className="text-gray-500">UI/UX Designer</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;