import React from 'react';
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'animate.css'; // Import Animate.css

// Product Card Component
const ProductCard = ({ product }) => {
    const {
        _id,
        title,
        productImage,
        category,
        price,
        adminphoto,
        adminName,
    } = product;
    const navigate = useNavigate();

    return (
        <Link to={`/product/${_id}`} key={_id}>
            <div className="bg-gray-100 border border-gray-300 rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 mx-1 animate__animated animate__fadeInRight">
                {/* Product Image */}
                <div className="group relative">
                    <img
                        src={productImage?.url || "fallback-image-url.jpg"} // Fallback for product image
                        alt={title}
                        className="w-full h-40 object-cover" // Maintain height
                    />
                    {/* Overlay and Title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
                    <h1 className="absolute bottom-4 left-4 text-white text-lg font-bold group-hover:text-yellow-500 transition-colors duration-300">
                        {title}
                    </h1>
                </div>

                {/* Product Details */}
                <div className="p-4 text-center"> {/* Adjusted padding */}
                    <p className="text-gray-800 text-sm mb-2">
                        <span className="font-semibold">Category: </span>
                        {category}
                    </p>

                    {/* Admin Photo and Name */}
                    <div className="flex items-center justify-center mb-2">
                        <img
                            src={adminphoto || "default-admin-image-url.jpg"} // Fallback for admin photo
                            alt={adminName || "Unknown Farmer"}
                            className="w-10 h-10 rounded-full border-2 border-yellow-400" // Adjusted size
                        />
                        <div className="ml-2">
                            <p className="text-md font-semibold text-gray-800">
                                {adminName || "Unknown Farmer"}
                            </p>
                            <p className="text-xs text-gray-400">Farmer</p>
                        </div>
                    </div>

                    {/* Centered Price */}
                    <p className="text-lg font-bold text-gray-900 mb-2">
                        Price: ₹{price}
                    </p>

                    {/* Full-Width Add to Cart Button with Navigation */}
                    <button
                        onClick={() => navigate(`/cart/${_id}`)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 w-full rounded-lg"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
};

// Main Fruits Component
export default function Fruits() {
    const { products } = useAuth();
    console.log(products);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5, // Show 5 cards for super large desktop
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5, // Show 5 cards in desktop view
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3, // Adjust for tablets
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    // Filter products by the "fruit" category
    const fruitProducts = products?.filter(product => product.category.toLowerCase() === 'fruit');

    return (
        <div className="container mx-auto my-10 p-6">
            <h1 className="text-4xl font-bold mb-6 text-left text-orange-500 border-l-4 border-orange-500 pl-4 hover:animate-pulse">
                Fruits
            </h1>
            <Carousel responsive={responsive}>
                {/* Display only fruit category products */}
                {fruitProducts && fruitProducts.length > 0 ? (
                    fruitProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <div className="flex h-screen items-center justify-center">
                        No fruit products available...
                    </div>
                )}
            </Carousel>
        </div>
    );
}
