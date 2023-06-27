import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Table from "../Table";
import LogBar from "../LogBar";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { addButton, card, wrapperTables } from "./style.css";
import { useEffect, useState } from "react";
import AddInput from "../AddInput";
import { getNextId } from "../../utils";
import { addTable } from "../../store/tableSlice";
import { useDispatch } from "react-redux";
import { addLog } from "../../store/logSlice";
import { changeTable } from "../../store/taskSlice";

function Kanban({ id }) {
  const [addTableVar, setAddTable] = useState(false);
  const board = useSelector((state: RootState) => state.boardSlice.boards).find(
    (b) => b.id === id
  );
  const logs = useSelector((state: RootState) => state.logSlice.logs);
  const tables = useSelector(
    (state: RootState) => state.tableSlice.tables
  ).filter((table) => table.board_id === id);
  const dispatch = useDispatch();

  const [characters, updateCharacters] = useState(tables);
  useEffect(()=>{
    updateCharacters(tables)
  },[tables.length])

  function handleOnDragEnd(result:any) {
    console.log(result)
    if(result.type === "COLUMN"){
        let newArr = [...characters];
        const [elem] = newArr.splice(result.source.index ,1)
        newArr.splice(result.destination.index, 0, elem)
        updateCharacters(newArr)

        
    }else{
        const to = result.destination.droppableId.split("-");
        const from = result.source.droppableId.split("-")
        console.log(to)
        if( to[1] !== from[1]){
            dispatch(changeTable({id: +result.draggableId.split("-")[1], table_id: +to[1]}))
        }
    }
  }

  function openAddTable(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setAddTable(true);
  }

  function addTableHandler(title: string) {
    dispatch(addTable({ id: getNextId(tables), board_id: id, title }));
    dispatch(
      addLog({
        id: getNextId(logs),
        board_id: id,
        title: `Добавлена таблица ${title}`,
      })
    );
  }

  function hideAddTable() {
    setAddTable(false);
  }



  return (
    <div onClick={hideAddTable}>
    
      {id ? ( 
      <>
      <LogBar board={board}/>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="COLUMN">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={wrapperTables}
              >
                {characters.map((table, i) => (
                  <Table table={table} index={i}/>
                ))}

                {addTableVar ? (
                  <div className={card} onClick={(e) => e.stopPropagation()}>
                    <AddInput
                      setterClose={setAddTable}
                      table
                      add={addTableHandler}
                    />
                  </div>
                ) : (
                  <div className={addButton} onClick={openAddTable}>
                    <p>+ Добавьте ещё одну колонку</p>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </> 
      ) : (
        <div>
          <p>Создайте свою первую доску! :)</p>
        </div>
      )}
    </div>
  );
}

export default Kanban;
