import { configureStore } from "@reduxjs/toolkit";
import avatarReducer from "./features/avatarSlice";

export const store = configureStore({
  reducer: {
    avatarReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
