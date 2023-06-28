import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  Board,
  Table,
  Log,
  ITaskDelete,
  IEditBoard,
  ITableOrder,
  ITaskOrder,
  ITaskPayload,
} from "../utils";

interface BoardState {
  boards: Array<Board>;
  selected?: Board;
}

const initialState: BoardState = {
  boards: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    selectBoard: (state, action: PayloadAction<number>) => {
      if (state.selected) {
        state.boards = [
          ...state.boards.map((board) =>
            board.id === state.selected?.id ? state.selected : board
          ),
        ];
      }
      state.selected = state.boards.find(
        (board) => board.id === action.payload
      );
    },

    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards = [...state.boards, action.payload];
    },

    addTable: (state, action: PayloadAction<Table>) => {
      if (state.selected) {
        state.selected = {
          ...state.selected,
          tables: [...state.selected.tables, action.payload],
        };
      }
    },

    addTask: (state, action: PayloadAction<ITaskPayload>) => {
      if (state.selected) {
        const changedTables = state.selected.tables.map((table) => {
          if (table.id === action.payload.table_id)
            return { ...table, tasks: [...table.tasks, action.payload.task] };
          return table;
        });

        state.selected = { ...state.selected, tables: [...changedTables] };
      }
    },

    editBoard: (state, action: PayloadAction<IEditBoard>) => {
      const changedBoards = state.boards.map((board) =>
        board.id === action.payload.id
          ? { ...board, title: action.payload.title }
          : board
      );
      if (state.selected && state.selected.id === action.payload.id) {
        state.selected = { ...state.selected, title: action.payload.title };
      }
      state.boards = [...changedBoards];
    },

    editTable: (state, action: PayloadAction<Table>) => {
      if (state.selected) {
        const newTables = state.selected.tables.map((table) => {
          if (action.payload.id === table.id) return action.payload;
          return table;
        });
        state.selected = { ...state.selected, tables: [...newTables] };
      }
    },

    editTask: (state, action: PayloadAction<ITaskPayload>) => {
      if (state.selected) {
        const changedTables = state.selected.tables.map((table) => {
          if (table.id === action.payload.table_id) {
            return {
              ...table,
              tasks: table.tasks.map((task) =>
                task.id === action.payload.task.id ? action.payload.task : task
              ),
            };
          }
          return table;
        });
        state.selected = { ...state.selected, tables: [...changedTables] };
      }
    },

    deleteBoard: (state, action: PayloadAction<number>) => {
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload
      );
      if (state.selected && state.selected.id === action.payload) {
        state.selected = undefined;
      }
    },

    deleteTable: (state, action: PayloadAction<number>) => {
      if (state.selected) {
        const newTables = state.selected.tables.filter(
          (table) => table.id !== action.payload
        );
        state.selected = { ...state.selected, tables: [...newTables] };
      }
    },

    deleteTask: (state, action: PayloadAction<ITaskDelete>) => {
      if (state.selected) {
        const newTables = state.selected.tables.map((table) => {
          if (table.id === action.payload.table_id) {
            return {
              ...table,
              tasks: [
                ...table.tasks.filter((task) => task.id !== action.payload.id),
              ],
            };
          }
          return table;
        });
        state.selected = { ...state.selected, tables: [...newTables] };
      }
    },

    addLog: (state, action: PayloadAction<Log>) => {
      if (state.selected)
        state.selected = {
          ...state.selected,
          logs: [...state.selected.logs, action.payload],
        };
    },

    changeTableOrder: (state, action: PayloadAction<ITableOrder>) => {
      if (state.selected) {
        const newArr = [...state.selected.tables];
        const [elem] = newArr.splice(action.payload.from, 1);

        newArr.splice(action.payload.to, 0, elem);

        state.selected.tables = [...newArr];
        state.selected.logs = [
          ...state.selected.logs,
          {
            id: elem.id + 1,
            title: `Таблица ${elem.title} была перемещена на ${
              action.payload.to + 1
            } позицию`,
          },
        ];
      }
    },

    changeTaskOrder: (state, action: PayloadAction<ITaskOrder>) => {
      if (state.selected) {
        const newArr = [...state.selected.tables];
        const [elem] = newArr[action.payload.from_table].tasks.splice(
          action.payload.from,
          1
        );

        newArr[action.payload.to_table].tasks.splice(
          action.payload.to,
          0,
          elem
        );

        if (action.payload.from_table !== action.payload.to_table)
          state.selected.logs = [
            ...state.selected.logs,
            {
              id: elem.id + 1,
              title: `Карточка ${elem.title} была перемещена из таблицы ${
                newArr[action.payload.from_table].title
              } в ${newArr[action.payload.to_table].title}`,
            },
          ];

        state.selected.tables = [...newArr];
      }
    },
  },
});

export const {
  addBoard,
  editBoard,
  deleteBoard,
  addTable,
  addTask,
  editTable,
  editTask,
  addLog,
  selectBoard,
  deleteTable,
  deleteTask,
  changeTableOrder,
  changeTaskOrder,
} = boardSlice.actions;

export default boardSlice.reducer;
