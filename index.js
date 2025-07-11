import express from "express";
import cors from "cors";
import { ENV_VARS, SERVER_ENVIRONMENT } from "./config/envConfig.js";
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
app.get("/", (req, res) => res.status(200).json({ message: "OK" }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
