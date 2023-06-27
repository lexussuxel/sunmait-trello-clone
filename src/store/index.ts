import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./boardSlice";
import taskSlice from "./taskSlice";
import tableSlice from "./tableSlice";
import logSlice from "./logSlice";

export const store = configureStore({
  reducer: {
    taskSlice,
    tableSlice,
    logSlice,
    boardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const storeDispatch = store.dispatch;
