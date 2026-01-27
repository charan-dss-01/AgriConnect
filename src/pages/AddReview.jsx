import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import 'animate.css'; // Import animate.css for animations
import { API_BASE_URL } from '../config';
import { useSelector } from "react-redux";
const AddReview = () => {
  const profile = useSelector((store) => store.auth.profile);
    const { productId } = useParams(); // Access productId from URL params
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(false); // New state for button visibility

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rating || !comment) {
            toast.error('Please fill in all fields.');
            return;
        }

        const reviewData = {
            userId: profile._id, // Replace with the actual userId
            productId: productId, // Use productId from URL
            rating: parseInt(rating, 10),
            comment,
        };

        try {
            setLoading(true);
            await axios.post(`${API_BASE_URL}/api/products/${productId}/review`, reviewData); // Use productId in API URL
            toast.success('Review added successfully!');
            setRating('');
            setComment('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error submitting review.');
        } finally {
            setLoading(false);
        }
    };

    // Delay button appearance after 4 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 3000); // Reduced delay to 3 seconds for faster button appearance

        return () => clearTimeout(timer); // Cleanup on component unmount
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8 animate__animated animate__fadeIn animate__duration-500">
            <div className="w-full max-w-lg p-10 bg-white shadow-lg rounded-lg border border-gray-200 animate__animated animate__zoomIn animate__duration-500">
                <h1 className="text-3xl font-semibold text-center text-orange-600 mb-6 animate__animated animate__fadeIn animate__delay-1s animate__duration-500">
                    Add a Review
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 animate__animated animate__fadeIn animate__delay-2s animate__duration-500">
                        <label htmlFor="rating" className="block text-gray-800 font-medium mb-2">
                            Rating (1 to 5):
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            min="1"
                            max="5"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <div className="mb-6 animate__animated animate__fadeIn animate__delay-3s animate__duration-500">
                        <label htmlFor="comment" className="block text-gray-800 font-medium mb-2">
                            Comment:
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    {showButton && ( // Conditionally render the button after 3 seconds
                        <button
                            type="submit"
                            className={`w-full px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-transform transform hover:scale-105 ${
                                loading ? 'cursor-not-allowed opacity-50' : ''
                            } animate__animated animate__slideInUp animate__duration-500`} // Button with slideUp animation and faster duration
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Review'}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddReview;
