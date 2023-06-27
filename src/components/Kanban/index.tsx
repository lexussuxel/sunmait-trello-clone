import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Table from "../Table";
import LogBar from "../LogBar";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { addButton, card, messageWrapper, wrapperKanban, wrapperTables } from "./style.css";
import { useState } from "react";
import AddInput from "../AddInput";
import {
  addTable,
  addLog,
  changeTableOrder,
  changeTaskOrder,
} from "../../store/newBoardSlice";
import { useDispatch } from "react-redux";

function Kanban() {
  const [addTableVar, setAddTable] = useState(false);
  const board = useSelector((state: RootState) => state.newBoardSlice.selected);
  const tables = useSelector(
    (state: RootState) => state.newBoardSlice.selected?.tables
  );
  const dispatch = useDispatch();

  function handleOnDragEnd(result: any) {
    if (result.type === "COLUMN") {
      dispatch(
        changeTableOrder({
          from: +result.source.index,
          to: +result.destination.index,
        })
      );
    } else {
      const to_table = +result.destination.droppableId.split("-")[1];
      const from_table = +result.source.droppableId.split("-")[1];
      dispatch(
        changeTaskOrder({
          to_table,
          from_table,
          from: +result.source.index,
          to: +result.destination.index,
        })
      );
    }
  }

  function openAddTable(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    setAddTable(true);
  }

  function addTableHandler(title: string) {
    dispatch(addTable({ id: Date.now(), title, tasks: [] }));
    dispatch(
      addLog({
        id: Date.now(),
        title: `Добавлена таблица ${title}`,
      })
    );
  }

  function hideAddTable() {
    setAddTable(false);
  }

  return (
    <div onClick={hideAddTable} className={wrapperKanban}>
      {board ? (
        <>
          <LogBar board={board} />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="COLUMN">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={wrapperTables}
                >
                  {tables?.map((table, i) => (
                    <Table table={table} index={i} />
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
        <div className={messageWrapper}>
          <p>Выберите или создайте свою первую доску! :)</p>
        </div>
      )}
    </div>
  );
}

export default Kanban;
