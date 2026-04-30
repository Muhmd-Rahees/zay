import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";

// fetch user cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/cart/getUserCart");
      console.log("fetchCart response:", response); // for debugging
      const data = response.data;
      if (data.success) {
        return data.cartData;
      } else {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to fetch cart."
        );
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart."
      );
    }
  }
);

// add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ pId, size }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/cart/addToCart", {
        pId,
        size,
        quantity: 1,
      });

      const data = response.data;
      //  Check if your backend sends token error in message:
      if (data.message === "token not found") {
        return thunkAPI.rejectWithValue("UNAUTHORIZED");
      }

      if (data.success) {
        toast.success("Added to cart!");
        return data.cartData;
      } else {
        toast.error(data.message || "Failed to add to cart.");
        return thunkAPI.rejectWithValue(
          data.message || "Failed to add to cart."
        );
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add to cart.";
      toast.error(message);

      if (
        error.response?.status === 401 ||
        error.response?.data?.message === "token not found"
      ) {
        return thunkAPI.rejectWithValue("UNAUTHORIZED");
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ pId, size, quantity }, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/cart/updateCart", {
        pId,
        size,
        quantity,
      });
      const data = response.data;
      if (data.success) {
        toast.success("Cart updated!");
        return data.cartData;
      } else {
        toast.error(data.message || "Failed to update cart.");
        return thunkAPI.rejectWithValue(
          data.message || "Failed to update cart."
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cart.");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update cart."
      );
    }
  }
);

export const clearCartBackend = createAsyncThunk(
  "cart/clearCartBackend",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/api/cart/clearCart");
      const data = res.data;
      if (data.success) {
        console.log("Cart cleared form backend");
        toast.success("Cart cleared from backend!");
        return [];
      } else {
        return thunkAPI.rejectWithValue(data.message || "Failed to clear cart");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    shippingCharge: 10,
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      // toast.success("Cart cleared!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log("Fetched cart payload:", action.payload);
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        // Since your backend returns the entire updated cart,
        // simply replace the items with the payload.
        state.items = action.payload;
      })

      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearCartBackend.fulfilled, (state, action) => {
        state.items = [];
      })
      .addCase(clearCartBackend.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
