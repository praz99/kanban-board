import { ReactNode } from "react";

import { useDroppable } from "@dnd-kit/core";

// import { MdAddCircle } from "react-icons/md";

type ColumnType = {
  id: string;
  title: string;
  children: ReactNode;
};

const Column = ({ id, title, children }: ColumnType) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-2 w-full h-full border border-gray-400 p-2 rounded-t-md ${
        isOver ? "bg-slate-200" : "bg-slate-300"
      }`}
    >
      <p className="text-center text-sm font-bold">{title}</p>
      <div className="flex flex-col gap-2">{children}</div>
      {/* <button className="self-center" tabIndex={1} onClick={() => {}}>
        <MdAddCircle size={20} />
      </button> */}
    </div>
  );
};

export default Column;
