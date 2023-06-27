import { useCallback, useState } from "react";
import Kanban from "./components/Kanban";
import Sidebar from "./components/Sidebar";
import "./global.css";

function App() {
  const [add, setA] = useState(false);
  const setAdd = useCallback(setA, []);
  function clickHandler(e: MouseEvent<HTMLDivElement>) {
    setAdd(false);
  }
  return (
    <div className="app-wrapper" onClick={clickHandler}>
      <Sidebar add={add} setAdd={setAdd} />
      <Kanban />
    </div>
  );
}

export default App;
