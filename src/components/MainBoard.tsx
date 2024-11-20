import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { containers } from "../data";
import Column from "./Column";
import DraggableItem from "./Draggable";

const MainBoard = () => {
  const [parent, setParent] = useState(null);
  const draggableMarkup = <DraggableItem id="draggable">Drag me</DraggableItem>;

  function handleDragEnd(event) {
    const { over } = event;
    setParent(over ? over.id : null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}
      <div className="flex gap-2 h-dvh mt-4 px-4">
        {containers.map((id) => (
          <Column key={id} id={id} title={`Column ${id}`}>
            {parent === id ? draggableMarkup : null}
          </Column>
        ))}
      </div>
    </DndContext>
  );
};

export default MainBoard;
