import { useDispatch } from "react-redux";
import axios from "axios";
import React, { useEffect } from "react";
import { productActions } from "../store/productSlice";
import { API_BASE_URL } from "../config";
import { authAction } from "../store/authSlice";

function Fetch() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/products/all-products`,
        );
        dispatch(productActions.setProducts(data));
        console.log("Products fetched:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchAdmins = async () => {
      const { data } = await axios.get(`${API_BASE_URL}/api/users/admin`, {
        withCredentials: true,
      });
      console.log(data);
      dispatch(productActions.setAdmins(data));
    };

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/users/my-profile`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        // setProfile(data);
        // setIsAuthenticated(true);
        dispatch(authAction.setIsAuthenticated(true));
        dispatch(authAction.setProfile(data));
        console.log("Profile Data:", data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        dispatch(authAction.setIsAuthenticated(false));
        dispatch(authAction.setProfile([]));
      }
    };

    fetchAdmins();
    fetchProducts();
    fetchProfile();
  }, [dispatch]);

  return <></>;
}

export default Fetch;
