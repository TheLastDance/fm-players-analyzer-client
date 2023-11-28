import express, { Express } from 'express';
import cors from 'cors';
import multer from 'multer';
import htmlToData from './utils/parseHtmlToData';
import calculateSkill from './utils/calculateSkill';
import { positions } from './data/positions';
import calculateCoef from './utils/calculateCoef';

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
      const parsed = htmlToData(htmlString);
      //const a = performance.now();

      if (parsed.some(item => !Object.keys(item.attributes).length)) {
        res.status(500).json({ error: 'Use your language' });
      } else {
        const coefData = calculateCoef(positions);
        //const data = calculateSkill(coefData, parsed);
        const tableData = parsed.map(item => ({ ...item, skills: calculateSkill(coefData, item.attributes) }));
        // const tableData = parsed.map(item => ({
        //   ...item, skills: {
        //     ST: calculateSkill(coefData, item.attributes, 'ST'),
        //     CD: calculateSkill(coefData, item.attributes, 'CD'),
        //     GK: calculateSkill(coefData, item.attributes, 'GK'),
        //     DM: calculateSkill(coefData, item.attributes, 'DM'),
        //     RM: calculateSkill(coefData, item.attributes, 'RM'),
        //     LM: calculateSkill(coefData, item.attributes, 'LM'),
        //     CM: calculateSkill(coefData, item.attributes, 'ST'),
        //   }
        // }));
        //console.log(performance.now() - a);
        res.status(200).json(tableData);
      }
    }
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log("Server runs on port " + PORT)
});
