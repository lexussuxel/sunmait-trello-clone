import { MouseEvent, useState, KeyboardEvent } from "react";
import {
  board_item,
  button,
  buttonsWraper,
  helperButton,
  title,
  tooltip,
  wrapper,
} from "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { addBoard, deleteBoard, editBoard } from "../../store/boardSlice";
import { getNextId } from "../../utils";
import { addLog, cascadeDeleteLog } from "../../store/logSlice";
import tableSlice, { deleteTable } from "../../store/tableSlice";
import { cascadeDeleteTask } from "../../store/taskSlice";

interface ISidebar {
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  add: boolean;
}

function Sidebar({ setSelected, add, setAdd }: ISidebar) {
  const boards = useSelector((state: RootState) => state.boardSlice.boards);
  const [titleText, setTitleText] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [edit, setEdit] = useState(-1);
  const logs = useSelector((state: RootState) => state.logSlice.logs);
  const selectorTables = useSelector(
    (state: RootState) => state.tableSlice.tables
  );
  const dispatch = useDispatch();

  function handleInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.target.value !== "" && e.target.value !== null) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setTitleText(e.target.value);
  }

  function handleTooltipClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function handlePlusClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setAdd(true);
  }

  function handleBoardAdd() {
    const board_id = getNextId(boards);
    dispatch(addBoard({ id: board_id, title: titleText }));
    dispatch(
      addLog({ id: getNextId(logs), board_id, title: "Создание этой доски" })
    );
    setTitleText("");
    setAdd(false);
    setSelected(board_id);
  }

  function handleBoardClick(id: number) {
    setSelected(id);
  }

  function handleDeleteBoard(e: MouseEvent<HTMLDivElement>, id: number) {
    e.stopPropagation();
    dispatch(deleteBoard(id));
    dispatch(cascadeDeleteLog(id));
    const tables = selectorTables.filter((table) => table.board_id === id);
    tables.forEach((table) => {
      dispatch(deleteTable(table.id));
      dispatch(cascadeDeleteTask(table.id));
    });
  }

  function handleEditSubmit(id: number) {
    dispatch(editBoard({ id, title: titleText }));
    setEdit(-1);
    setTitleText("");
  }

  function handleEditCancel() {
    setEdit(-1);
    setTitleText("");
  }

  function handleEditBoard(e: MouseEvent<HTMLDivElement>, id: number) {
    e.stopPropagation();
    setEdit(id);
    setTitleText(boards.find((board) => board.id === id)?.title || "");
  }

  return (
    <div className={wrapper}>
      <div className={title}>
        <p>Мои доски:</p>

        <button className={button} onClick={handlePlusClick}>
          +
        </button>

        <div
          className={tooltip[add ? "selected" : "hidden"]}
          onClick={handleTooltipClick}
        >
          <label>Введите название доски:</label>
          <input type="text" value={titleText} onInput={handleInput} />
          <button onClick={handleBoardAdd} disabled={disabled}>
            Добавить
          </button>
        </div>
      </div>
      {boards.map((board) =>
        edit == board.id ? (
          <div>
            <input value={titleText} onInput={handleInput} />
            <button onClick={() => handleEditSubmit(board.id)}>
              сохранить
            </button>
            <button onClick={handleEditCancel}>x</button>
          </div>
        ) : (
          <a
            className={board_item}
            key={board.id}
            onClick={() => handleBoardClick(board.id)}
          >
            <p>{board.title}</p>
            <div className={buttonsWraper}>
              <p
                className={helperButton}
                onClick={(e) => handleEditBoard(e, board.id)}
              >
                ред.
              </p>
              <p
                onClick={(e) => handleDeleteBoard(e, board.id)}
                className={helperButton}
              >
                x
              </p>
            </div>
          </a>
        )
      )}
    </div>
  );
}

export default Sidebar;
