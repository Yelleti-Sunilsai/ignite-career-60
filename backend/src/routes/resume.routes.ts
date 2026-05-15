import express from "express";
import upload from "../config/multer";
import { 
    uploadResume, 
    optimizeResumeController, 
    getRecentResumes, 
    updateRecentResume 
} from "../controllers/resume.controller";

const router = express.Router();

router.post("/upload", upload.single("resume"), uploadResume);
router.post("/optimize", optimizeResumeController);
router.get("/recent", getRecentResumes);
router.post("/recent/update", updateRecentResume);

export default router;