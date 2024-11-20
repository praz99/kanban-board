export interface Item {
  id: string;
  title: string;
}

export interface Column {
  id: string;
  items: Item[];
}

export type ColumnsData = Column[];
