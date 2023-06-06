import { configureStore } from "@reduxjs/toolkit";
import { apartmentReducer } from "./apartments/slice";
import { apartmentApi } from "./apartments/api";
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
