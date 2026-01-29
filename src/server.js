import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import healthAPI from "./api/healthAPI.js";
import videosAPI from "./api/videosAPI.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/health", healthAPI);
app.use("/api/videos", videosAPI);

app.use((req, res) => {
  res.status(404).json({ Error: "Route Not Found" });
});

export default app;
