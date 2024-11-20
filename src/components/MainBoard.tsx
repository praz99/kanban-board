import { useState, useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "./Column";
import DraggableItem from "./DraggableItem";
import { columnsData } from "../data";
import { ColumnsData } from "../types";

// Storage key for localStorage
const STORAGE_KEY = "kanban-board-columns";

const MainBoard = () => {
  const [columns, setColumns] = useState<ColumnsData>(() => {
    const savedColumns = localStorage.getItem(STORAGE_KEY);
    return savedColumns ? JSON.parse(savedColumns) : columnsData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const sourceColumn = columns.find((col) =>
      col.items.some((item) => item.id === activeId)
    );

    const destinationColumn = columns.find((col) => col.id === overId);

    if (!sourceColumn || !destinationColumn) return;

    const draggedItem = sourceColumn.items.find((item) => item.id === activeId);
    if (!draggedItem) return;

    setColumns((prevColumns) => {
      return prevColumns.map((col) => {
        // If source and destination are the same column, don't modify the items
        if (
          sourceColumn.id === destinationColumn.id &&
          col.id === sourceColumn.id
        ) {
          return col;
        }

        // Remove item from source column
        if (col.id === sourceColumn.id) {
          return {
            ...col,
            items: col.items.filter((item) => item.id !== activeId),
          };
        }

        // Add item to destination column
        if (col.id === destinationColumn.id) {
          return {
            ...col,
            items: [...col.items, draggedItem],
          };
        }

        return col;
      });
    });
  };

  // Add a reset function in case you need to clear the saved state
  const handleReset = () => {
    setColumns(columnsData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-2 h-dvh mt-4 px-4">
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={`Column ${column.id}`}
            >
              {column.items.map((item) => (
                <DraggableItem key={item.id} id={item.id}>
                  <p className="font-semibold text-sm">{item.title}</p>
                </DraggableItem>
              ))}
            </Column>
          ))}
        </div>
      </DndContext>

      {/* Optional: Add a reset button */}
      <button
        onClick={handleReset}
        className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Reset Board
      </button>
    </>
  );
};

export default MainBoard;
