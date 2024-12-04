import { configureStore } from "@reduxjs/toolkit";
import { setLS } from "../tools/localStorage.tool";

import authReducer from "./slices/auth.slice";

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  setLS("auth", state.auth);
  return result;
};

export default configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
