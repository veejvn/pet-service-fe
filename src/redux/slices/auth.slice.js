import { createSlice } from "@reduxjs/toolkit";
import { getLS } from "../../tools/localStorage.tool";

const authSlice = createSlice({
  name: "auth",
  initialState: getLS("auth", {
    isLoggedIn: false,
    tokens: { accessToken: "", refreshToken: "" },
    user: null,
    redirect: "/",
  }),
  reducers: {
    setIsLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setAccessToken: (state, action) => {
      state.tokens.accessToken = action.payload;
    },
    setTokens: (state, action) => {
      state.tokens.accessToken = action.payload.accessToken;
      state.tokens.refreshToken = action.payload.refreshToken;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRedirect: (state, action) => {
      state.redirect = action.payload;
    },
    logout: (state) => {
      state.tokens.accessToken = "";
      state.tokens.refreshToken = "";
      state.user = null;
    },
  },
});

export const { setIsLogin, setTokens, setUser, setAccessToken, setRedirect, logout } =
  authSlice.actions;
export default authSlice.reducer;
