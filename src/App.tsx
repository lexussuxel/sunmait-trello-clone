import { useCallback, useState } from "react";
import Kanban from "./components/Kanban";
import Sidebar from "./components/Sidebar";
import "./global.css";

function App() {
  const [selected, setSel] = useState(0);
  const setSelected = useCallback(setSel, []);
  const [add, setA] = useState(false);
  const setAdd = useCallback(setA, []);
  function clickHandler(e: MouseEvent<HTMLDivElement>) {
    setAdd(false);
  }
  return (
    <div className="app-wrapper" onClick={clickHandler}>
      <Sidebar setSelected={setSelected} add={add} setAdd={setAdd} />
      <div className="content-wrapper">
        <Kanban id={selected} />
      </div>
    </div>
  );
}

export default App;
