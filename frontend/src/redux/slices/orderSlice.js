import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Async thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk to fetch order details by Id
export const fetchOrdersDetails = createAsyncThunk(
  "orders/fetchOrdersDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload || [];
        state.totalOrders = action.payload.length;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch orders";
      })

      // Fetch order details
      .addCase(fetchOrdersDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrdersDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch order details";
      });
  },
});

export default orderSlice.reducer;
