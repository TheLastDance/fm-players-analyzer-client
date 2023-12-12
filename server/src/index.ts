import express, { Express } from 'express';
import cors from 'cors';
import multer from 'multer';
import htmlToData from './utils/parseHtmlToData';
import calculateSkill from './utils/calculateSkill';
import { positions } from './data/positions';
import calculateCoef from './utils/calculateCoef';

const app: Express = express();
const PORT: string | number = process.env.PORT || 3001;
const attributesLength = 47;
const maxFileSize = 2500000;

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

app.post('/api', upload.single('htmlFile'), (req, res) => {
  try {
    if (req.file) {
      const { lang, positionForServer } = req.body;
      const htmlBuffer = req.file.buffer;

      if (htmlBuffer.length > maxFileSize) return res.status(400).json({ error: 'File size should be less than 2.5mb' });

      const htmlString = htmlBuffer.toString('utf-8');
      const parsed = htmlToData(htmlString, lang);
      const pos = JSON.parse(positionForServer);

      if (!parsed.length || Object.keys(parsed[0].attributes).length < attributesLength) return res.status(400).json({ error: `Use your language or check if your html file includes all ${attributesLength} attributes` });

      //const a = performance.now();
      const coefData = calculateCoef({ ...positions, ...pos });
      const tableData = parsed.map(item => ({ ...item, skills: calculateSkill(coefData, item.attributes) }));
      const maxData = tableData.map(item => ({ ...item, skills: { Max: Math.max(...Object.values(item.skills)), ...item.skills } }))
      //console.log(performance.now() - a);
      res.status(200).json(maxData);
    }
  } catch (err) {
    res.status(500).json({ error: `Error: ${err}` });
  }
});


app.listen(PORT, () => {
  console.log("Server runs on port " + PORT)
});
