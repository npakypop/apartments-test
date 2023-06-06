import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filter: { rooms: "", price: "" },
    isLoading: false,
  },
  reducers: {
    filterApartments: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const { filterApartments } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
