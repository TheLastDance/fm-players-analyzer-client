import { RowData, ITranslationPairs } from "../types";
import { attributes } from "../data/attributes";
import * as cheerio from 'cheerio';
import changeObjectPairs from "./changeObjectPairs";


function htmlToData(htmlFile: string, lang: keyof typeof attributes = 'en') {
  const $ = cheerio.load(htmlFile);

  // Find the table using a selector
  const table = $('table');
  const language: ITranslationPairs = changeObjectPairs(attributes[lang]);

  // Extract headers from the first row (assuming they are in <th> elements)
  const headers: string[] = [];
  table.find('tr:first-child th').each((i, header) => {
    headers.push($(header).text().trim());
  });

  // Array to store objects
  const tableData: RowData[] = [];

  // Iterate through each row starting from the second row
  table.find('tr:gt(0)').each((i, row) => {
    const rowData = {} as RowData;
    rowData.attributes = {} as RowData['attributes'];

    // Iterate through each cell and map to corresponding header
    $(row).find('td').each((j, cell) => {
      const cellText = $(cell).text().trim();
      const header = headers[j];

      if (language.hasOwnProperty(headers[j])) {
        // hardcode for identical keys from table to divide them
        if ((headers[j] === 'Nat' && cellText.length === 0 || headers[j] === 'Nat' && cellText.length === 3)) {
          rowData.Nationality = cellText;
        } else {
          const key = language[header as keyof ITranslationPairs] as keyof ITranslationPairs;
          rowData.attributes[key] = Number(cellText);
        }
      } else {
        rowData[header] = cellText;
      }
    });

    tableData.push(rowData);
  });

  return tableData;
}

export default htmlToData;