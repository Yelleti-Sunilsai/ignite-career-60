import API from "@/lib/axios";

export interface OptimizedResumeData {
  optimizedSummary: string;
  improvedProjects: { original: string; optimized: string }[];
  atsKeywords: string[];
  formattedSkills: string[];
  suggestedCertifications: string[];
  wordingImprovements: { original: string; replacement: string }[];
  actionVerbSuggestions: string[];
  atsImprovementScore: number;
  totalAtsScore: number;
}

export interface RecentResume {
  id: number;
  file_name: string;
  file_path: string;
  ats_score: number;
  opened_at: string;
  created_at: string;
}

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await API.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const optimizeResume = async (data: {
  resumeText: string;
  fileName?: string;
  filePath?: string;
  atsScore?: number;
}): Promise<OptimizedResumeData> => {
  const response = await API.post("/resume/optimize", data);
  return response.data;
};

export const getRecentResumes = async (): Promise<RecentResume[]> => {
  const response = await API.get("/resume/recent");
  return response.data;
};

export const updateRecentResume = async (fileName: string, filePath: string) => {
  const response = await API.post("/resume/recent/update", { fileName, filePath });
  return response.data;
};