import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { loadPersistedAuthState } from "./auth/authSlice";
import productReducer from "./products/productSlice";
import syncReducer from "./syncs/syncSlice";
import brandReducer from "./brands/brandSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    syncs: syncReducer,
    brands: brandReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState: {
    auth: loadPersistedAuthState(),
  },
});
