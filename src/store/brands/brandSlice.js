import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axiosConfig";

export const fetchAllBrands = createAsyncThunk(
  "brands/fetchAllBrands",
  async () => {
    const response = await api.get("/api/brands");
    return response.data;
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    brands: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = action.payload;
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default brandSlice.reducer;
