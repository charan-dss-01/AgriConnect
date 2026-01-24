import { configureStore, createSlice } from '@reduxjs/toolkit'
import authSlice from './authSlice';
import productSlice from './productSlice';
import cartslice from './cartSlice';


const store = configureStore({
  reducer:{
    auth:authSlice.reducer,
    product:productSlice.reducer,
    cart:cartslice.reducer
  }
})


export default store;