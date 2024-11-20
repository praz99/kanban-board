import { ReactNode } from "react";

import { useDroppable } from "@dnd-kit/core";

type DroppableType = {
  id: string;
  title: string;
  children: ReactNode;
};

const Droppable = ({ id, title, children }: DroppableType) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full h-full border border-gray-400 p-2 rounded-t-md ${
        isOver ? "bg-slate-200" : "bg-slate-300"
      }`}
    >
      <p className="text-center text-sm font-bold">{title}</p>
      <div className="flex flex-col mt-2">{children}</div>
    </div>
  );
};

export default Droppable;
