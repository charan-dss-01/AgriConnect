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
import { GiPlantRoots } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/authSlice";

export default function Sidebar({ setComponent }) {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.auth.profile);
  const [show, setShow] = useState(false);
  const navigateTo = useNavigate();

  // ----- navigation handlers (unchanged) -----
  const handleComponents = (component) => {
    setComponent(component);
    setShow(false);
  };
  const gotoHome = () => { navigateTo("/"); setShow(false); };
  const gotoCart = () => { navigateTo("/cart"); setShow(false); };
  const gotoChatbot = () => { navigateTo("/chatbot"); setShow(false); };
  const gotoMyOrder = () => { navigateTo("/Myorder"); setShow(false); };
  const gotoOrder = () => { navigateTo("/order"); setShow(false); };
  const gotoMySales = () => { navigateTo("/sales"); setShow(false); };
  const gotoPlant = () => { navigateTo("/plant"); setShow(false); };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/users/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("jwt");
      toast.success(data.message);
      dispatch(authAction.setIsAuthenticated(false));
      dispatch(authAction.setProfile([]));
      navigateTo("/login");
      setShow(false);
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  // ----- button style classes -----
  const expandedButtonClass =
    "w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center gap-3";
  const collapsedButtonClass =
    "w-full px-2 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 flex justify-center";

  return (
    <>
      {/* Toggle Button - fixed outside sidebar */}
      <div
        className="fixed top-4 left-4 z-50 cursor-pointer transition-transform duration-300 bg-white rounded-full p-2 shadow-md hover:shadow-lg"
        onClick={() => setShow(!show)}
        style={{ transform: show ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        {show ? (
          <BiSolidLeftArrowAlt className="text-xl text-gray-700" />
        ) : (
          <CiMenuBurger className="text-xl text-gray-700" />
        )}
      </div>

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-500 ease-in-out flex flex-col ${
          show ? "w-64" : "w-20"
        }`}
      >
        {/* Profile Section (expanded only) */}
        {show && (
          <div className="flex flex-col items-center justify-center pt-8 pb-4 border-b border-gray-100">
            <img
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              src={profile?.user?.photo?.url || profile?.photo?.url}
              alt="Profile"
            />
            <p className="mt-3 text-base font-medium text-gray-800">
              {profile?.name || profile?.user?.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {profile?.role || profile?.user?.role}
            </p>
          </div>
        )}

        {/* Scrollable Button Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <ul className="space-y-2">
            {/* Admin buttons */}
            {(profile?.role || profile?.user?.role) === "admin" && (
              <>
                <li>
                  <button
                    onClick={() => handleComponents("My Products")}
                    className={show ? expandedButtonClass : collapsedButtonClass}
                    title={!show ? "My Products" : ""}
                  >
                    {show ? (
                      <>
                        <MdProductionQuantityLimits className="text-lg" />
                        <span>My Products</span>
                      </>
                    ) : (
                      <MdProductionQuantityLimits className="text-xl" />
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleComponents("Create Product")}
                    className={show ? expandedButtonClass : collapsedButtonClass}
                    title={!show ? "Create Product" : ""}
                  >
                    {show ? (
                      <>
                        <MdAddBox className="text-lg" />
                        <span>Create Product</span>
                      </>
                    ) : (
                      <MdAddBox className="text-xl" />
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={gotoMyOrder}
                    className={show ? expandedButtonClass : collapsedButtonClass}
                    title={!show ? "My Orders" : ""}
                  >
                    {show ? (
                      <>
                        <FaClipboardList className="text-lg" />
                        <span>My Orders</span>
                      </>
                    ) : (
                      <FaClipboardList className="text-xl" />
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={gotoMySales}
                    className={show ? expandedButtonClass : collapsedButtonClass}
                    title={!show ? "Sales Preview" : ""}
                  >
                    {show ? (
                      <>
                        <FaBoxOpen className="text-lg" />
                        <span>Sales Preview</span>
                      </>
                    ) : (
                      <FaBoxOpen className="text-xl" />
                    )}
                  </button>
                </li>
              </>
            )}

            {/* Common buttons */}
            <li>
              <button
                onClick={gotoCart}
                className={show ? expandedButtonClass : collapsedButtonClass}
                title={!show ? "My Cart" : ""}
              >
                {show ? (
                  <>
                    <BiCart className="text-lg" />
                    <span>My Cart</span>
                  </>
                ) : (
                  <BiCart className="text-xl" />
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleComponents("My Profile")}
                className={show ? expandedButtonClass : collapsedButtonClass}
                title={!show ? "My Profile" : ""}
              >
                {show ? (
                  <>
                    <BiUser className="text-lg" />
                    <span>My Profile</span>
                  </>
                ) : (
                  <BiUser className="text-xl" />
                )}
              </button>
            </li>
            <li>
              <button
                onClick={gotoOrder}
                className={show ? expandedButtonClass : collapsedButtonClass}
                title={!show ? "Orders" : ""}
              >
                {show ? (
                  <>
                    <BiBox className="text-lg" />
                    <span>Orders</span>
                  </>
                ) : (
                  <BiBox className="text-xl" />
                )}
              </button>
            </li>
            <li>
              <button
                onClick={gotoHome}
                className={show ? expandedButtonClass : collapsedButtonClass}
                title={!show ? "Back to Home" : ""}
              >
                {show ? (
                  <>
                    <BiHome className="text-lg" />
                    <span>Back to Home</span>
                  </>
                ) : (
                  <BiHome className="text-xl" />
                )}
              </button>
            </li>
            <li>
              <button
                onClick={gotoPlant}
                className={show ? expandedButtonClass : collapsedButtonClass}
                title={!show ? "Plant Disease Detection" : ""}
              >
                {show ? (
                  <>
                    <GiPlantRoots className="text-lg" />
                    <span>Plant Disease Detection</span>
                  </>
                ) : (
                  <GiPlantRoots className="text-xl" />
                )}
              </button>
            </li>
            <li>
              <button
                onClick={gotoChatbot}
                className={show ? expandedButtonClass : collapsedButtonClass}
                title={!show ? "Chatbot" : ""}
              >
                {show ? (
                  <>
                    <BiChat className="text-lg" />
                    <span>Chatbot</span>
                  </>
                ) : (
                  <BiChat className="text-xl" />
                )}
              </button>
            </li>
          </ul>
        </div>

        {/* Logout Button - always at bottom */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`${
              show
                ? "w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-3"
                : "w-full px-2 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 flex justify-center"
            }`}
            title={!show ? "Logout" : ""}
          >
            {show ? (
              <>
                <BiLogOut className="text-lg" />
                <span>Logout</span>
              </>
            ) : (
              <BiLogOut className="text-xl" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
