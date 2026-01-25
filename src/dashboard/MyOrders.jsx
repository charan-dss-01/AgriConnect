import { useAuth } from "../context/AuthProvider";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "animate.css";
import { API_BASE_URL } from "../config";
import { useSelector } from "react-redux";

// Component to fetch and display farmer orders
const FarmerOrders = () => {
  //   const { profile } = useAuth(); // Get the farmer profile from authentication context
  const profile = useSelector((store) => store.auth.profile);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(!profile);
  const [error, setError] = useState(null);

  // Function to fetch farmer's orders
  const fetchFarmerOrders = async (farmerId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/order/orders/get/${farmerId}`,
      );
      console.log("Fetched Orders:", response.data);
      return response.data.orders;
    } catch (error) {
      console.error("Error fetching farmer orders:", error);
      console.error(
        "Error Response:",
        error.response ? error.response.data : "No response",
      );
      throw error;
    }
  };

  // Function to mark an order as delivered
  const markAsDelivered = async (orderId) => {
    try {
      const farmerId = profile?._id || profile?.user?._id;
      if (!farmerId) {
        toast.error("Unable to identify farmer");
        return;
      }

      const response = await axios.patch(
        `${API_BASE_URL}/api/order/orders/gets/${farmerId}/${orderId}`,
      );
      console.log("Order marked as delivered:", response.data);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Completed" } : order,
        ),
      );
      toast.success("Product Delivered.");
    } catch (error) {
      console.error("Error marking order as delivered:", error);
      toast.error("Failed to mark order as delivered");
    }
  };

  useEffect(() => {
    const getOrders = async () => {
      if (!profile) {
        setLoading(true);
        return;
      }

      try {
        const farmerId = profile?._id || profile?.user?._id;
        if (!farmerId) {
          setError("Farmer ID not found");
          setLoading(false);
          return;
        }

        const fetchedOrders = await fetchFarmerOrders(farmerId);
        const sortedOrders = fetchedOrders.sort((a, b) =>
          a.status === "Completed" ? 1 : -1,
        );
        setOrders(sortedOrders);
        setError(null);
      } catch (err) {
        setError("Failed to fetch orders");
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [profile]);

  if (!profile) {
    return <div className="text-center py-4">Loading profile...</div>;
  }

  if (loading) {
    return <div className="text-center py-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen container mx-auto p-4 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-600 animate__animated animate__fadeInDown">
        Farmer Orders
      </h2>
      {orders.length === 0 ? (
        <p className="text-center py-4">No orders found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <li
              key={order._id}
              className="border border-orange-200 p-6 rounded-xl shadow-lg bg-white animate__animated animate__zoomIn animate__faster"
            >
              <h3 className="font-bold text-xl mb-2 text-orange-700">
                Order ID: {order._id}
              </h3>
              <p className="text-gray-700">
                Total Amount: ₹{order.totalAmount}
              </p>
              <p
                className={
                  order.status === "Completed"
                    ? "text-green-600 font-semibold"
                    : "text-orange-600 font-semibold"
                }
              >
                Status: {order.status}
              </p>
              <p className="text-gray-500">
                Order Date: {new Date(order.orderDate).toLocaleString()}
              </p>
              {/* <p className="text-gray-500 mt-2">Address: {order.address}</p> */}
              <h4 className="font-semibold mt-4 text-orange-700">Items:</h4>
              <ul className="space-y-3 mt-2">
                {order.items.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center space-x-4 bg-orange-50 p-3 rounded-lg shadow-md animate__animated animate__fadeInUp animate__delay-1s"
                  >
                    {item.product ? (
                      <>
                        <img
                          src={item.product?.productImage?.url}
                          alt={item.product?.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h5 className="font-medium text-orange-800">
                            {item.product?.title}
                          </h5>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-gray-600">
                            Price: ₹{item.product?.price}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-600 text-sm">
                        Product no longer available (Qty: {item.quantity})
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              {/* Conditionally render the button based on the order status */}
              {order.status !== "Delivered" && (
                <button
                  className="mt-6 w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition-transform transform hover:scale-105 animate__animated animate__bounceIn animate__delay-2s"
                  onClick={() => markAsDelivered(order._id)} // Call the function on click
                >
                  Mark as Delivered
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FarmerOrders;
