import express from "express";

import { getMostPopular } from "../controllers/videosController.js";

const router = express.Router();

router.get("/top", getMostPopular);

export default router;
