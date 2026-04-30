import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosConfig";

export const checkAuthAdminStatus = createAsyncThunk(
  "adminAuth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get("auth/me");
      console.log("resp data: ", resp);
      const admin = resp.data.user;
      if (admin.role !== "Admin") {
        return rejectWithValue("Not authorized as admin");
      }
      return admin;
    } catch (error) {
      return rejectWithValue("Not authenticated");
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    loading: true,
    error: null,
    admin: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAdminStatus.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthAdminStatus.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkAuthAdminStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.admin = null;
        state.loading = false;
      });
  },
});

export default adminAuthSlice.reducer;
