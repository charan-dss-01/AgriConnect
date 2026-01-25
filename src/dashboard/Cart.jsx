import React, { useEffect, useRef, useState } from "react";
// import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
// import { removeFromCart } from "../store/cartSlice";
import { cartAction } from "../store/cartSlice";
import axios from "axios";

const Cart = () => {
  //   const { cart, fetchCart, clearCart, profile } = useAuth();
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth.profile._id);
  console.log("userid", userId);

  const ccc = useSelector((store) => store.cart.cart);
  console.log("context cart:", ccc);

  const [cartItems, setCartItems] = useState([]);
  //  const [address, setAddress] = useState("");
  const address = useRef();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const removeFromCart = async (product) => {
    if (!userId || !product || !product._id) {
      console.error("User ID or Product information is missing.");
      setError("User ID or Product information is missing.");
      return;
    }
    const productId = product?.product?._id ?? product?._id;

    if (!productId) {
      throw new Error("Product ID not found");
    }

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/users/cart/remove/${productId}`,
        {
          withCredentials: true,
          data: { userId, product },
        },
      );

      dispatch(cartAction.removeItem(product._id));
      console.log("after delete", ccc);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleRemove = async (item) => {
    try {
      await removeFromCart(item);
      toast.success("Product removed from cart!");
    } catch (error) {
      toast.error("Failed to remove product.");
    }
  };

  const clearCart = async () => {
    if (!userId) {
      console.error("User ID is missing.");
      setError("User ID is missing.");
      return;
    }

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/users/cart/clear`,
        {
          withCredentials: true,
          data: { userId },
        },
      );
      console.log("Cart cleared:", response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Error clearing cart");
      console.error("Error clearing cart:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      dispatch(cartAction.addCart([]));
      toast.success("Cart cleared!");
    } catch (error) {
      toast.error("Failed to clear cart.");
    }
  };

  const handleBuyNow = async (item) => {
    if (!address.current?.value) {
      toast.error("Please enter your address!");
      return;
    }

    try {
      if (!userId) {
        toast.error("User ID not found");
        return;
      }

      if (!item.product?._id) {
        toast.error("Product information missing");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/order/single-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId: item.product._id,
          quantity: item.quantity,
          address: address.current.value,
        }),
      });

      if (response.ok) {
        toast.success("Order placed successfully!");
        await removeFromCart(item);
        setShowAddressForm(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to place order.");
      }
    } catch (error) {
      toast.error("An error occurred while placing the order.");
      console.log(error);
    }
  };

  if (!userId) {
    return (
      <div className="container mx-auto my-10 p-6 bg-white">
        <div className="text-center text-orange-500 font-semibold">
          Loading profile...
        </div>
      </div>
    );
  }

  //   if (loading) {
  //     return (
  //       <div className="container mx-auto my-10 p-6 bg-white">
  //         <div className="text-center text-orange-500 font-semibold">
  //           Loading cart items...
  //         </div>
  //       </div>
  //     );
  //   }

  if (!ccc.length) {
    return (
      <div className="container mx-auto my-10 p-6 bg-white">
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 via-orange-500 to-white text-transparent bg-clip-text drop-shadow-lg animate__animated animate__fadeInDown">
          Your Cart
        </h1>
        <div className="text-center text-gray-600 font-semibold">
          Your cart is empty.
        </div>
      </div>
    );
  }

  const totalAmount = ccc.reduce(
    (total, item) =>
      total + (item.product?.price || item.price) * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto my-10 p-6 bg-white">
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 via-orange-500 to-white text-transparent bg-clip-text drop-shadow-lg animate__animated animate__fadeInDown">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ccc.map((item) => (
          <div
            key={item._id}
            className="backdrop-blur-lg bg-white/30 shadow-2xl p-4 rounded-2xl border border-gray-200 hover:shadow-xl transform transition-all duration-300 flex"
          >
            {item.product ? (
              <>
                <div className="w-1/2">
                  <img
                    src={
                      item.product?.productImage?.url ||
                      item.productImage?.url ||
                      "default-image-url"
                    }
                    alt={item.productName || "Product"}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="w-1/2 flex flex-col justify-between pl-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {item.productName}
                    </h2>
                    <p className="text-gray-500 mt-2">{item.product?.about}</p>
                    <p className="mt-3 text-lg font-semibold text-gray-900">
                      ₹
                      {(item.product?.price || item.price) * item.quantity ||
                        item.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity || 1}
                    </p>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-red-500 hover:text-red-700 font-semibold bg-red-100 py-2 px-4 rounded-lg transition-all duration-300 hover:bg-red-200"
                    >
                      Remove
                    </button>

                    <button
                      onClick={() => {
                        setCurrentItem(item);
                        setShowAddressForm(true);
                      }}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full bg-gray-100 p-4 rounded flex items-center justify-center">
                <div>
                  <p className="text-gray-600 text-center font-semibold">
                    Product no longer available
                  </p>
                  <p className="text-gray-500 text-sm text-center mt-2">
                    Quantity: {item.quantity || 1}
                  </p>
                  <button
                    onClick={() => handleRemove(item)}
                    className="mt-3 text-red-500 hover:text-red-700 font-semibold bg-red-100 py-2 px-4 rounded-lg transition-all duration-300 hover:bg-red-200 w-full"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {showAddressForm && currentItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-md">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-bold text-gray-800">
                Enter Your Address
              </h3>
              {/* <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-4 p-2 w-full border border-gray-300 rounded-lg"
              /> */}
              <input
                type="text"
                placeholder="Enter your address"
                ref={address}
                className="mt-4 p-2 w-full border border-gray-300 rounded-lg"
              />
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleBuyNow(currentItem)} // Pass the current item
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-300"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center space-y-6 lg:flex-row lg:justify-between lg:items-center">
        <button
          onClick={handleClearCart}
          className="bg-red-500 text-white py-3 px-8 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          Clear Cart
        </button>

        <h2 className="text-3xl font-bold text-gray-800 animate__animated animate__pulse animate__infinite">
          Total: ₹{totalAmount.toFixed(2)}
        </h2>

        {/* <button
                    onClick={handleBuyAll}
                    className="bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                    Buy All
                </button> */}
      </div>
    </div>
  );
};

export default Cart;
