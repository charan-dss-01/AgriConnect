import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    
    const userInfo = {
      access_key: "6b9f20d0-e0d4-4176-b857-435f09b69437",
      name: data.username,
      email: data.email,
      message: data.message,
    };
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="bg-white flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-green-600">Contact Us</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-4">
            <h3 className="text-lg font-medium text-green-600 mb-4">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-sm text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <span className="text-sm text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="w-full flex flex-col items-center md:w-1/2 md:pl-4">
            <h3 className="text-lg font-medium text-green-600 mb-7">
              Contact Information
            </h3>
            <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                  <FaPhone className="text-red-500" />
                  <span>+91 9849490777</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaEnvelope className="text-pink-500" />
                  <span>agriconnect8899@gmail.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-green-500" />
                  <span>Hyderabad,India</span>
                </li>
              </ul>
              <Link to="/chatbot">
              <button className="mt-14 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Chat with our Bot
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
