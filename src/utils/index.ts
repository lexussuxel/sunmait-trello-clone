export interface ITaskPayload {
  table_id: number;
  task: Task;
}

export interface ITaskDelete {
  table_id: number;
  id: number;
}

export interface ITableOrder {
  from: number;
  to: number;
}

export interface IEditBoard {
  title: string;
  id: number;
}

export interface ITaskOrder {
  from_table: number;
  to_table: number;
  from: number;
  to: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
}

export interface Table {
  id: number;
  title: string;
  tasks: Array<Task>;
}

export interface Log {
  id: number;
  title: string;
}

export interface Board {
  id: number;
  title: string;
  logs: Array<Log>;
  tables: Array<Table>;
}
