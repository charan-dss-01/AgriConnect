import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

export default function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(`${API_BASE_URL}/api/users/admin`, {
        withCredentials: true,
      });
      console.log(data);
      setAdmin(data);
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto my-10 p-6">
      {/* Heading aligned to the left with a special orange color */}
      <h1 className="text-4xl font-bold mb-6 text-left text-orange-500 border-l-4 border-orange-500 pl-4 hover:animate-pulse">
        Meet Our Farmers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Loop through admin data and display each creator */}
        {admin && admin.length > 0 ? (
          admin.map((creator) => (
            <div
              key={creator._id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-transform duration-300 group"
            >
              {/* Display creator's photo */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={creator.photo?.url || "default-avatar.jpg"} // Fallback for the photo
                  alt={creator.name}
                  className="w-24 h-24 rounded-full border-4 border-yellow-400 transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-full"></div>
              </div>
              
              {/* Display creator's name */}
              <h2 className="text-xl font-semibold text-center group-hover:text-yellow-500 transition-colors duration-300">
                {creator.name}
              </h2>

              {/* Display role as "farmer" */}
              <p className="text-center text-gray-600">Farmer</p>
              
              {/* Add a subtle line at the bottom */}
              <div className="mt-4 border-t-2 border-yellow-400 w-16 mx-auto opacity-75"></div>
            </div>
          ))
        ) : (
          <div className="text-center">No Farmers available</div>
        )}
      </div>
    </div>
  );
}
