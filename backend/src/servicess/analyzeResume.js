import { GoogleGenAI } from "@google/genai";
import { resume, selfDescription, jobDescription } from "./temp.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

export async function analyzeResume() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are a professional resume analyzer AI.

Return ONLY valid JSON.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
    `,
  });

  return JSON.parse(response.text);
}