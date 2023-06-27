import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  title: string;
  description?: string;
  table_id: number;
}

export interface TaskState {
  tasks: Array<Task>;
}

interface ChangeTableProps {
  table_id: number;
  id: number;
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      state.tasks = state.tasks.map((taskState) =>
        taskState.id === task.id ? task : taskState
      );
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    cascadeDeleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(
        (task) => task.table_id !== action.payload
      );
    },
    changeTable: (state, action: PayloadAction<ChangeTableProps>) => {
      const props = action.payload;
      console.log(props)
      state.tasks = state.tasks.map(
        (task) => task.id === props.id? {...task, table_id: props.table_id} :task
      );
    },
  },
});

export const { addTask, editTask, cascadeDeleteTask, deleteTask, changeTable } =
  taskSlice.actions;

export default taskSlice.reducer;
