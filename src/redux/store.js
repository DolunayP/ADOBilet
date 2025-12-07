import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import profileReducer from "./profileSlice";
export const store = configureStore({
  reducer: {
    data: dataSlice,
    profile: profileReducer,
  },
});
