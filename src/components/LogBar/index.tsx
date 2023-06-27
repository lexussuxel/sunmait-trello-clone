import { useState } from "react";
import { Board } from "../../store/boardSlice";
import { headerWrapper, logBarWrapper, logWrapper, title } from "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


interface ILogBar{
  board: Board
}

function LogBar({board}:ILogBar) {
  const [opened, setOpened] = useState(false)
  const logs = useSelector((state:RootState)=> state.logSlice.logs).filter((log)=> log.board_id === board.id)

  function openLogs(){
    setOpened(true)
  }

  function closeLogs(){
    setOpened(false)
  }
  return( 
    <> 
    <div className={headerWrapper}>
      <p className={title}>{board.title}</p>
      <p onClick={openLogs}>показать логи</p>
    </div>
    <div className={logBarWrapper[opened?"primary":"disabled"]}>
      <p>История действий:</p>
      <button onClick={closeLogs}>закрыть</button>
      {logs.map((log)=>(
        <div className={logWrapper}>{log.title}</div>
      ))}
    </div>
    </>
   
  )
}

export default LogBar;
