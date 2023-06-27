import { useState } from "react";
import { Task, editTask } from "../../store/taskSlice";
import { modalBackground, modalWrapper } from "./style.css";
import { useDispatch } from "react-redux";

interface IModal{
    close: ()=>void;
    task: Task
}

function Modal({close, task}:IModal){
    const [description, setDescription] = useState(task.description)
    const dispatch = useDispatch();

    function handleInput(e:KeyboardEvent<HTMLInputElement>){
        setDescription(e.target.value)
    }

    function handleEditSubmit(){
        dispatch(editTask({...task, description}))
        close();
    }
    return(
        <div className={modalBackground}>
            <div className={modalWrapper}>
            <label>Описание:</label>
            <input type='text' value={description} onInput={handleInput}/>
            <button onClick={handleEditSubmit}>Сохранить</button>
            <button onClick={close}>Закрыть</button>
            </div>
        </div>
    )
}

export default Modal