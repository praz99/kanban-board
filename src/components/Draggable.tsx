import { ReactNode } from "react";
import { useDraggable } from "@dnd-kit/core";

type DraggableItemType = {
  id: string;
  children: ReactNode;
};

const DraggableItem = ({ id, children }: DraggableItemType) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      className={`bg-white border border-slate-100 w-full min-h-12 rounded-md`}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
