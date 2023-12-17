import { Language, RowData, TranslationPairs } from "../../types";
import { attributes } from "../../data/attributes";
import changeObjectPairs from "./../processFile/changeObjectPairs";
import { tableValidation, languageAndAttributesValidation } from "./errorHandlings";
import calculateCoef from "./calculateCoef";
import calculateSkill from "./calculateSkill";
import { positionsCoef } from "../../data/positions";

export const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

const pickTable = (htmlFile: string) => {
  // Parse HTML string into a DOM document
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlFile, 'text/html');

  // Find the table using a selector
  const table = doc.querySelector('table');

  return table;
}

export function htmlToData(htmlFile: string, lang: Language['lang']) {
  const language: TranslationPairs = changeObjectPairs(attributes[lang]);
  // Extract headers from the first row (assuming they are in <th> elements)
  const headers: string[] = [];
  const table = pickTable(htmlFile);

  tableValidation(table);

  if (table) {
    const headerCells = table.querySelectorAll('tr:first-child th');
    headerCells.forEach((header) => {
      if (header.textContent) headers.push(header.textContent.trim());
    });

    // Array to store objects
    const tableData: RowData[] = [];

    // Iterate through each row starting from the second row
    const rows = table.querySelectorAll('tr:not(:first-child)');

    rows.forEach((row) => {
      const rowData = {} as RowData;
      rowData.attributes = {} as RowData['attributes'];

      // Iterate through each cell and map to corresponding header
      const cells = row.querySelectorAll('td');
      cells.forEach((cell, j) => {
        const cellText = cell.textContent?.trim();
        const header = headers[j];

        if (Object.prototype.hasOwnProperty.call(language, header)) {
          // Hardcode for identical keys from the table to divide them
          if ((header === 'Nat' && (cellText?.length === 0 || cellText?.length === 3))) {
            rowData.Nationality = cellText;
          } else {
            const key = language[header as keyof TranslationPairs] as keyof TranslationPairs;
            rowData.attributes[key] = cellText as string;
          }
        } else {
          rowData[header] = cellText as string;
        }
      });

      tableData.push(rowData);
      if (tableData.length === 1) languageAndAttributesValidation(tableData);
    });

    return tableData;
  }
}

export const calculationAlgorithm = (serverPositions: any, newData: RowData[]) => {
  const coefData = calculateCoef({ ...positionsCoef, ...serverPositions });
  const tableData = newData.map(item => ({ ...item, skills: calculateSkill(coefData, item.attributes) }));
  return tableData.map(item => ({ ...item, skills: { Max: Math.max(...Object.values(item.skills)), ...item.skills } }))
}