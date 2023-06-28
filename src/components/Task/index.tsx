import { Draggable } from "react-beautiful-dnd";
import { deleteTask, editTask } from "../../store/newBoardSlice";
import { taskWrapper } from "./style.css";
import { buttonsWraper, helperButton } from "../Sidebar/style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal";
import { Task } from "../../utils";

interface ITaskProps {
  task: Task;
  table_id: number;
  index: number;
}

function TaskComponent({ task, table_id, index }: ITaskProps) {
  const [editTitle, setEditTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(task.title);
  const [editDesc, seteditDesc] = useState(false);
  const dispatch = useDispatch();

  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    setTitleInput(e.target.value);
  }

  function handleDelete(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    dispatch(deleteTask({ id: task.id, table_id }));
  }

  function handleEditStart(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setEditTitle(true);
  }

  function handleEditSubmit(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    dispatch(editTask({ table_id, task: { ...task, title: titleInput } }));
    setEditTitle(false);
  }

  function handleEditCancel(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setTitleInput(task.title);
    setEditTitle(false);
  }

  function handleAddDescription() {
    seteditDesc(true);
  }

  return (
    <div>
      <Draggable draggableId={`task-${task.id}`} key={task.id} index={index}>
        {(provided: any) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className={taskWrapper} onClick={handleAddDescription}>
              {editTitle ? (
                <>
                  <input
                    type="text"
                    value={titleInput}
                    onInput={handleInput}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button onClick={handleEditSubmit}>Сохранить</button>
                  <button onClick={handleEditCancel}>x</button>
                </>
              ) : (
                <>
                  {" "}
                  <p>{task.title}</p>
                  <div className={buttonsWraper}>
                    <p className={helperButton} onClick={handleEditStart}>
                      ред.
                    </p>
                    <p className={helperButton} onClick={handleDelete}>
                      x
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Draggable>
      {editDesc && (
        <Modal
          task={task}
          close={() => seteditDesc(false)}
          table_id={table_id}
        />
      )}
    </div>
  );
}

export default TaskComponent;
