import { configureStore } from "@reduxjs/toolkit";
import { apartmentReducer } from "./apartments/apartmentSlice";
import { apartmentApi } from "./apartments/apartmentApi";
import { filterReducer } from "./filter/filterSlice";

export const store = configureStore({
  reducer: {
    apartments: apartmentReducer,
    filter: filterReducer,
    [apartmentApi.reducerPath]: apartmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apartmentApi.middleware),
});
