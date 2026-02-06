import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "../src/components/Navbar";
import Home from "../src/components/Home";
import Footer from "../src/components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Products from "../src/pages/Products";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import Creators from "../src/pages/Creators";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateProduct";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import NaturalProducts from "./pages/NaturalProducts";
import Cart from "./dashboard/Cart";
import Orders from "./dashboard/Orders";
import MyOrder from "./dashboard/MyOrders";
import ChatBot from "./pages/ChatBot";
import SalesOverview from "./pages/SalesOverView";
import AddReview from "./pages/AddReview";
import Fetch from "./components/Fetch";
import FetchCart from "./components/FetchCart";

import PlantDiseaseDetection from "./pages/PlantDiseaseDetection";

export default function App() {
  const location = useLocation(); // Use useLocation to get the current path
  const hideNavBarFooter = ["/dashboard", "/register", "/login"].includes(
    location.pathname,
  );
  const { products } = useAuth();

  console.log(products);

  return (
    <div>
      {!hideNavBarFooter && <Navbar />}
      <Fetch />
      <FetchCart />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/naturalproducts" element={<NaturalProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales" element={<SalesOverview />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/Myorder" element={<MyOrder />} />
          <Route path="/:productId/review" element={<AddReview />} />
          <Route path="/product/update/:id" element={<UpdateBlog />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/plant" element={<PlantDiseaseDetection />} />
          <Route path="/cart" element={<Cart />} />{" "}
          {/* Add route for the cart page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
      {!hideNavBarFooter && <Footer />}
    </div>
  );
}
