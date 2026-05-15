import axios from "axios";

export const optimizeResume = async (resumeText: string) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert AI Resume Optimizer and career coach. Your goal is to rewrite and optimize resumes for maximum ATS compatibility and professional impact.",
          },
          {
            role: "user",
            content: `
Optimize this resume for a modern tech role. 
You MUST return a valid JSON object with the exact keys below. 

{
  "optimizedSummary": "string (a powerful, keyword-rich professional summary)",
  "improvedProjects": [
    {
      "original": "string",
      "optimized": "string (improved using action verbs and quantifiable results)"
    }
  ],
  "atsKeywords": ["string", "string"],
  "formattedSkills": ["string", "string"],
  "suggestedCertifications": ["string", "string"],
  "wordingImprovements": [
    {
      "original": "string",
      "replacement": "string"
    }
  ],
  "actionVerbSuggestions": ["string", "string"],
  "atsImprovementScore": number (how much the ATS score is expected to improve, 0-100),
  "totalAtsScore": number (estimated new ATS score, 0-100)
}

Resume Text:
${resumeText}
`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0].message.content;
    
    // Try to parse JSON from the response content
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", content);
      throw new Error("AI returned invalid format");
    }
  } catch (error: any) {
    console.log("========== AI OPTIMIZE ERROR ==========");
    console.log(error.response?.data || error);
    console.log("========================================");
    throw error;
  }
};
