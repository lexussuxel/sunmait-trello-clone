import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "../Task";
import { card } from "../Kanban/style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Table, deleteTable, editTable } from "../../store/tableSlice";
import { useState } from "react";
import AddInput from "../AddInput";
import { useDispatch } from "react-redux";
import { addTask, cascadeDeleteTask } from "../../store/taskSlice";
import { getNextId } from "../../utils";
import { addLog } from "../../store/logSlice";
import { addButton, tableWrapper, title } from "./style.css";
import { buttonsWraper, helperButton } from "../Sidebar/style.css";

interface ITableProps {
  table: Table;
  index: number;
}

function TableComponent({ table, index }: ITableProps) {
  const allTasks = useSelector((state: RootState) => state.taskSlice.tasks);
  const tasks = allTasks.filter((task) => task.table_id === table.id);
  const logs = useSelector((state: RootState) => state.logSlice.logs);
  const [addTaskState, setAddTask] = useState(false);
  const [edit, setEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState("");
  const dispatch = useDispatch();
    console.log(allTasks)
  function add(title: string) {
    dispatch(addTask({ id: getNextId(allTasks), table_id: table.id, title }));
    dispatch(
      addLog({
        id: getNextId(logs),
        board_id: table.board_id,
        title: `Добавлена карточка ${title} в колонку ${table.title}`,
      })
    );
  }

  function handleAddClick() {
    setAddTask(true);
  }

  function handleDeleteTable(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    dispatch(deleteTable(table.id));
    dispatch(addLog({id: getNextId(logs), title: `Удалена таблица ${table.title}`, board_id: table.board_id}))
    dispatch(cascadeDeleteTask(table.id));
  }

  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    setTitleEdit(e.target.value);
  }

  function handleEditSubmit() {
    dispatch(editTable({ ...table, title: titleEdit }));
    setTitleEdit("");
    setEdit(false);
  }

  function handleEditCancel() {
    setTitleEdit("");
    setEdit(false);
  }

  function startEdit() {
    setTitleEdit(table.title);
    setEdit(true);
  }

  return (
    <Draggable
      draggableId={`table-${table.id}`}
      key={table.id}
      index={index}
    >
      {(provided: any) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={card}
        >
          <div className={title}>
            {edit ? (
              <>
                <input type="text" value={titleEdit} onInput={handleInput} />
                <div>
                  <button onClick={handleEditSubmit}>Сохранить</button>
                  <button onClick={handleEditCancel}>x</button>
                </div>
              </>
            ) : (
              <>
                <p>{table.title}</p>
                <div className={buttonsWraper}>
                  <p className={helperButton} onClick={startEdit}>
                    ред.
                  </p>
                  <p onClick={handleDeleteTable} className={helperButton}>
                    x
                  </p>
                </div>
              </>
            )}
          </div>
          <Droppable droppableId={`tables-${table.id}`}>
            {(provided: any) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={tableWrapper}>
                {tasks.map((task) => (
                  <Task task={task} />
                ))}
                {addTaskState ? (
                  <AddInput setterClose={setAddTask} add={add} />
                ) : (
                  <button onClick={handleAddClick} className={addButton}>
                    + Добавить карточку
                  </button>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default TableComponent;
