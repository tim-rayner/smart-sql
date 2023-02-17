export type Table = {
  id?: number;
  name: string;
  description?: string;
  columns: Column[];
};

//column type
export type Column = {
  id?: number;
  name: string;
  type?: string;
  isEditing: boolean;
  description?: string;
  isNullable?: boolean;
  isPrimaryKey?: boolean;
  isUnique?: boolean;
  isAutoIncrement?: boolean;
  isForeignKey?: boolean;
};
