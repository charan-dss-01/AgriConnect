import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { API_BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../store/cartSlice";

export default function Detail() {
  const { id } = useParams();
  //const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); // State for storing reviews
  const [loading, setLoading] = useState(true);
  //   const { addToCart } = useAuth();

  const dispatch = useDispatch();

  const prods = useSelector((store) => store.product.products);
  const cart = useSelector((store) => store.cart.cart);
  console.log("all", prods);

  const userId = useSelector((store) => store.auth.profile?._id);

  const product = prods.find((p) => p._id === id);

  //console.log(selecetedProd);

  const addToCart = async (product) => {
    if (!product?._id) {
      toast.error("Product information missing");
      return;
    }

    if (!userId) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/cart/add/${product._id}`,
        { userId, product },
        { withCredentials: true },
      );

      console.log("Product added to cart:", response.data);
      dispatch(cartAction.addSingleItem(product));
      console.log("Product from cart:", cart);
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    // const fetchProduct = async () => {
    //   try {
    //     const { data } = await axios.get(
    //       `${API_BASE_URL}/api/products/single-product/${id}`,
    //       { withCredentials: true },
    //     );
    //     console.log("Fetched product data:", data);
    //     setProduct(data);
    //   } catch (error) {
    //     toast.error("please login to see the product details");
    //     console.error(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/products/${id}/reviews`,
          { withCredentials: true },
        );
        console.log("Fetched reviews:", data);
        setReviews(data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch reviews");
        console.error(error);
      }
    };

    if (id) {
      //   fetchProduct();
      fetchReviews();
    } else {
      toast.error("Invalid product ID");
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Product not found</div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      await addToCart(product);
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10 bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex justify-center">
            <img
              src={product?.productImage?.url}
              alt={product?.title}
              className="w-3/4 h-auto rounded-lg object-cover"
            />
          </div>
          <div className="flex items-center justify-start bg-gray-50 p-4 rounded-lg shadow-md mt-6">
            <img
              src={product?.adminphoto}
              alt={product?.adminName}
              className="w-16 h-16 rounded-full border border-gray-300 shadow"
            />
            <div className="ml-4">
              <p className="text-lg font-semibold">{product?.adminName}</p>
              {/* Optional additional information */}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-1/2 space-y-8">
          <h1 className="text-5xl font-bold text-gray-800 border-b-2 border-green-600 pb-2">
            {product?.title}
          </h1>

          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p className="text-xl mt-7 text-gray-700 leading-relaxed">
              {product?.about}
            </p>
          </div>

          <p className="text-2xl mt-9 text-gray-900 font-semibold">
            ₹ {product.price || 1000}
          </p>

          <p className="text-lg text-gray-600 mb-6">
            <span className="font-medium">Category:</span> {product.category}
          </p>

          <button
            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 text-lg font-semibold"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Customer Reviews
        </h2>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border-b py-4">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    review.user?.photo?.url ||
                    `https://www.gravatar.com/avatar/${review.user.email}`
                  }
                  alt={review.user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-lg font-semibold">{review.user.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mb-2">
                <p className="text-lg text-gray-700">{review.comment}</p>
                <div className="mt-2">
                  <span className="text-yellow-500">
                    {"★".repeat(review.rating)}
                  </span>
                  <span className="text-gray-400">
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>
    </div>
  );
}
