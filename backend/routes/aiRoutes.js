import express from "express";
import { generateAi } from "../controllers/aiController.js"; // ✅
import { auth } from "../middlewares/auth.js";

const aiRouter = express.Router();

aiRouter.post("/generate", auth, generateAi);

export default aiRouter;
