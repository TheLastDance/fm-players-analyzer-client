import { RowData } from "../types";
import { attributes } from "../data/attributes";
import * as cheerio from 'cheerio';

function htmlToData(htmlFile: string, lang: keyof typeof attributes = 'en') {

  // Load the HTML into Cheerio
  const $ = cheerio.load(htmlFile);

  // Find the table using a selector
  const table = $('table');

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
    rowData.attributes = {};

    // Iterate through each cell and map to corresponding header
    $(row).find('td').each((j, cell) => {
      const cellText = $(cell).text().trim();
      const header = headers[j];

      if (attributes[lang].hasOwnProperty(headers[j])) {
        // hardcode for identical keys from table to divide them
        if ((headers[j] === 'Nat' && cellText.length === 0 || headers[j] === 'Nat' && cellText.length === 3)) {
          rowData.Nationality = cellText;
        } else {
          rowData.attributes[header] = Number(cellText);
        }
      } else {
        rowData[header] = cellText;
      }
    });

    // Push the object to the array
    tableData.push(rowData);
  })

  return tableData;
}

export default htmlToData;