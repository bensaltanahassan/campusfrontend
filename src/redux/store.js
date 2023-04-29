import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { moduleReducer } from "./slices/moduleSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    module: moduleReducer,
  },
});

export default store;
