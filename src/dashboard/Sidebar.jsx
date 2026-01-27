import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import {
  BiSolidLeftArrowAlt,
  BiHome,
  BiCart,
  BiUser,
  BiBox,
  BiLogOut,
  BiChat,
} from "react-icons/bi";
import { FaClipboardList, FaBoxOpen } from "react-icons/fa";
import { MdAddBox, MdProductionQuantityLimits } from "react-icons/md";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/authSlice";
import Cookies from "js-cookie";


export default function Sidebar({ setComponent }) {
  const dispatch = useDispatch();
  const { setIsAuthenticated } = useAuth();
  const profile = useSelector((store) => store.auth.profile);

  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();

  const handleComponents = (component) => {
    setComponent(component);
    setShow(false); // Close sidebar on button click
  };

  const gotoHome = () => {
    navigateTo("/");
    setShow(false);
  };

  const gotoCart = () => {
    navigateTo("/cart");
    setShow(false);
  };

  const gotoChatbot = () => {
    navigateTo("/chatbot");
    setShow(false);
  };

  const gotoMyOrder = () => {
    navigateTo("/Myorder");
    setShow(false);
  };

  const gotoOrder = () => {
    navigateTo("/order");
    setShow(false);
  };
  const gotoMySales = () => {
    navigateTo("/sales");
    setShow(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/users/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("jwt");
      Cookies.remove("jwt", { path: "/" });
      toast.success(data.message);
      setIsAuthenticated(false);
      dispatch(authAction.setIsAuthenticated(false));
      dispatch(authAction.setProfile([]));
      navigateTo("/login");
      setShow(false);
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <div
        className="fixed top-4 left-4 z-50 cursor-pointer transition-transform duration-300"
        onClick={() => setShow(!show)}
        style={{ transform: show ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        {show ? (
          <BiSolidLeftArrowAlt className="text-2xl" />
        ) : (
          <CiMenuBurger className="text-2xl ml-3" />
        )}
      </div>

      <div
        className={`fixed top-0 left-0 h-full shadow-lg bg-gray-50 transition-all duration-500 ease-in-out transform ${
          show ? "w-64" : "w-16"
        }`}
      >
        <div className="text-center mb-4">
          {show && (
            <>
              <img
                className="w-24 h-24 rounded-full mx-auto mt-6 mb-2"
                src={profile?.user?.photo?.url || profile?.photo?.url}
                alt="Profile"
              />
              <p className="text-lg font-semibold">
                {profile?.name || profile?.user?.name}
              </p>
            </>
          )}
        </div>

        <ul className="space-y-6 mx-4">
          {(profile?.role || profile?.user?.role) === "admin" && (
            <>
              <button
                onClick={() => handleComponents("My Products")}
                className={`w-full px-4 py-2 rounded-lg transition duration-300 ${
                  show
                    ? "bg-teal-500 hover:bg-teal-700 text-white"
                    : "text-teal-500"
                }`}
              >
                {show ? (
                  "MY PRODUCTS"
                ) : (
                  <MdProductionQuantityLimits className="text-xl mt-9" />
                )}
              </button>
              <button
                onClick={() => handleComponents("Create Product")}
                className={`w-full px-4 py-2 rounded-lg transition duration-300 ${
                  show
                    ? "bg-indigo-500 hover:bg-indigo-700 text-white"
                    : "text-indigo-500"
                }`}
              >
                {show ? (
                  "CREATE PRODUCT"
                ) : (
                  <MdAddBox className="text-xl mx-auto" />
                )}
              </button>
              <button
                onClick={gotoMyOrder}
                className={`w-full px-4 py-2 rounded-lg transition duration-300 ${
                  show
                    ? "bg-blue-500 hover:bg-blue-700 text-white"
                    : "text-blue-500"
                }`}
              >
                {show ? (
                  "MY ORDERS"
                ) : (
                  <FaClipboardList className="text-xl mx-auto" />
                )}
              </button>
              <button
                onClick={gotoMySales}
                className={`w-full px-4 py-2 rounded-lg transition duration-300 ${
                  show
                    ? "bg-pink-500 hover:bg-pink-700 text-white"
                    : "text-pink-500"
                }`}
              >
                {show ? (
                  "SALES PREVIEW"
                ) : (
                  <FaBoxOpen className="text-xl mx-auto" />
                )}
              </button>
            </>
          )}
          <button
            onClick={gotoCart}
            className={`w-full px-4 py-2 rounded-lg transition duration-300 ${
              show
                ? "bg-purple-500 hover:bg-purple-700 text-white"
                : "text-purple-500"
            }`}
          >
            {show ? (
              "MY CART"
            ) : (
              <BiCart
                className={`text-xl mx-auto ${profile?.role === "user" ? "mt-8" : ""}`}
              />
            )}
          </button>
          <button
            onClick={() => handleComponents("My Profile")}
            className={`w-full px-4 py-2 rounded-lg transition duration-300 ${
              show
                ? "bg-rose-500 hover:bg-rose-700 text-white"
                : "text-rose-500"
            }`}
          >
            {show ? "MY PROFILE" : <BiUser className="text-xl mx-auto" />}
          </button>
          <button
            onClick={gotoOrder}
            className={`w-full px-4 py-2 rounded-lg transition duration-300 ${
              show
                ? "bg-orange-500 hover:bg-orange-700 text-white"
                : "text-orange-500"
            }`}
          >
            {show ? "ORDERS" : <BiBox className="text-xl mx-auto" />}
          </button>
          <button
            onClick={gotoHome}
            className={`w-full px-4 py-2 rounded-lg transition duration-300 ${
              show ? "bg-red-500 hover:bg-red-700 text-white" : "text-red-500"
            }`}
          >
            {show ? "HOME" : <BiHome className="text-xl mx-auto" />}
          </button>
          <button
            onClick={gotoChatbot}
            className={`w-full px-4 py-2 rounded-lg transition duration-300 ${
              show
                ? "bg-cyan-500 hover:bg-cyan-700 text-white"
                : "text-cyan-500"
            }`}
          >
            {show ? "CHATBOT" : <BiChat className="text-xl mx-auto" />}
          </button>
          <button
            onClick={handleLogout}
            className={`w-full px-4 py-2 rounded-lg transition duration-300 ${
              show
                ? "bg-yellow-500 hover:bg-yellow-700 text-white"
                : "text-yellow-500"
            }`}
          >
            {show ? "LOGOUT" : <BiLogOut className="text-xl mx-auto" />}
          </button>
        </ul>
      </div>
    </>
  );
}
