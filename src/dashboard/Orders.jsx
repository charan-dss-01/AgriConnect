import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaShoppingCart, FaTag, FaCheckCircle, FaTrash, FaStar } from 'react-icons/fa'; // Importing icons
import 'animate.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { API_BASE_URL } from '../config';

const Orders = ({ sidebarOpen }) => {
    const { profile } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchOrders = async () => {
            if (!profile) {
                setLoading(true);
                return;
            }

            try {
                const userId = profile?._id || profile?.user?._id;
                if (!userId) {
                    toast.error('User ID not found');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${API_BASE_URL}/api/order/orderget/${userId}`);
                setOrders(response.data.orders);
                setLoading(false);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error fetching orders.');
                setLoading(false);
            }
        };

        fetchOrders();
    }, [profile]);

    // Function to remove an order
    const removeOrder = async (orderId) => {
        try {
            const userId = profile?._id || profile?.user?._id;
            if (!userId) {
                toast.error('User ID not found');
                return;
            }

            await axios.delete(`${API_BASE_URL}/api/order/orders/remove/${orderId}`, {
                data: { userId },
            });
            setOrders(orders.filter(order => order._id !== orderId));
            toast.success('Order removed successfully.');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error removing order.');
        }
    };

    // Sorting orders: place non-delivered orders first
    const sortedOrders = orders.sort((a, b) => {
        if (a.status === 'Delivered' && b.status !== 'Delivered') return 1;
        if (a.status !== 'Delivered' && b.status === 'Delivered') return -1;
        return 0;
    });

    if (!profile) {
        return (
            <div className={`flex justify-center container mx-auto my-12 p-4 animate__animated animate__fadeIn ${sidebarOpen ? 'ml-64' : ''}`}>
                <div className="text-center text-orange-500 font-semibold">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className={`flex justify-center container mx-auto my-12 p-4 animate__animated animate__fadeIn ${sidebarOpen ? 'ml-64' : ''}`}>
            <div className="w-full max-w-6xl">
                <h1 className="text-4xl font-bold mb-8 text-center text-orange-600 drop-shadow-md">Your Orders</h1>

                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
                    {loading ? (
                        <div className="text-center text-orange-500 font-semibold">Loading your orders...</div>
                    ) : sortedOrders.length ? (
                        sortedOrders.map((order) => (
                            <div 
                                key={order._id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm animate__animated animate__zoomIn animate__faster transition-transform transform hover:scale-105 hover:shadow-xl"
                            >
                                <div className="p-6">
                                    <h5 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                        <FaShoppingCart className="text-2xl mr-2 text-orange-500" />
                                        <span>Order ID: </span>
                                        <span className="text-gray-600 ml-1">{order._id}</span>
                                    </h5>
                                    {order.items.map((item) => (
                                        <div key={item._id} className="mb-4">
                                            <img
                                                src={item.product?.productImage?.url}
                                                alt={item.productName}
                                                className="w-full h-40 object-cover rounded-md mb-3 shadow-sm transition-transform transform hover:scale-105"
                                            />
                                            <h3 className="text-md font-semibold text-blue-600">{item.product.title}</h3>
                                            <p className="text-gray-700">Quantity: <strong>{item.quantity}</strong></p>
                                            <p className="text-green-700 font-semibold">Price: ₹{item.product.price}</p>
                                        </div>
                                    ))}
                                    <h3 className="text-md font-bold text-gray-800 mt-4 flex items-center">
                                        <FaTag className="mr-2 text-green-500" />
                                        Total: <span className="text-orange-600">₹{order.totalAmount}</span>
                                    </h3>
                                    <h3 className="text-md font-bold text-gray-800 mt-2 flex items-center">
                                        <FaCheckCircle className="mr-2 text-blue-500" />
                                        Status: <span className="text-orange-600">{order.status}</span>
                                    </h3>

                                    {/* Conditionally render the Remove button based on order status */}
                                    {order.status !== 'Delivered' && (
                                        <button 
                                            onClick={() => removeOrder(order._id)} 
                                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-transform transform hover:scale-105 hover:shadow-md duration-300 flex items-center"
                                        >
                                            <FaTrash className="mr-2" />
                                            Remove
                                        </button>
                                    )}

                                    {/* Add Review button for delivered orders */}
                                    {order.status === 'Delivered' && (
                                        <button 
                                            onClick={() => navigate(`/${order.items[0].product._id}/review`)} 
                                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center"
                                        >
                                            <FaStar className="mr-2" />
                                            Add Review
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600 font-semibold">You have no orders.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;
