import { createSlice } from "@reduxjs/toolkit";

const moduleSlice = createSlice({
  name: "module",
  initialState: {
    module: null,
  },
  reducers: {
    selectModule(state, action) {
      state.module = action.payload;
    },
  },
});

const moduleReducer = moduleSlice.reducer;
const moduleActions = moduleSlice.actions;
export { moduleReducer, moduleActions };
