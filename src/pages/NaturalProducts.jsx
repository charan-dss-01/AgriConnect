import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import "animate.css"; // Import animate.css if installed via npm

const NaturalProducts = () => {
  const { products } = useAuth();

  // Filter for natural products
  const naturalProducts = products?.filter((product) => product.category === "natural");

  return (
    <div className="container mx-auto my-10 p-6">
      <h1 className="text-4xl font-bold mb-6 text-left text-orange-500 border-l-4 border-orange-500 pl-4 hover:animate-pulse">
        Fresh Natural Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {naturalProducts && naturalProducts.length > 0 ? (
          naturalProducts.map((product) => {
            const {
              _id,
              title,
              productImage,
              category,
              price,
              adminphoto,
              adminName,
              about
            } = product;

            return (
              <Link to={`/product/${_id}`} key={_id}>
                <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp">
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={productImage?.url || "fallback-image-url.jpg"}
                      alt={title}
                      className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Overlay with Title */}
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
                        className="w-12 h-12 rounded-full border-2 border-yellow-400"
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
                      <Link to={`/product/${_id}`} className="block w-full">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                          Add to Cart
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="flex h-screen items-center justify-center">
            <p className="text-lg">No natural products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NaturalProducts;
