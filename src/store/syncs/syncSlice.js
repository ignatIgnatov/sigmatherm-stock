import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axiosConfig";

export const fetchAllSyncronizations = createAsyncThunk(
  "syncs/fetchAllSyncronizations",
  async () => {
    const response = await api.get("/api/syncs");
    return response.data;
  }
);

const syncSlice = createSlice({
  name: "syncs",
  initialState: {
    syncs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSyncronizations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllSyncronizations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.syncs = action.payload;
      })
      .addCase(fetchAllSyncronizations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default syncSlice.reducer;
