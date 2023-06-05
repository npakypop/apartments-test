import { configureStore } from "@reduxjs/toolkit";
import { apartmentReducer } from "./apartments/slice";
import { apartmentApi } from "./apartments/api";

export const store = configureStore({
  reducer: {
    apartments: apartmentReducer,
    [apartmentApi.reducerPath]: apartmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apartmentApi.middleware),
});
