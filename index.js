import express from 'express';
import cors from 'cors';
import { getStarships, getStarshipById } from './controllers/starships.controller.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/starships', getStarships);
app.get('/api/starships/:id', getStarshipById);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
