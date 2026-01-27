import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { API_BASE_URL } from "../config";
import "animate.css";
import { useDispatch } from "react-redux";
import { authAction } from "../store/authSlice";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();
  const [cardVisible, setCardVisible] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    // Show card with animation after component mounts
    const timer = setTimeout(() => {
      setCardVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLogin(true);
      const { data } = await axios.post(
        ` ${API_BASE_URL}/api/users/login`,
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      toast.success(data.message || "User Logged in successfully");
      const profileData = data.user || data; // Handle both response structures
      console.log("Login response:", profileData); // Check structure
      //setProfile(profileData);
      //setIsAuthenticated(true);
      dispatch(authAction.setIsAuthenticated(true));
      dispatch(authAction.setProfile(profileData));
      setPassword("");
      setRole("");
      setLogin(false);
      navigateTo("/");
    } catch (error) {
      setLogin(false);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(to right, white, #fed7aa)" }}
    >
      {/* Card with gradient-inspired styling */}
      <div
        className={`w-full max-w-md bg-[#fff7ed] shadow-lg rounded-lg p-8 border border-orange-100 ${cardVisible ? "animate__animated animate__fadeInDown" : "animate__animated animate__fadeOutUp"}`}
      >
        <form onSubmit={handleLogin}>
          {/* Heading with complementary colors */}
          <div
            className={`text-4xl font-semibold text-orange-600 text-center mb-6 ${cardVisible ? "animate__animated animate__fadeInDown" : ""}`}
          >
            Argi <span className="text-orange-500">Connect</span>
          </div>
          <h1
            className={`text-xl font-semibold text-center mb-6 text-orange-700 ${cardVisible ? "animate__animated animate__fadeInDown" : ""}`}
          >
            Login
          </h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`w-full p-3 mb-4 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${cardVisible ? "animate__animated animate__fadeInDown animate__delay-1s" : ""}`}
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Farmer</option>
          </select>

          {/* Email input sliding in from the left */}
          <div
            className={`mb-4 ${cardVisible ? "animate__animated animate__fadeInLeft animate__delay-2s" : ""}`}
          >
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Password input sliding in from the right */}
          <div
            className={`mb-4 ${cardVisible ? "animate__animated animate__fadeInRight animate__delay-3s" : ""}`}
          >
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Registration prompt */}
          <p
            className={`text-center mb-4 text-orange-700 ${cardVisible ? "animate__animated animate__fadeIn animate__delay-4s" : ""}`}
          >
            New User?{" "}
            <Link
              to={"/register"}
              className="text-orange-600 hover:text-orange-700"
            >
              Register Now
            </Link>
          </p>

          {/* Button sliding up from the bottom */}
          <button
            type="submit"
            disabled={login}
            className={`
    w-full p-3 rounded-xl font-semibold tracking-wide
    text-white
   bg-orange-600
    shadow-lg shadow-orange-300/40
    hover:shadow-orange-400/60
    hover:from-orange-600 hover:to-orange-800
    transition-all duration-300 ease-out
    transform hover:-translate-y-0.5 active:scale-95
    disabled:opacity-70 disabled:cursor-not-allowed
    ${cardVisible ? "animate__animated animate__fadeInUp animate__delay-5s" : ""}
  `}
          >
            {login ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
