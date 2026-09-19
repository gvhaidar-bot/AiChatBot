import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";

const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware);
app.get("/", (req, res) => {
  res.send("backend is running");
});

// handle route
app.use((err, req, res, next) => {
  if (err.message == "Unauthenticated") {
    return res.status(401).json({ message: "Aunthentication required" });
  }
  res.status(500).json({ message: "server error " });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server running in port", PORT);
});
