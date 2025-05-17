import React from 'react';
import { useAuth } from '../context/AuthProvider';

export default function MyProfile({ sidebarOpen }) {
  const { profile } = useAuth();

  // Show loading message if profile data is not available yet
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-orange-500 font-semibold">Loading profile...</div>
      </div>
    );
  }

  // Destructure profile with fallback values to prevent accessing undefined properties
  const {
    name = "N/A",
    email = "N/A",
    phone = "N/A",
    role = "User",
    photo = { url: "/default-profile.png" }, // Use default image if photo is missing
    createdAt = new Date().toISOString(),
  } = profile;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        {/* Profile Picture */}
        <div className="flex justify-center pt-8">
          <div className="">
            <img
              src={profile?.user?.photo?.url || profile?.photo?.url}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-orange-400 shadow-lg object-cover"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="text-center mt-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
          <p className="text-orange-600 font-semibold mt-1">{profile?.role || profile?.user?.role}</p>
        </div>

        {/* Details */}
        <div className="mt-8 space-y-4 px-6 pb-8">
          <div className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-300">
            <div className="flex-1">
              <p className="text-sm text-orange-600 font-medium">Email</p>
              <p className="text-gray-800 font-medium mt-1">{profile?.email || profile?.user?.email}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-300">
            <div className="flex-1">
              <p className="text-sm text-orange-600 font-medium">Phone</p>
              <p className="text-gray-800 font-medium mt-1">{profile?.phone || profile?.user?.phone}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-300">
            <div className="flex-1">
              <p className="text-sm text-orange-600 font-medium">Joined</p>
              <p className="text-gray-800 font-medium mt-1">{new Date(createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
      </div>
    </div>
  );
}
