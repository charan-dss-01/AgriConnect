import React from 'react';
import { useAuth } from '../context/AuthProvider';

export default function MyProfile() {
  const { profile } = useAuth();
  console.log(profile);
  // Show loading message if profile data is not available yet
  if (!profile) {
    return <div>Loading...</div>;
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 via-white to-orange-100">
      <div className="relative bg-white shadow-2xl rounded-3xl p-8 max-w-lg w-full transition-all duration-500 transform hover:scale-105 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
        {/* Glowing Effect around the card */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-300 via-white to-orange-300 blur-lg opacity-30"></div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6 relative">
          <img
            src={profile?.user?.photo?.url || profile?.photo?.url}
            alt="Profile"
            className="w-40 h-40 rounded-full  border-4 border-green-600 shadow-lg"
          />
        </div>
        
        {/* User Information */}
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-2 tracking-wider">{name}</h1>
        <p className="text-center text-lg text-gray-600 font-semibold mb-6 tracking-wide">
          <span className="text-orange-600 uppercase font-semibold">Role: {profile?.role||profile?.user?.role}</span>
        </p>
        
        <div className="space-y-5 text-lg">
          {/* Email */}
          <div className="flex justify-between items-center text-green-700 font-medium tracking-wide">
            <span className="uppercase">Email:</span>
            <span className="text-gray-900 font-semibold">{profile?.email||profile?.user?.email}</span>
          </div>

          {/* Phone */}
          <div className="flex justify-between items-center text-green-700 font-medium tracking-wide">
            <span className="uppercase">Phone:</span>
            <span className="text-gray-900 font-semibold">{profile?.phone||profile?.user?.phone}</span>
          </div>

          {/* Joined Date */}
          <div className="flex justify-between items-center text-green-700 font-medium tracking-wide">
            <span className="uppercase">Joined:</span>
            <span className="text-gray-900 font-semibold">{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="mt-8 border-t-2 border-dashed border-orange-500"></div>

        {/* Soft Glowing Effect in the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-transparent via-green-100 to-transparent"></div>
      </div>
    </div>
  );
}
