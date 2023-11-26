export type Attribute = {
  [innerKey: string]: number;
};

export type RowData = {
  attributes: Attribute;
} & {
  [key: string]: string | number;
};