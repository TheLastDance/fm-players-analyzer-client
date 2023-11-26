import express, { Express } from 'express';
import cors from 'cors';
import multer from 'multer';
import htmlToData from './utils/parseHtmlToData';

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

      const tableData = htmlToData(htmlString);

      console.log('Received HTML content:', tableData);
      res.status(200).json(tableData);
    }
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log("Server runs on port " + PORT)
});
