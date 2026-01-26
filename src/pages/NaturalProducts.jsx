import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import "animate.css"; // Import animate.css if installed via npm
import { useSelector } from "react-redux";

const NaturalProducts = () => {
  const products = useSelector((store) => store.product.products);
  // Filter for natural products
  const naturalProducts = products?.filter(
    (product) => product.category === "natural",
  );

  return (
    <div className="container mx-auto my-10 p-6">
      <h1 className="text-4xl font-bold mb-6 text-left text-orange-500 border-l-4 border-orange-500 pl-4 hover:animate-pulse">
        Fresh Natural Products
      </h1>

      {naturalProducts && naturalProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {naturalProducts.map((product) => {
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
              <Link to={`/product/${_id}`} key={_id}>
                <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={productImage?.url || "fallback-image-url.jpg"}
                      alt={title}
                      className="w-full h-56 object-cover"
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

                    <div className="text-center space-y-4">
                      <p className="text-lg font-bold text-gray-900">
                        Price: ₹{price}
                      </p>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 w-full rounded-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center gap-4 px-4">
          <span className="text-5xl">🌱</span>

          <h2 className="text-2xl font-bold text-orange-600">
            No Natural Products Yet
          </h2>

          <p className="text-gray-600 max-w-md">
            Our farmers are preparing something fresh and organic for you.
            Please check back soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default NaturalProducts;
