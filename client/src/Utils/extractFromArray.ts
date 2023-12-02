import { RowData } from "../types";

export const extractFromArray = (item: RowData) => {
  // eslint-disable-next-line
  const { attributes, skills, ...rest } = item;
  return { ...skills, ...rest }
};