import express from 'express'
import { generateJobDescription } from '../controllers/geminiAI.controller.js';
import isAuthenticated from '../middlewares/auth.middelware.js';
const router = express.Router();

router.post("/generate-description",isAuthenticated, generateJobDescription);
export default router;