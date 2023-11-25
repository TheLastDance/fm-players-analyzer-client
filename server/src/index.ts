import express, { Express } from 'express';
import cors from 'cors';
import multer from 'multer';
import * as cheerio from 'cheerio';

const attributes = [
  "Agg",
  "Ecc",
  "Fre",
  "Bra",
  "Acc",
  "Aer",
  "Cor",
  "Tec",
  "Pac",
  "Str",
  "Cmp",
  "Det",
  "Ref",
  "Wor",
  "Nat",
  "Dec",
  "Fir",
  "Pen",
  "Pas",
  "Tck",
  "Pun",
  "Mar",
  "1v1",
  "Cro",
  "Agi",
  "Ldr",
  "Bal",
  "Cnt",
  "Tea",
  "Ant",
  "Fla",
  "Han",
  "TRO",
  "Hea",
  "Cmd",
  "OtB",
  "Fin",
  "Dri",
  "Lon",
  "Jum",
  "Sta",
  "Pos",
  "Kic",
  "Vis",
  "Com",
  "Thr",
  "L Th"];

interface IrowData {
  attributes: {
    [key: string]: number | string;
  }
}

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

app.post('/api', upload.single('htmlFile'), (req, res) => {
  try {
    if (req.file) {
      const htmlBuffer = req.file.buffer;
      const htmlString = htmlBuffer.toString('utf-8');

      // Load the HTML into Cheerio
      const $ = cheerio.load(htmlString);

      // Find the table using a selector
      const table = $('table');

      // Extract headers from the first row (assuming they are in <th> elements)
      const headers: string[] = [];
      table.find('tr:first-child th').each((i, header) => {
        headers.push($(header).text().trim());
      });

      // Array to store objects
      const tableData: any = [];

      // Iterate through each row starting from the second row
      table.find('tr:gt(0)').each((i, row) => {
        const rowData: IrowData = { attributes: {} }
        rowData.attributes = {};

        // Iterate through each cell and map to corresponding header
        $(row).find('td').each((j, cell) => {
          const cellText = $(cell).text().trim();

          if (attributes.some(item => item === headers[j]) && cellText !== "") {
            const header = headers[j];
            rowData.attributes[header] = Number(cellText);
          } else {
            const header = headers[j];
            (rowData.attributes as { [key: string]: number | string })[header] = cellText;
          }
        });

        // Push the object to the array
        tableData.push(rowData);
      })

      // Process the HTML string as needed
      console.log('Received HTML content:', tableData);

      res.status(200).json(tableData);
    }
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// app.post('/api', (req: any, res: any) => {
//   res.json({
//     htmlContent: req.body
//   })
// })

app.listen(PORT, () => {
  console.log("Server runs on port " + PORT)
});
