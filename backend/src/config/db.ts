import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/ai_resume_analyzer";

export const databaseReady = mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    throw err;
  });

export default mongoose;
