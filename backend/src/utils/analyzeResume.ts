import axios from "axios";

export const analyzeResume = async (
    resumeText: string
) => {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",

                messages: [
                    {
                        role: "system",
                        content:
                            "You are an expert ATS resume analyzer and HR recruiter.",
                    },

                    {
                        role: "user",
                        content: `
Analyze this resume and provide a detailed assessment. 
You MUST return a valid JSON object with the exact keys below. 
Lists must be returned as arrays of strings.

{
  "atsScore": number (0-100),
  "summary": "string (professional overview)",
  "strengths": ["string", "string"],
  "weaknesses": ["string", "string"],
  "missingSkills": ["string", "string"],
  "suggestedImprovements": ["string", "string"],
  "recommendedRoles": ["string", "string"]
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

        return response.data.choices[0].message.content;
    } catch (error: any) {
        console.log(
            "========== AI ERROR =========="
        );

        console.log(
            error.response?.data || error
        );

        console.log(
            "================================"
        );

        return "AI analysis failed";
    }
};