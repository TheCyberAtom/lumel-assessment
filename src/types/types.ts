export interface Row {
  id: string;
  label: string;
  value: number;
  children?: Row[];
  originalValue?: number;
}

export interface TableData {
  rows: Row[];
}