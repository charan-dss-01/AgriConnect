import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import Sidebar from "../dashboard/Sidebar";
import MyProfile from "../dashboard/MyProfile";
import MyProducts from "../dashboard/MyProducts";
import CreateProduct from "../dashboard/CreateProduct";
import UpdateProduct from "../dashboard/UpdateProduct";
import Orders from "../dashboard/Orders";
import Cart from "../dashboard/Cart";
import { Navigate } from "react-router-dom";
import FetchCart from "../components/FetchCart";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const profile = useSelector((store) => store.auth.profile);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  // State to track the active component to display
  const [component, setComponent] = useState("My Profile");

  useEffect(() => {
    // Set initial component based on user role after profile is loaded
    if (profile) {
      const userRole = profile?.role || profile?.user?.role;
      setComponent(userRole === "admin" ? "My Products" : "My Profile");
    }
  }, [profile]);

  // Redirect to the homepage if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {/* <FetchCart /> */}
      <Sidebar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Product" ? (
        <CreateProduct />
      ) : component === "Update Product" ? (
        <UpdateProduct />
      ) : component === "My Products" ? (
        <MyProducts />
      ) : component === "Cart" ? (
        <Cart />
      ) : component === "My Orders" ? (
        <Orders />
      ) : profile?.role === "admin" ? (
        <MyProducts />
      ) : (
        <MyProfile />
      )}
    </div>
  );
}
