import verifyToken from "../utils/tokenAuth.js";
import { createStory, getStory } from "../controllers/story.js";

import express from "express";
const router = express.Router();
//create a post
router.post("/", verifyToken, createStory);
//get history
router.get("/", verifyToken, getStory);

export default router;
