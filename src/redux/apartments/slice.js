import { createSlice } from "@reduxjs/toolkit";

const apartmentSlice = createSlice({
  name: "apartments",
  initialState: {
    apartments: [],
    amount: 0,
    isLoading: true,
  },
});

export const apartmentReducer = apartmentSlice.reducer;
