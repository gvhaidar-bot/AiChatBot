import OpenAI from "openai";
import FormData from "form-data";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import sql from "../configs/db.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateAi = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, mode } = req.body;
    const { plan, free_usage } = req;

    // validation
    if (!prompt || !mode) {
      return res.status(400).json({ success: false, message: "promp and mode ar required" });
    }

    if (plan !== "premium") {
      if (free_usage >= 10) {
        return res.status(401).json({
          success: false,
          message: "Limit reach, upgrade to premium",
          limit_reached: true,
        });
      }

      if (mode === "image") {
        return res.status(403).json({ success: false, message: "image is required premium plan" });
      }
    }

    let result;
    if (mode == "text") {
      const response = await openai.chat.completions.create({
        model: "gemini-3.8-flash",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      result = response?.choices?.[0]?.message?.content;
    } else {
      const formData = new FormData();
      formData.append("prompt", prompt);
      const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
        headers: { "X-API-KEY": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer",
      });
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "ai_chat_images", public_id: `user_${userId}_${Date.now()}` }, (error, result) => (error ? reject(error) : resolve(result))).end(data);
      });

      // uploading buffer into cloudinary
      result = uploadResponse.secure_url;
    }

    // update usage database
    let new_usage = free_usage;
    if (plan !== "premium") {
      new_usage++;
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: new_usage },
      });
    }
    await sql`insert into messages(clerk_user_id, role, mode, content)
    values (${userId}, 'user', ${mode}, ${prompt}), 
           (${userId}, 'assistant', ${mode}, ${result})`;

    const warning = plan !== "premium" && new_usage >= 9 ? `${10 - new_usage} free message left` : null;

    return res.json({
      success: true,
      result,
      free_usage: new_usage,
      warning,
    });
  } catch (error) {
    console.error("AI is Error", error.response?.data || error.message);
    const status = error.status || error.response?.status || 500;
    const message = status === 429 ? "server busy" : "generator failed";

    res.status(status).json({ success: false, message });
  }
};
