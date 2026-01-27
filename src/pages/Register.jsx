import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import "animate.css";
import profileImage from "../assets/pro.png";
import { API_BASE_URL } from "../config";
function Register() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [cardVisible, setCardVisible] = useState(false);
  const [button, setButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("photo", photo);
    try {
      setButton(true);
      const { data } = await axios.post(
        `${API_BASE_URL}/api/users/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      toast.success(data.message || "User registered successfully");
      setProfile(data);
      setIsAuthenticated(true);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setPhoto("");
      setPhotoPreview("");
      setButton(false);
      navigateTo("/");
    } catch (error) {
      setButton(false);
      toast.error(
        error.response.data.message || "Please fill the required fields",
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(to bottom right, #ffedea, #fed7aa)",
      }}
    >
      <div
        className={`w-full max-w-md bg-[#fff7ed] shadow-lg rounded-lg p-8 ${cardVisible ? "animate__animated animate__fadeInDown" : "animate__animated animate__fadeOutUp"}`}
      >
        <form onSubmit={handleRegister}>
          <div
            className={`text-4xl font-semibold text-[#e57373] text-center mb-6 ${cardVisible ? "animate__animated animate__fadeInDown" : ""}`}
          >
            Argi <span className="text-[#f87171]">Connect</span>
          </div>
          <h1
            className={`text-xl font-semibold text-center mb-6 text-[#a94442] ${cardVisible ? "animate__animated animate__fadeInDown" : ""}`}
          >
            Register
          </h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`w-full p-3 mb-4 border-2 border-[#fdba74] rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f87171] ${cardVisible ? "animate__animated animate__fadeInDown animate__delay-1s" : ""}`}
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Farmer</option>
          </select>

          <div
            className={`mb-4 ${cardVisible ? "animate__animated animate__fadeInLeft animate__delay-2s" : ""}`}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-[#fdba74] rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f87171]"
            />
          </div>

          <div
            className={`mb-4 ${cardVisible ? "animate__animated animate__fadeInRight animate__delay-3s" : ""}`}
          >
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-[#fdba74] rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f87171]"
            />
          </div>

          <div
            className={`mb-4 ${cardVisible ? "animate__animated animate__fadeInLeft animate__delay-4s" : ""}`}
          >
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border-2 border-[#fdba74] rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f87171]"
            />
          </div>

          <div
            className={`mb-4 ${cardVisible ? "animate__animated animate__fadeInRight animate__delay-4s" : ""}`}
          >
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-[#fdba74] rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f87171]"
            />
          </div>

          <div className="flex items-center mb-4">
            <div
              className={`photo w-20 h-20 mr-4 border-2 border-[#fdba74] rounded-full overflow-hidden ${cardVisible ? "animate__animated animate__fadeInLeft animate__delay-4s" : ""}`}
            >
              <img
                src={photoPreview ? photoPreview : profileImage}
                alt="photo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className={`w-full p-3 border-2 border-[#fdba74] rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f87171] ${cardVisible ? "animate__animated animate__fadeInRight animate__delay-4s" : ""}`}
            />
          </div>

          <p
            className={`text-center mb-4 text-gray-700 ${cardVisible ? "animate__animated animate__fadeIn animate__delay-6s" : ""}`}
          >
            Already registered?{" "}
            <Link to={"/login"} className="text-[#f87171] hover:text-[#f87171]">
              Login Now
            </Link>
          </p>

          <button
            type="submit"
            disabled={button}
            className={`
    w-full p-3 rounded-xl font-semibold tracking-wide
    text-white
    bg-gradient-to-r from-red-400 via-red-500 to-red-600
    shadow-lg shadow-red-300/40
    hover:shadow-red-400/60
    hover:from-red-500 hover:to-red-700
    transition-all duration-300 ease-out
    transform hover:-translate-y-0.5 active:scale-95
    disabled:opacity-70 disabled:cursor-not-allowed
    ${cardVisible ? "animate__animated animate__fadeInUp animate__delay-7s" : ""}
  `}
          >
            {button ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
