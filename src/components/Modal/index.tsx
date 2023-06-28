import { useState } from "react";
import { editTask } from "../../store/newBoardSlice";
import { modalBackground, modalWrapper } from "./style.css";
import { useDispatch } from "react-redux";
import { Task } from "../../utils";

interface IModal {
  close: () => void;
  task: Task;
  table_id: number;
}

function Modal({ close, task, table_id }: IModal) {
  const [description, setDescription] = useState(task.description);
  const dispatch = useDispatch();

  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function handleEditSubmit() {
    dispatch(editTask({ task: { ...task, description }, table_id }));
    close();
  }
  
  return (
    <div className={modalBackground}>
      <div className={modalWrapper}>
        <label>Описание:</label>
        <input type="text" value={description} onInput={handleInput} />
        <button onClick={handleEditSubmit}>Сохранить</button>
        <button onClick={close}>Закрыть</button>
      </div>
    </div>
  );
}

export default Modal;
