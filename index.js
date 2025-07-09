import express from "express";
import cors from "cors";
import { ENV_VARS } from "./config/envConfig.js";
import {
  getStarships,
  getStarshipById,
} from "./controllers/starships.controller.js";

const app = express();
const PORT = ENV_VARS.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/starships", getStarships);
app.get("/api/starships/:id", getStarshipById);
app.get("/health", (req, res) => res.sendStatus(200));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
