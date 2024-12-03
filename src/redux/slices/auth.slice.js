import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  tokens: { accessToken: "", refreshToken: "" },
  user: null,
  redirect: "/",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
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
    logout: (state) => {
      state.isLoggedIn = false;
      state.tokens.accessToken = "";
      state.tokens.refreshToken = "";
      state.user = null;
    },
  },
});

export const { setIsLogin, setTokens, setUser, setAccessToken, logout } =
  authSlice.actions;
export default authSlice.reducer;
