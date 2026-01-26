import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../config";

/* ---------- async thunk ---------- */
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/users/cart/clear`,
        {
          withCredentials: true,
          data: { userId },
        }
      );
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to clear cart"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId, product }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/users/cart/remove/${productId}`,
        {
          withCredentials: true,
          data: { userId, product },
        }
      );
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to remove from cart"
      );
    }
  }
);

/* ---------- slice ---------- */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    addCart: (state, action) => {
      state.cart = action.payload;
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(item => item._id !== action.payload);
    },
    setLoading:(state,action)=>{
      state.loading=action.payload;
    },
    addSingleItem: (state, action) => {
      const product = action.payload;

      const existingItem = state.cart.find(
        (item) => item.product._id === product._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({
          product:product,
          quantity: 1,
          _id:product._id
        });
      }
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        console.log("remove after:",state.cart);
        state.cart = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice;
