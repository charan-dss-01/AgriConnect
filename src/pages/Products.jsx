import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaCaretDown } from "react-icons/fa";
import "animate.css";
import { API_BASE_URL } from "../config";
import { useSelector } from "react-redux";
export default function Products() {
  // const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const products = useSelector((store) => store.product.products);

  console.log(products);

  // const fetchProducts = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/api/products/all-products`);
  //     const data = await response.json();
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const categories = [
    ...new Set(
      products?.filter((p) => p.category).map((product) => product.category) ||
        [],
    ),
  ];

  const filteredProducts =
    products?.filter((product) => {
      const matchesSearchQuery =
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        false;
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      return matchesSearchQuery && matchesCategory;
    }) || [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-500">
        Our Products
      </h1>

      {/* Search and Category section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-0">
        {/* Search input with icon */}
        <div className="relative w-full md:w-[70%] md:mr-2">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Category selection dropdown with icon */}
        <div className="relative w-full md:w-1/3 mt-4 md:mt-0">
          <FaCaretDown className="absolute right-3 top-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 pl-5 pr-10 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product, index) => {
          const {
            _id,
            title,
            productImage,
            category,
            price,
            adminphoto,
            adminName,
          } = product;

          return (
            <Link
              to={`/product/${_id}`}
              key={_id}
              className="block animate__animated animate__fadeInDown animate__delay-1s"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={productImage?.url || "fallback-image-url.jpg"}
                    alt={title}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                  <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold">
                    {title}
                  </h1>
                </div>

                {/* Product Details */}
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">Category: </span>
                    {category}
                  </p>

                  {/* Admin Section */}
                  <div className="flex items-center gap-4">
                    <img
                      src={adminphoto}
                      alt={adminName}
                      className="w-12 h-12 rounded-full border-2 border-green-400"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {adminName || "Unknown Farmer"}
                      </p>
                      <p className="text-xs text-gray-400">Farmer</p>
                    </div>
                  </div>

                  {/* Price and Button */}
                  <div className="text-center space-y-4">
                    <p className="text-lg font-bold text-gray-900">
                      Price: ₹{price}
                    </p>
                    <Link to={`/cart/${_id}`} className="block w-full">
                      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        View Product
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
