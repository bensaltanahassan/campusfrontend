import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userType: localStorage.getItem("userType")
      ? localStorage.getItem("userType")
      : null,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    isLogin: localStorage.getItem("isLogin") ? true : false,
    verificationType: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      state.isLogin = true;
      localStorage.setItem("isLogin", true);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("userType", action.payload.userType);
    },
    signUp(state, action) {
      state.verificationType = "signUp";
      if (action.payload.userType === "Teacher") {
        state.userType = "Teacher";
        localStorage.setItem("userType", "Teacher");
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user.teacher)
        );
        state.user = action.payload.user.teacher;
      } else {
        state.userType = "Student";
        localStorage.setItem("userType", "Student");
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user.student)
        );
        state.user = action.payload.user.student;
      }
    },
    logout(state) {
      state.user = null;
      state.userType = null;
      state.isLogin = false;
      localStorage.removeItem("isLogin");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
    },
    forgetPassword(state, action) {
      state.verificationType = "forgetPassword";
      state.userType = action.payload.userType;
      if (state.userType === "Teacher") {
        state.user = action.payload.user.teacher;
      } else {
        state.user = action.payload.user.student;
      }
    },
    updateUser(state, action) {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export { authActions, authReducer };
