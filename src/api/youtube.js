import express from "express";

import { getMostPopular } from "../controllers/youtubeController.js";

const router = express.Router();

router.get("/top", getMostPopular);

export default router;
