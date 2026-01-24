import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { useDispatch } from "react-redux";
import { productActions } from "../store/productSlice";

export default function MyProducts() {
  const dispatch = useDispatch();
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      console.log("Fetching products...");
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/products/my-products`,
          { withCredentials: true },
        );
        console.log(data);
        setMyProducts(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch products.");
      }
    };

    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`${API_BASE_URL}/api/products/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Product deleted successfully");
        setMyProducts((value) => value.filter((product) => product._id !== id));
        dispatch(productActions.removeProduct(product._id));
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to delete product",
        );
      });
  };

  return (
    <div className="flex justify-center container mx-auto my-12 p-4">
      <div className="w-full max-w-6xl">
        {" "}
        {/* Adjust max width here for product cards */}
        {/* <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-orange-400 to-green-400 text-white p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 z-10">
    My Products
</h1> */}
        <h1 className="text-4xl font-bold mb-8 text-center text-orange-600 drop-shadow-md">
          My Products
        </h1>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
          {" "}
          {/* Adjust grid columns for larger screens */}
          {myProducts.length > 0 ? (
            myProducts.map((product) => (
              <div
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={product._id}
              >
                {product?.productImage && (
                  <img
                    src={product.productImage.url}
                    alt="Product"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h4 className="text-xl font-semibold my-2">
                    {product.title}
                  </h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/product/update/${product._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              You have not added any products yet!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
