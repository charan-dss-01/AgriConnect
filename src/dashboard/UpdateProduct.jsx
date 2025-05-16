import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Don't forget to import axios!
import { API_BASE_URL } from '../config';
export default function UpdateProduct() {
  const { id } = useParams(); // Destructure id from useParams
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(""); // Corrected spelling here
  const [about, setAbout] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImagePreview, setProductImagePreview] = useState("");
  const [price, setPrice] = useState(""); // Added state for price

  // Image handling function
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProductImagePreview(reader.result);
      setProductImage(file); // This is the missing line: set the productImage state
    };
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/products/single-product/${id}`, // Update to your actual endpoint
          {
            withCredentials: true,
          }
        );
        setTitle(data.title);
        setCategory(data.category);
        setAbout(data.about);
        setProductImage(data.productImage.url);
        setProductImagePreview(data.productImage.url); // Add this line to set the preview when fetching
        setPrice(data.price); // Added to set the price when fetching
      } catch (error) {
        toast.error("Failed to fetch product data");
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!productImage) {
      return toast.error("Product image is required.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("productImage", productImage); // Pass the image file
    formData.append("price", price); // Added price to formData

    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/products/update/${id}`, // Update to your actual endpoint
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Important for file upload
          }
        }
      );
      console.log(data);
      
      toast.success(data.message || "Product updated successfully.");
      // Clear the form fields
      setTitle("");
      setCategory("");
      setAbout("");
      setProductImage("");
      setProductImagePreview("");
      setPrice(""); // Clear price after update
      
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong, please try again."
      );
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-8">Update Product</h3>
        <form onSubmit={handleUpdate} className="space-y-6"> {/* Fixed function name here */}

          {/* Title input */}
          <div className="space-y-2">
            <label className="block text-lg">Title</label>
            <input
              type="text"
              placeholder="Enter your product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            />
          </div>

          {/* Product Image input */}
          <div className="space-y-2">
            <label className="block text-lg">Product Image</label>
            <div className="flex items-center justify-center">
              <img
                src={productImagePreview ? productImagePreview : "/imgPL.webp"}
                alt="Product Preview"
                className="w-full max-w-sm h-auto rounded-md object-cover"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            />
          </div>

          {/* Category input */}
          <div className="space-y-2">
            <label className="block text-lg">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            >
              <option value="">Select Category</option>
              <option value="fruit">Fruits</option>
              <option value="vegetable">Vegetables</option>
              <option value="natural">Natural Products</option> {/* Added Natural Products option */}
            </select>
          </div>

          {/* Price input */}
          <div className="space-y-2">
            <label className="block text-lg">Price</label>
            <input
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              required
            />
          </div>

          {/* About input */}
          <div className="space-y-2">
            <label className="block text-lg">About</label>
            <textarea
              rows="5"
              placeholder="Write something about your product"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
          >
            Update Product {/* Changed button text */}
          </button>
        </form>
      </div>
    </div>
  );
}
