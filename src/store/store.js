import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { loadPersistedAuthState } from "./auth/authSlice";
import productReducer from "./products/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState: {
    auth: loadPersistedAuthState(),
  },
});
