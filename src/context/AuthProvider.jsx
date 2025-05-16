import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';

// Configure axios defaults
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [profile, setProfile] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cart, setCart] = useState([]);
    const [error, setError] = useState();
    // useEffect(() => {
    //     // Check if profile is loaded
    //     if (profile) {
    //         console.log("Profile loaded:", profile);
    //         fetchCart(); // Call fetchCart here if profile is valid
    //     } else {
    //         console.log("Profile not loaded yet.");
    //     }
    // }, [profile]);
   
    // Initial fetch of user's cart and products
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/users/my-profile`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setProfile(data);
                setIsAuthenticated(true);
                console.log("Profile Data:", data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setIsAuthenticated(false);
                setProfile(null);
            }
        };

        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/products/all-products`);
                setProducts(data);
                console.log("Products fetched:", data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProfile();
        fetchProducts();
        //fetchCart(); // Fetch the cart when the provider mounts
    }, []);
    
    const addToCart = async (product) => {
        const userId = profile?._id;
    
        if (!product?._id || !userId) {
            console.error("Product ID or User ID is missing.");
            return;
        }
    
        try {
            setCart(prevCart => {
                const existingProduct = prevCart.find(item => item._id === product._id);
                if (existingProduct) {
                    return prevCart.map(item =>
                        item._id === product._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return [...prevCart, { ...product, quantity: 1 }];
            });
    
            const response = await axios.post(
                `${API_BASE_URL}/api/users/cart/add/${product._id}`,
                { userId, product },
                { withCredentials: true }
            );
    
            console.log("Product added to cart:", response.data);
        } catch (error) {
            setCart(prevCart => prevCart.filter(item => item._id !== product._id));
            console.error("Error adding to cart:", error);
        }
    };
    

    const removeFromCart = async (product) => {
        const userId = profile?._id;
    
        if (!userId || !product || !product._id) {
            console.error("User ID or Product information is missing.");
            setError("User ID or Product information is missing.");
            return;
        }
    
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/api/users/cart/remove/${product.product._id}`,
                {
                    withCredentials: true,
                    data: { userId, product }
                }
            );
    
            console.log("Product removed from cart:", response.data);
            await fetchCart();
        } catch (error) {
            setError(error.response?.data?.message || 'Error removing product from cart');
            console.error("Error removing product from cart:", error);
        }
    };
    
    const fetchCart = async () => {
        const userId = profile?._id;
        
        if (!userId) {
            console.error("User ID is missing.");
            setError("User ID is missing.");
            return;
        }
    
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/users/cart?userId=${userId}`,
                { withCredentials: true }
            );
    
            setCart(response.data.cart);
            console.log("Cart fetched:", response.data.cart);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error fetching cart';
            setError(errorMessage);
            console.error("Error fetching cart:", error);
        }
    };

    // Function to clear the cart
    const clearCart = async () => {
        const userId = profile?._id;
    
        if (!userId) {
            console.error("User ID is missing.");
            setError("User ID is missing.");
            return;
        }
    
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/users/cart/clear`, {
                withCredentials: true,
                data: { userId }
            });

            setCart(response.data.cart);
            console.log("Cart cleared:", response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Error clearing cart');
            console.error("Error clearing cart:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            products, 
            profile, 
            setProfile, 
            isAuthenticated, 
            setIsAuthenticated, 
            cart, 
            addToCart, 
            removeFromCart, 
            fetchCart, 
            clearCart 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};