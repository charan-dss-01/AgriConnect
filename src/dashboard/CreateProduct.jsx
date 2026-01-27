import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(""); // Corrected spelling here
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState(""); // Added price state
  const [productImage, setProductImage] = useState("");
  const [productImagePreview, setProductImagePreview] = useState("");
  const [createButton, setCreateButton] = useState(false);

  // Image handling function
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProductImagePreview(reader.result);
      setProductImage(file);
    };
  };

  // Form submission handler
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!productImage) {
      return toast.error("Product image is required.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("price", price);
    formData.append("productImage", productImage);

    try {
      setCreateButton(true);
      const { data } = await axios.post(
        `${API_BASE_URL}/api/products/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success(data.message || "Product created successfully.");
      setTitle("");
      setCategory("");
      setAbout("");
      setPrice("");
      setProductImage("");
      setProductImagePreview("");
      setCreateButton(false);
    } catch (error) {
      setCreateButton(false);
      toast.error(error.response?.data?.message || "Failed to create product.");
      console.log(formData);

      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-8">Create Product</h3>
          <form onSubmit={handleCreateProduct} className="space-y-6">
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
                  src={
                    productImagePreview ? productImagePreview : "/imgPL.webp"
                  }
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
                <option value="">Select Category</option> {/* Default option */}
                <option value="fruit">Fruits</option>
                <option value="vegetable">Vegetables</option>
                <option value="natural">Natural Products</option>{" "}
                {/* Added new category */}
              </select>
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

            {/* Price input */}
            <div className="space-y-2">
              <label className="block text-lg">Price</label>
              <input
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
                min="0"
                step="0.01" // Allows for decimal values
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={createButton}
              className="
    w-full py-3 px-4 rounded-xl font-semibold tracking-wide
    text-white
    bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
    shadow-lg shadow-blue-300/40
    hover:shadow-blue-400/60
    hover:from-blue-600 hover:to-blue-800
    transition-all duration-300 ease-out
    transform hover:-translate-y-0.5 active:scale-95
    disabled:opacity-70 disabled:cursor-not-allowed
  "
            >
              {createButton ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </span>
              ) : (
                "Create Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
