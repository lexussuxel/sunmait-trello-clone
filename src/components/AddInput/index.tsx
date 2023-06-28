import { useState } from "react";
import { inline } from "./style.css";

interface IAddInput {
  setterClose: React.Dispatch<React.SetStateAction<boolean>>;
  add: (arg0: string) => void;
  table?: boolean;
}

function AddInput({ setterClose, add, table }: IAddInput) {
  const [titleText, setTitleText] = useState("");

  function addHandler() {
    add(titleText);
    setterClose(false);
  }

  function close() {
    setterClose(false);
  }

  function inputHandler(e: KeyboardEvent<HTMLInputElement>) {
    setTitleText(e.target.value);
  }

  return (
    <>
      <input
        type="text"
        value={titleText}
        onInput={inputHandler}
        placeholder={`Введите название ${table ? "колонки" : "карточки"}`}
      />
      <div className={inline}>
        <button onClick={addHandler}>
          Добавить {table ? "колонку" : "карточку"}
        </button>
        <p onClick={close}>x</p>
      </div>
    </>
  );
}

export default AddInput;
