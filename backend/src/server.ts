import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import resumeRoutes from "./routes/resume.routes";
import authRoutes from "./routes/auth.routes";

import { databaseReady } from "./config/db";

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send(
    "AI Resume Analyzer Backend Running"
  );
});
//hello
databaseReady
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  })
  .catch(() => {
    console.error("Server not started because database setup failed");
    process.exit(1);
  });
