import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosConfig";

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus", // this auth/checkStatus here auth is the name that given i the authslice and the other name like checkStatus you can give anything
  async (_, { rejectWithValue }) => {
    try {
      const res1 = await axiosInstance.get("auth/me");
      console.log("response1___", res1);
      return res1.data.user;
    } catch (error) {
      return rejectWithValue("Not authenticated");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    error: null,
    user: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.user = null;
        state.loading = false;
      });
  },
});

export default authSlice.reducer; // final results that is updates states are here in reducer
