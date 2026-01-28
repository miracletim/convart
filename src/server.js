import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

import healthRoute from "./api/health.js";
import youtubeRoutes from "./api/youtube.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", healthRoute);
app.use("/api/youtube", youtubeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running`);
});
