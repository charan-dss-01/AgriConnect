import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import "animate.css"; // Import Animate.css
import { useSelector } from "react-redux";

function Hero() {
  const { products } = useSelector((store) => store.product);
  //   const { addToCart } = useAuth(); // Destructure addToCart

  return (
    <div className="container mx-auto my-10 p-6">
      {/* Products Section */}
      <h1 className="text-4xl font-bold mb-6 text-left text-orange-500 border-l-4 border-orange-500 pl-4 hover:animate-pulse">
        Trending
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products && products.length > 0 ? (
          products.slice(0, 4).map((product, index) => {
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
              <div
                key={_id}
                className={`animate__animated animate__fadeInLeft`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Link to={`/product/${_id}`}>
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
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
                        <button
                          //   onClick={() => addToCart(product)} // Use addToCart here
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 w-full rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          View Product
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="flex h-screen items-center justify-center">
            Loading....
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
