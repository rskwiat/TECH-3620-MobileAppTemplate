import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: []
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {

  },
  reducers: {},
  extraReducers: (builder) => {

  }
});

export const {} = recipesSlice.actions;

export default recipesSlice.reducer;
