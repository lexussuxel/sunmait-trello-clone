import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Table {
  id: number;
  title: string;
  board_id: number;
}

export interface TableState {
  tables: Array<Table>;
}

const initialState: TableState = {
  tables: [{ id: 1, board_id: 1, title: "iojdweoif" }],
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables = [...state.tables, action.payload];
    },
    editTable: (state, action: PayloadAction<Table>) => {
      const table = action.payload;
      state.tables = state.tables.map((tableState) =>
        tableState.id === table.id ? table : tableState
      );
    },
    deleteTable: (state, action: PayloadAction<number>) => {
      state.tables = state.tables.filter(
        (table) => table.id !== action.payload
      );
    },
  },
});

export const { addTable, editTable, deleteTable } = tableSlice.actions;

export default tableSlice.reducer;
