import { Request, Response } from "express";
import { extractResumeText } from "../utils/extractResumeText";
import { analyzeResume } from "../utils/analyzeResume";
import { optimizeResume } from "../utils/optimizeResume";
import db from "../config/db";

export const uploadResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const userId = (req as any).user?.id || 1; // Fallback for testing

    // Extract resume text
    const extractedText = await extractResumeText(req.file.path);

    if (extractedText === "Failed to extract text" || !extractedText.trim()) {
        return res.status(400).json({
            message: "Failed to extract text from resume. Please ensure the file is not corrupted.",
        });
    }

    // Analyze with AI
    const aiAnalysisStr = await analyzeResume(extractedText);
    let aiAnalysis;
    try {
        const jsonMatch = aiAnalysisStr.match(/\{[\s\S]*\}/);
        aiAnalysis = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(aiAnalysisStr);
    } catch (e) {
        aiAnalysis = { atsScore: 70 }; // Fallback
    }

    // Save to recent_resumes
    const sql = "INSERT INTO recent_resumes (user_id, file_name, file_path, ats_score) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE opened_at = CURRENT_TIMESTAMP";
    db.query(sql, [userId, req.file.filename, req.file.path, aiAnalysis.atsScore || 0], (err) => {
        if (err) console.error("Error saving recent resume:", err);
    });

    res.status(200).json({
      message: "Resume uploaded successfully",
      file: req.file.filename,
      path: req.file.path,
      extractedText,
      aiAnalysis,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const optimizeResumeController = async (req: Request, res: Response) => {
  try {
    const { resumeText, fileName, filePath, atsScore } = req.body;
    const userId = (req as any).user?.id || 1;

    if (!resumeText) {
      return res.status(400).json({ message: "Resume text is required" });
    }

    const optimizedData = await optimizeResume(resumeText);

    // Update recent entry if exists or create new
    if (fileName && filePath) {
        const sql = "INSERT INTO recent_resumes (user_id, file_name, file_path, ats_score) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE ats_score = ?, opened_at = CURRENT_TIMESTAMP";
        db.query(sql, [userId, fileName, filePath, optimizedData.totalAtsScore || atsScore || 0, optimizedData.totalAtsScore || atsScore || 0], (err) => {
            if (err) console.error("Error updating recent resume:", err);
        });
    }

    res.status(200).json(optimizedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Optimization failed" });
  }
};

export const getRecentResumes = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id || 1;
    const sql = "SELECT * FROM recent_resumes WHERE user_id = ? ORDER BY opened_at DESC LIMIT 10";
    
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateRecentResume = async (req: Request, res: Response) => {
    try {
        const { fileName, filePath } = req.body;
        const userId = (req as any).user?.id || 1;

        if (!fileName || !filePath) {
            return res.status(400).json({ message: "File info required" });
        }

        const sql = "UPDATE recent_resumes SET opened_at = CURRENT_TIMESTAMP WHERE user_id = ? AND file_name = ?";
        db.query(sql, [userId, fileName], (err) => {
            if (err) console.error(err);
            res.status(200).json({ message: "Updated" });
        });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};