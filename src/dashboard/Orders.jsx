import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {
  FaShoppingCart,
  FaTag,
  FaCheckCircle,
  FaTrash,
  FaStar,
} from "react-icons/fa";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { useSelector } from "react-redux";
import ProductLoader from "../components/ProductLoader";

const Orders = ({ sidebarOpen }) => {
  const profile = useSelector((store) => store.auth?.profile);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!profile) return;

      setLoading(true);
      try {
        const userId = profile?._id;
        if (!userId) {
          toast.error("User ID not found");
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/order/orderget/${userId}`,
        );
        setOrders(response.data.orders);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [profile]);

  const removeOrder = async (orderId) => {
    try {
      const userId = profile?._id || profile?.user?._id;
      if (!userId) {
        toast.error("User ID not found");
        return;
      }

      await axios.delete(`${API_BASE_URL}/api/order/orders/remove/${orderId}`, {
        data: { userId },
      });

      setOrders(orders.filter((order) => order._id !== orderId));
      toast.success("Order removed successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing order.");
    }
  };

  const sortedOrders = orders.sort((a, b) => {
    if (a.status === "Delivered" && b.status !== "Delivered") return 1;
    if (a.status !== "Delivered" && b.status === "Delivered") return -1;
    return 0;
  });

  // 🔹 Profile loader
  if (!profile) {
    return (
      <div
        className={`flex justify-center container mx-auto my-12 p-4 animate__animated animate__fadeIn ${
          sidebarOpen ? "ml-64" : ""
        }`}
      >
        <ProductLoader text="Loading profile..." />
      </div>
    );
  }

  return (
    <div
      className={`flex justify-center container mx-auto my-12 p-4 animate__animated animate__fadeIn ${
        sidebarOpen ? "ml-64" : ""
      }`}
    >
      <div className="w-full max-w-6xl font-[Inter,system-ui,sans-serif]">
        <h1 className="text-4xl font-bold mb-10 text-center text-orange-600 tracking-tight">
          Your Orders
        </h1>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            // 🔹 Skeleton loader cards
            Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="border border-orange-100 rounded-2xl p-6 bg-white shadow-sm animate__animated animate__pulse"
              >
                <ProductLoader text="Loading order..." />
              </div>
            ))
          ) : sortedOrders.length ? (
            sortedOrders.map((order) => (
              <div
                key={order._id}
                className="group border border-orange-100 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                    <FaShoppingCart className="text-lg" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Order ID
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {order._id}
                    </p>
                  </div>
                </div>

                {/* Items */}
                {order.items.map((item) => (
                  <div key={item._id} className="mb-4">
                    {item.product ? (
                      <>
                        <img
                          src={item.product?.productImage?.url}
                          alt={item.product?.title}
                          className="w-full h-40 object-cover rounded-xl mb-3 shadow-sm group-hover:scale-[1.02] transition-transform"
                        />
                        <h3 className="text-sm font-semibold text-gray-900">
                          {item.product?.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Qty:{" "}
                          <span className="font-medium">{item.quantity}</span>
                        </p>
                        <p className="text-sm font-semibold text-emerald-600">
                          ₹{item.product?.price}
                        </p>
                      </>
                    ) : (
                      <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500">
                        Product no longer available (Qty: {item.quantity})
                      </div>
                    )}
                  </div>
                ))}

                {/* Meta */}
                <div className="border-t pt-4 mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaTag className="text-gray-400 text-sm" />
                    <span>Total</span>
                    <span className="ml-auto font-semibold text-orange-600">
                      ₹{order.totalAmount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCheckCircle className="text-gray-400 text-sm" />
                    <span>Status</span>
                    <span
                      className={`ml-auto font-semibold ${
                        order.status === "Delivered"
                          ? "text-emerald-600"
                          : "text-orange-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
                  {order.status !== "Delivered" && (
                    <button
                      onClick={() => removeOrder(order._id)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-red-200 text-red-600 py-2 text-sm font-medium hover:bg-red-50 transition"
                    >
                      <FaTrash className="text-sm" />
                      Remove
                    </button>
                  )}

                  {order.status === "Delivered" && order.items[0]?.product && (
                    <button
                      onClick={() =>
                        navigate(`/${order.items[0].product._id}/review`)
                      }
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 transition"
                    >
                      <FaStar className="text-sm" />
                      Add Review
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 font-medium">
              You have no orders.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
