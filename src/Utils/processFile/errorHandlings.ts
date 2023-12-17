import { RowData } from "../../types";

const maxPlayers = 26000;
const attributesLength = 47;

const errorThrow = (errorMessage: string) => {
  throw new Error(errorMessage);
}

export const tableValidation = (table: HTMLTableElement | null) => {
  if (!table) return errorThrow("Your html file should have a table of players.");
  const playersLength = table.querySelectorAll('tr:not(:first-child)').length;
  if (playersLength > maxPlayers) errorThrow(`Your file must have less than ${maxPlayers} players.`);
  if (playersLength === 0) errorThrow(`Your file doesn't include any player at all. You should tick footballers before create an html file.`);
}

export const fileValidation = () => errorThrow("Upload html format file please.");

export const languageAndAttributesValidation = (tableData: RowData[]) => {
  if (!tableData.length || Object.keys(tableData[0].attributes).length < attributesLength) errorThrow(`Use your language or check if your html file includes all ${attributesLength} attributes.`)
}

export const fileSizeValidation = () => {

}