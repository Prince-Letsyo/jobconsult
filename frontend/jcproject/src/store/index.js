import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api";
import jwtAuthSlice from "./features/authSlice/jwtAuthSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: jwtAuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
