import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-green-50 text-gray-700 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Column 1: Project Info */}
          <div>
            <h1 className="text-2xl font-bold text-green-700">Agri Connect</h1>
            <p className="mt-4 text-gray-600">
              Connecting farmers with consumers directly. Supporting local farmers and promoting sustainable agriculture.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold text-green-700">Quick Links</h2>
            <a href="/" className="hover:text-green-700">Home</a>
            <a href="/about" className="hover:text-green-700">About Us</a>
            <a href="/services" className="hover:text-green-700">Services</a>
            <a href="/contact" className="hover:text-green-700">Contact</a>
          </div>

          {/* Column 3: Social and Contact */}
          <div>
            <h2 className="text-xl font-semibold text-green-700">Follow Us</h2>
            <div className="flex space-x-4 mt-4 items-center justify-center"> {/* Removed justify-start to center the icons */}
              <a href="https://github.com/charan-dss-01/" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-2xl text-gray-600 hover:text-green-700" />
              </a>
              <a href="https://www.linkedin.com/in/charandonthu" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl text-gray-600 hover:text-green-700" />
              </a>
              <a href="https://www.instagram.com/dss_charan_07/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl text-gray-600 hover:text-green-700" />
              </a>
            </div>
            <h2 className="text-xl font-semibold text-green-700 mt-6">Contact Us</h2>
            <p className="text-gray-600 mt-2">Email: contact@agriconnect.com</p>
            <p className="text-gray-600">Phone: +123-456-7890</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm">
          <p className="text-gray-500">
            © 2024 Agri Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
