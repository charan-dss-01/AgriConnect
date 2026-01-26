import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import React, { useEffect } from "react";
import { productActions } from "../store/productSlice";
import { API_BASE_URL } from "../config";
import { authAction } from "../store/authSlice";
import { cartAction } from "../store/cartSlice";
// import { cartActions } from "../store/cartSlice"; // Uncomment once cart slice is created
function FetchCart() {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.auth.profile);
  // const cart = useSelector((store) => store.cart.cart);

  useEffect(() => {
    const fetchCart = async () => {
      const userId = profile?._id;
      console.log(userId);

      if (!userId) {
        console.warn("User ID is missing. Skipping cart fetch.");
        return;
      }

      try {
        dispatch(cartAction.setLoading(true));
        const response = await axios.get(
          `${API_BASE_URL}/api/users/cart?userId=${userId}`,
          { withCredentials: true },
        );

        // Once cartSlice is created, uncomment this:
        dispatch(cartAction.addCart(response.data.cart));
        console.log("Cart fetched:", response.data.cart);
        dispatch(cartAction.setLoading(false));
      } catch (error) {
        dispatch(cartAction.setLoading(false));
        const errorMessage =
          error.response?.data?.message || "Error fetching cart";
        console.error("Error fetching cart:", errorMessage);
      }
    };

    if (profile?._id) {
      fetchCart();
    }
  }, [dispatch, profile]);

  return <></>;
}

export default FetchCart;
