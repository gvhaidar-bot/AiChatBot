import express from "express";
import { getChatHistory } from "../controllers/chatController.js";
import { auth } from "../middlewares/auth.js";

const chatRouter = express.Router();
chatRouter.get("/history", auth, getChatHistory);

export default chatRouter;
