import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: []
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {

  },
  reducers: {},
  extraReducers: (builder) => {

  }
});

export const {} = templateSlice.actions;

export default templateSlice.reducer;
