import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
    admins:[]
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
    removeProduct:(state,action)=>{
      state.products=state.products.filter((pro)=>action.payload!==pro._id)
    }
  },
});

export const productActions = productSlice.actions;
export default productSlice;
