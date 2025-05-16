import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../assets/download.webp';
import { useAuth } from '../context/AuthProvider'; // Import the AuthProvider for authentication
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config';
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { profile, isAuthenticated, setIsAuthenticated } = useAuth(); // Get auth details
    console.log(profile);
    
    const navigateTo = useNavigate(); // Use navigate for redirecting after logout

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            // Ensure the URL points to your actual backend server
            const { data } = await axios.get(`${API_BASE_URL}/api/users/logout`, { withCredentials: true });
            localStorage.removeItem("jwt"); // Remove the token on logout
            toast.success(data.message);
            setIsAuthenticated(false);
            navigateTo("/login");
        } catch (error) {
            console.error("Logout error: ", error); // More detailed error logging
            if (error.response) {
                // Server responded with a status other than 2xx
                toast.error(`Failed to logout: ${error.response.data.message}`);
            } else if (error.request) {
                // No response from the server
                toast.error("No response from server, please check your connection or try again.");
            } else {
                // Other errors
                toast.error("Failed to logout");
            }
        }
    };
    console.log("Authenticated:", isAuthenticated);
    console.log("User Role:", profile?.user?.role);
    
    return (
        <header className="shadow block z-50 top-0 max-w-none w-full">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2 w-full">
                <div className="flex flex-wrap justify-between items-center">
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="mr-3 h-24 w-24" alt="Logo" />
                    </Link>
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="mobile-menu"
                        aria-expanded={isOpen ? "true" : "false"}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                    <div
                        className={`${isOpen ? "translate-x-0" : "translate-x-full"} fixed top-0 right-0 z-40 w-64 h-full bg-white transition-transform duration-300 ease-in-out lg:static lg:w-auto lg:translate-x-0 lg:flex lg:items-center lg:order-1 lg:bg-transparent`}
                        id="mobile-menu"
                    >
                        <div className="flex justify-between items-center p-4 lg:hidden">
                            <span className="text-lg font-bold">Menu</span>
                            <button onClick={closeMenu} className="text-gray-500 hover:text-gray-700">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-10 lg:mt-0 lg:text-lg lg:space-y-0">
                            <li>
                                <NavLink
                                    to="/"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block py-2 px-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/products"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block py-2 px-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                    }
                                >
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/naturalproducts"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block py-2 px-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                    }
                                >
                                    Natural Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block py-2 px-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/creators"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block py-2 px-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                    }
                                >
                                    Farmers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block py-2 px-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                            {/* Show Dashboard link for admin and Logout if authenticated */}
                            {isAuthenticated ? (
                                <li className="m-2 lg:hidden">
                                    <Link
                                        to="/dashboard"
                                        className="block py-2 px-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300 lg:p-0"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            ):("")}
                            {!isAuthenticated ? (
                                <li className="m-2 lg:hidden">
                                    <Link
                                        to="/login"
                                        className="block py-2 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 lg:p-0"
                                    >
                                        Login
                                    </Link>
                                </li>
                            ) : (
                                <li className="m-2 lg:hidden">
                                    <button
                                        onClick={handleLogout}
                                        className="block py-2 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 lg:p-0"
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                    {/* Show Dashboard and Logout buttons on larger screens */}
                    <div className="hidden lg:flex space-x-4 lg:order-2 lg:space-x-6">
                        {isAuthenticated  ?(
                            <Link
                                to="/dashboard"
                                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
                            >
                                Dashboard
                            </Link>
                        ):("")}
                        {!isAuthenticated ? (
                            <Link
                                to="/login"
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                            >
                                Login
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
