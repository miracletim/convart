import express from "express";

import { getMostPopular } from "../controllers/youtubeController.js";

const router = express.Router();

router.post("/mostPopular", getMostPopular);

export default router;
