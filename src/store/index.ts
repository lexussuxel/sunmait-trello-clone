import { configureStore } from "@reduxjs/toolkit";
import newBoardSlice from "./newBoardSlice";

export const store = configureStore({
  reducer: {
    newBoardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const storeDispatch = store.dispatch;
