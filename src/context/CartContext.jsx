import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Ensure you have axios installed

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const API_URL = 'http://localhost:3000/api/users/cart';

    // Fetch cart items from the server when the component mounts
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(API_URL);
                setCart(response.data); // Assuming the server returns the cart items
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const addToCart = async (productId) => {
        try {
            // Make API call to add the product to the cart on the server
            const response = await axios.post(`${API_URL}/add/${productId}`);
            // Assuming the server returns the updated cart items
            setCart(response.data); // Update local cart state with the server response
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            // Make API call to remove the product from the cart on the server
            const response = await axios.delete(`${API_URL}/add/${productId}`);
            // Assuming the server returns the updated cart items
            setCart(response.data); // Update local cart state with the server response
        } catch (error) {
            console.error('Failed to remove from cart:', error);
        }
    };

    const clearCart = async () => {
        try {
            // Make API call to clear the cart on the server
            const response = await axios.delete(API_URL);
            // Assuming the server returns the updated cart items (empty)
            setCart(response.data); // Update local cart state with the server response
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
