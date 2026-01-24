import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
  name:"auth",
  initialState:{
    isAuthenticated:false,
    profile:[]
  },
  reducers:{
    setIsAuthenticated:(state,action)=>{
      //console.log("redux-login called",state.isAuthenticated);
      state.isAuthenticated = action.payload;
    },
    setProfile:(state,action)=>{
      console.log(action.payload.user);
      
      state.profile=action.payload;
    }
  }
})


export const authAction=authSlice.actions;
export default authSlice;