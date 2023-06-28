import { useState } from "react";
import { headerWrapper, logBarWrapper, logWrapper, title } from "./style.css";
import { Board } from "../../utils";

interface ILogBar {
  board: Board;
}

function LogBar({ board }: ILogBar) {
  const [opened, setOpened] = useState(false);
  const logs = board.logs;

  function openLogs() {
    setOpened(true);
  }

  function closeLogs() {
    setOpened(false);
  }
  return (
    <>
      <div className={headerWrapper}>
        <p className={title}>{board.title}</p>
        <p onClick={openLogs} className={title}>
          Logs
        </p>
      </div>
      <div className={logBarWrapper[opened ? "primary" : "disabled"]}>
        <p>История действий:</p>
        <button onClick={closeLogs}>закрыть</button>
        {logs.map((log) => (
          <div className={logWrapper}>{log.title}</div>
        ))}
      </div>
    </>
  );
}

export default LogBar;
