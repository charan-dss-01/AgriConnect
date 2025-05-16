import React from 'react';
import heroImage from '../assets/hero.webp'; // Adjust the path as necessary

export default function About() {
  return (
    <div className="container mx-auto my-10 px-4">
      {/* Hero Section */}
      <div className="relative">
        <img 
          src={heroImage} 
          alt="Lush Green Fields" 
          className="w-full h-64 object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer" 
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-all duration-300 hover:bg-opacity-50">
          <h1 className="text-4xl text-white font-bold shadow-md transition-colors duration-300 hover:text-green-300 hover:cursor-pointer">About Agri Connect</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-10 text-center space-y-8 border-2 border-green-400 rounded-lg p-6 shadow-lg">
        <h2 className="text-3xl font-semibold text-green-700">Our Mission</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto leading-relaxed text-lg">
          At Agri Connect, we strive to bridge the gap between farmers and consumers. Our mission is to support local farmers by providing them a platform to showcase their products directly to consumers, promoting sustainability and local agriculture.
        </p>

        <h2 className="text-3xl font-semibold text-green-700">What We Do</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto leading-relaxed text-lg">
          We connect farmers with consumers through our innovative platform, ensuring fair prices and access to fresh produce. Our services include:
        </p>

        <ul className="list-disc list-inside mt-4 text-left mx-auto max-w-md text-gray-700">
          <li>🌾 Direct sales from farmers to consumers</li>
          <li>🌱 Support for sustainable agricultural practices</li>
          <li>🤝 Community engagement and education</li>
        </ul>
      </div>

      {/* Card Section */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Card */}
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 group border border-green-300 p-4">
          <h3 className="text-xl font-semibold text-green-700 group-hover:text-green-500">Fresh Produce</h3>
          <p className="text-gray-600">Get the freshest fruits and vegetables directly from local farmers.</p>
          <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300">
            Shop Now
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 group border border-green-300 p-4">
          <h3 className="text-xl font-semibold text-green-700 group-hover:text-green-500">Sustainable Practices</h3>
          <p className="text-gray-600">Learn about our commitment to sustainable agriculture and how you can help.</p>
          <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300">
            Learn More
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 group border border-green-300 p-4">
          <h3 className="text-xl font-semibold text-green-700 group-hover:text-green-500">Community Support</h3>
          <p className="text-gray-600">Join our community and support local farmers in your area.</p>
          <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300">
            Get Involved
          </button>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="mt-10 text-center border-2 border-green-400 rounded-lg p-6 shadow-lg">
        <h2 className="text-3xl font-semibold text-green-700">Join Us</h2>
        <p className="mt-4 text-gray-700 leading-relaxed text-lg">
          Be part of our community and help us promote sustainable agriculture. Together, we can make a difference!
        </p>
        <button className="mt-4 bg-green-600 text-white py-3 px-6 rounded-full hover:bg-green-700 transition-colors duration-300">
          Sign Up Now
        </button>
      </div>
    </div>
  );
}
