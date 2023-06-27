import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Log {
  board_id: number;
  id: number;
  title: string;
}

export interface LogState {
  logs: Array<Log>;
}

const initialState: LogState = {
  logs: [],
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<Log>) => {
      state.logs = [...state.logs, action.payload];
    },
    cascadeDeleteLog: (state, action: PayloadAction<number>) => {
      state.logs = state.logs.filter((log) => log.board_id !== action.payload);
    },
  },
});

export const { addLog, cascadeDeleteLog } = logSlice.actions;

export default logSlice.reducer;
