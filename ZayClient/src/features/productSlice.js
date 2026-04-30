import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../config/axiosConfig";

// to fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/product/list-product");
      return response.data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || error.message
      );
    }
  }
);

// to fetch single products
export const fetchSingleProuduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (prodId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/product/single-product/${prodId}`);
      return response.data.single_product;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/product/list-product?search=${searchQuery}`
      );
      return data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    searchResults: [], 
    loading: false,
    error: null,
    search: "",
    showSearch: false,
    currency: "$",
    singleProduct: null,
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setShowSearch(state, action) {
      state.showSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleProuduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProuduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProuduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearch, setShowSearch } = productSlice.actions;

export default productSlice.reducer;
