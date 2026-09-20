import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "GEMINI_API_KEY",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateAi = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, mode } = req.body();
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
          limit_reaced: true,
        });
      }

      if (mode === "image") {
        return res.status(403).json({ success: false, message: "image is required premium plan" });
      }
    }

    let result;
    if (mode == "text") {
    }
  } catch (error) {}
};
