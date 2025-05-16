import React, { useEffect, useState } from 'react';
import axios from 'axios';
import farmerImage from '../assets/farmer.webp'; // Replace with your desired farmer image
import { API_BASE_URL } from '../config';

export default function Farmers() {
  const [admins, setAdmin] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/admin`, {
          withCredentials: true,
        });
        console.log(data);
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };

  return (
    <div className="container mx-auto my-10 px-4">
      {/* Hero Section */}
      <div className="relative">
        <img 
          src={farmerImage} 
          alt="Farmers working in the field" 
          className="w-full h-64 object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-all duration-300 hover:bg-opacity-50">
          <h1 className="text-4xl text-white font-bold shadow-md transition-colors duration-300 hover:text-green-300">Meet Our Farmers</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-10 text-center space-y-8 border-2 border-green-400 rounded-lg p-6 shadow-lg">
        <h2 className="text-3xl font-semibold text-green-700">Our Dedicated Farmers</h2>
        <p className="mt-4 text-gray-700 leading-relaxed text-lg">
          We are proud to collaborate with local farmers who are committed to sustainable agriculture. Here are some of our dedicated farmers:
        </p>
      </div>

      {/* Farmers List */}
      <div className="mt-10 flex flex-wrap justify-center">
        {admins.length > 0 ? (
          admins.map((admin) => (
            <div
              key={admin._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-green-300"
            >
              <div className="relative">
                <img
                  src={admin.photo ? admin.photo.url : farmerImage}
                  alt="avatar"
                  className="w-full h-32 object-cover transition-transform duration-300 transform hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                  <img
                    src={admin.photo ? admin.photo.url : farmerImage}
                    alt="avatar"
                    className="w-16 h-16 rounded-full mx-auto border-4 border-gray-700"
                  />
                </div>
              </div>
              <div className="px-4 py-6 mt-4">
                <h2 className="text-center text-xl font-semibold text-gray-800 hover:text-green-500 transition-colors duration-300">
                  {admin.name}
                </h2>
                <p className="text-center text-gray-600 mt-2">{admin.email}</p>
                <p className="text-center text-gray-600 mt-2">{admin.phone}</p>
                <p className="text-center text-gray-600 mt-2">{admin.role}</p>
                <button
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
                  onClick={() => handleViewProfile(admin)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No farmers available at the moment.</p>
        )}
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full mx-4 text-center relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-semibold"
              onClick={handleCloseProfile}
            >
              ✕
            </button>
            <img
              src={selectedProfile.photo ? selectedProfile.photo.url : farmerImage}
              alt="profile"
              className="w-24 h-24 rounded-full mx-auto border-4 border-gray-300 mb-4 shadow-md"
            />
            <h3 className="text-2xl font-bold text-green-700">{selectedProfile.name}</h3>
            <p className="text-gray-600 mt-2 font-medium"><strong>Email:</strong> {selectedProfile.email}</p>
            <p className="text-gray-600 mt-2 font-medium"><strong>Phone:</strong> {selectedProfile.phone}</p>
            <p className="text-gray-600 mt-2 font-medium"><strong>Role:</strong> {selectedProfile.role}</p>
          </div>
        </div>
      )}
    </div>
  );
}
