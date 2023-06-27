import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Board {
  id: number;
  title: string;
}

export interface BoardState {
  boards: Array<Board>;
}

const initialState: BoardState = {
  boards: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards = [...state.boards, action.payload];
    },
    deleteBoard: (state, action: PayloadAction<number>) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );
    },
    editBoard: (state, action: PayloadAction<Board>) => {
      const board = action.payload;
      state.boards = state.boards.map((boardState) =>
        boardState.id === board.id ? board : boardState
      );
    },
  },
});

export const { addBoard, editBoard, deleteBoard } = boardSlice.actions;

export default boardSlice.reducer;
