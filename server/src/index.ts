import express, { Express } from 'express';
import cors from 'cors';

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/api', (req: any, res: any) => {
  res.json(req.body)
})

app.listen(PORT, () => {
  console.log("Server runs on port " + PORT)
});
