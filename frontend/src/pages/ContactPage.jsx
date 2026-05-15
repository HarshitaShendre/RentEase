import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // You can connect backend API here
    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Have questions or need help? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Get in Touch
            </h2>

            <p className="text-gray-600 mb-4">
              Feel free to reach out to us through any of the following ways:
            </p>

            <div className="space-y-4 text-gray-700">
              <p><strong>📍 Address:</strong> Pune, Maharashtra, India</p>
              <p><strong>📞 Phone:</strong> +91 98765 43210</p>
              <p><strong>📧 Email:</strong> support@rentease.com</p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                Working Hours
              </h3>
              <p className="text-gray-600">Mon - Sat: 9 AM - 7 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your email"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;