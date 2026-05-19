import { Request, Response } from "express";
import { extractResumeText } from "../utils/extractResumeText";
import { analyzeResume } from "../utils/analyzeResume";
import { optimizeResume } from "../utils/optimizeResume";
import RecentResume from "../models/RecentResume";
import User from "../models/User";

const getUserId = async (req: Request) => {
  const tokenUserId = (req as any).user?.id;

  if (tokenUserId) {
    return tokenUserId;
  }

  let testUser = await User.findOne({ email: "test@example.com" });

  if (!testUser) {
    testUser = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "test-user-placeholder",
    });
  }

  return testUser.id;
};

const formatRecentResume = (resume: any) => ({
  id: resume.id,
  user_id: resume.user?.toString(),
  file_name: resume.fileName,
  file_path: resume.filePath,
  ats_score: resume.atsScore,
  opened_at: resume.openedAt,
  created_at: resume.createdAt,
});

export const uploadResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const userId = await getUserId(req);

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

    await RecentResume.findOneAndUpdate(
      {
        user: userId,
        fileName: req.file.filename,
      },
      {
        user: userId,
        fileName: req.file.filename,
        filePath: req.file.path,
        atsScore: aiAnalysis.atsScore || 0,
        openedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

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
    const userId = await getUserId(req);

    if (!resumeText) {
      return res.status(400).json({ message: "Resume text is required" });
    }

    const optimizedData = await optimizeResume(resumeText);

    if (fileName && filePath) {
        await RecentResume.findOneAndUpdate(
          {
            user: userId,
            fileName,
          },
          {
            user: userId,
            fileName,
            filePath,
            atsScore: optimizedData.totalAtsScore || atsScore || 0,
            openedAt: new Date(),
          },
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
          }
        );
    }

    res.status(200).json(optimizedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Optimization failed" });
  }
};

export const getRecentResumes = async (req: Request, res: Response) => {
  try {
    const userId = await getUserId(req);
    const recentResumes = await RecentResume.find({ user: userId })
      .sort({ openedAt: -1 })
      .limit(10);

    res.status(200).json(recentResumes.map(formatRecentResume));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateRecentResume = async (req: Request, res: Response) => {
    try {
        const { fileName, filePath } = req.body;
        const userId = await getUserId(req);

        if (!fileName || !filePath) {
            return res.status(400).json({ message: "File info required" });
        }

        await RecentResume.findOneAndUpdate(
            {
                user: userId,
                fileName,
            },
            {
                filePath,
                openedAt: new Date(),
            }
        );

        res.status(200).json({ message: "Updated" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};
