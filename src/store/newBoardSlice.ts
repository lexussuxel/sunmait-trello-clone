

export interface Task {
    id: number;
    title: string;
    description?: string;
    table_id: number;
  }

  export interface Table {
    id: number;
    title: string;
    board_id: number;
  }

export interface Log {
    board_id: number;
    id: number;
    title: string;
}

export interface Board {
    id: number;
    title: string;
  }
  
