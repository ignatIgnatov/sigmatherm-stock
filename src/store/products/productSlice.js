import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axiosConfig";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (pageable, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/products", {
        params: {
          ...pageable,
          size: pageable.size,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    pagination: {
      content: [],
      page: 0,
      size: 10,
      totalPages: 0,
      totalElements: 0,
    },
    search: "",
    status: "idle",
    error: null,
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
        // Запазване на текущите данни докато зарежда нови
        state.pagination = {
          ...state.pagination,
          content: state.pagination.content, // Запазване на текущите елементи
        };
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Ако action.payload е празен обект (при късо търсене)
        if (!action.payload.content) {
          state.pagination = {
            ...state.pagination,
            content: [],
            totalPages: 0,
            totalElements: 0,
          };
        } else {
          state.pagination = {
            content: action.payload.content,
            page: action.payload.pageNumber,
            size: action.payload.pageSize,
            totalPages: action.payload.totalPages,
            totalElements: action.payload.totalElements,
          };
        }
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearch } = productSlice.actions;
export default productSlice.reducer;
