 

 
// import puppeteer from "puppeteer";
// import { GoogleGenAI } from "@google/genai";
// import z from "zod";
// import zodToJsonSchema from "zod-to-json-schema";
 

// // ==========================================
// // Gemini Client
// // ==========================================
// const apiKey = process.env.GOOGLE_GENAI_API_KEY;

// if (!apiKey) {
//   throw new Error(
//     "GOOGLE_GENAI_API_KEY is missing in .env"
//   );
// }

// const ai = new GoogleGenAI({
//   apiKey,
// });

// // ==========================================
// // Interview Report Schema
// // ==========================================
// const interviewReportSchema = z.object({
//   matchScore: z.number(),

//   technicalQuestions: z.array(
//     z.object({
//       question: z.string(),
//       intention: z.string(),
//       answer: z.string(),
//     })
//   ),

//   behavioralQuestions: z.array(
//     z.object({
//       question: z.string(),
//       intention: z.string(),
//       answer: z.string(),
//     })
//   ),

//   skillGaps: z.array(
//     z.object({
//       skill: z.string(),
//       severity: z.enum([
//         "low",
//         "medium",
//         "high",
//       ]),
//     })
//   ),

//   preparationPlan: z.array(
//     z.object({
//       day: z.number(),
//       focus: z.string(),
//       tasks: z.array(z.string()),
//     })
//   ),

//   title: z.string(),
// });

// // ==========================================
// // Resume PDF Schema
// // ==========================================
// const resumePdfSchema = z.object({
//   html: z.string(),
// });

// // ==========================================
// // Clean Schema
// // ==========================================
// function cleanSchemaForGemini(schema) {
//   if (
//     typeof schema !== "object" ||
//     schema === null
//   ) {
//     return schema;
//   }

//   if (Array.isArray(schema)) {
//     return schema.map(cleanSchemaForGemini);
//   }

//   const cleaned = {};

//   for (const key in schema) {
//     if (
//       key === "$schema" ||
//       key === "additionalProperties"
//     ) {
//       continue;
//     }

//     cleaned[key] =
//       cleanSchemaForGemini(schema[key]);
//   }

//   return cleaned;
// }

// // ==========================================
// // HTML -> PDF
// // ==========================================
// async function generatePdfFromHtml(
//   htmlContent
// ) {
//   // const browser = await puppeteer.launch({
//   //   headless: true,
//   //   args: [
//   //     "--no-sandbox",
//   //     "--disable-setuid-sandbox",
//   //   ],
//   // });

//   const browser = await puppeteer.launch({
//   headless: true,
//   args: [
//     "--no-sandbox",
//     "--disable-setuid-sandbox",
//     "--disable-dev-shm-usage",
//   ],
// });

//   try {
//     const page = await browser.newPage();

//     await page.setContent(htmlContent, {
//       waitUntil: "networkidle0",
//     });

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       margin: {
//         top: "20px",
//         bottom: "20px",
//         left: "20px",
//         right: "20px",
//       },
//     });

//     return pdfBuffer;
//   } finally {
//     await browser.close();
//   }
// }


// // ==========================================
// // Generate Interview Report
// // ==========================================
// export async function generateInterviewReport({
//   resume,
//   selfDescription,
//   jobDescription,
// }) {
//   try {
//     console.log("==================================");
//     console.log("AI REPORT GENERATION STARTED");
//     console.log("==================================");

//     const prompt = `
// You are a Senior Technical Recruiter, Hiring Manager, and Interview Coach.

// Analyze the candidate using:

// 1. Resume
// 2. Self Description
// 3. Job Description

// Return ONLY valid JSON.

// Rules:

// - Calculate realistic match score.
// - Generate 10 technical questions.
// - Generate 5 behavioral questions.
// - Identify skill gaps.
// - Create 7 day preparation plan.
// - Title must be role name from Job Description.

// Resume:
// ${resume}

// Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}
// `;

//    const schema = cleanSchemaForGemini(
//   zodToJsonSchema(resumePdfSchema, { target: "jsonSchema7" })
// );

//     const response =
//       await ai.models.generateContent({
//         model: "gemini-2.5-flash-lite",
//         contents: prompt,
//         config: {
//           responseMimeType:
//             "application/json",
//           responseSchema: schema,
//         },
//       });

//     // const rawText =
//     //   response.text?.trim() || "{}";
//     function safeJsonParse(text) {
//   try {
//     return JSON.parse(text);
//   } catch (e) {
//     const cleaned = text
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     return JSON.parse(cleaned);
//   }
// }

//     console.log("RAW RESPONSE:");
//     console.log(rawText);

//     // const parsedResponse =
//     //   JSON.parse(rawText);

// let parsedResponse;

// try {
//   parsedResponse = JSON.parse(rawText);
// } catch (err) {
//   console.error("JSON Parse Error:", err);
//   throw new Error("Gemini returned invalid JSON");
// }

//     return parsedResponse;
//   } catch (error) {
//     console.error(
//       "INTERVIEW REPORT ERROR:",
//       error
//     );

//     throw error;
//   }
// }


// // ==========================================
// // Generate ATS Resume PDF
// // ==========================================
// export async function generateResumePdf({
//   resume,
//   selfDescription,
//   jobDescription,
// }) {
//   try {
//     console.log("PDF GENERATION STARTED");

//     const prompt = `
// Create an ATS Optimized Resume.

// Candidate Resume:
// ${resume}

// Self Description:
// ${selfDescription}

// Target Job:
// ${jobDescription}

// Return ONLY JSON:

// {
//   "html":"complete html document"
// }

// Requirements:

// - Professional Resume
// - ATS Friendly
// - Clean Layout
// - Include Skills
// - Include Experience
// - Include Projects
// - Include Summary
// - Include Education
// - Maximum 2 pages
// `;

//     const response =
//       await ai.models.generateContent({
//         model: "gemini-2.5-flash-lite",
//         contents: prompt,
//         config: {
//           responseMimeType:
//             "application/json",
//           // responseSchema:
//           //   zodToJsonSchema(
//           //     resumePdfSchema
//           //   ),

//     responseSchema: cleanSchemaForGemini(
//   zodToJsonSchema(resumePdfSchema)
// )
//         },
//       });

//     const rawText =
//       response.text?.trim() || "{}";

//     console.log("PDF RAW RESPONSE:");
//     console.log(rawText);

//     const jsonContent =
//       JSON.parse(rawText);

//     if (!jsonContent.html) {
//       throw new Error(
//         "HTML content not generated"
//       );
//     }

//     const pdfBuffer =
//       await generatePdfFromHtml(
//         jsonContent.html
//       );

//     return pdfBuffer;
//   } catch (error) {
//     console.error(
//       "PDF GENERATION ERROR:",
//       error
//     );

//     throw error;
//   }
// }



import puppeteer from "puppeteer";
import { GoogleGenAI } from "@google/genai";
import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";

// ==========================================
// Gemini Client
// ==========================================
const apiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  throw new Error("GOOGLE_GENAI_API_KEY is missing in .env");
}

const ai = new GoogleGenAI({ apiKey });

// ==========================================
// Schemas
// ==========================================
const interviewReportSchema = z.object({
  matchScore: z.number().min(0).max(100),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    })
  ),

  title: z.string(),
});

const resumePdfSchema = z.object({
  html: z.string(),
});

// ==========================================
// Schema Cleaner
// ==========================================
function cleanSchemaForGemini(schema) {
  if (!schema || typeof schema !== "object") return schema;

  if (Array.isArray(schema)) {
    return schema.map(cleanSchemaForGemini);
  }

  const cleaned = {};
  for (const key in schema) {
    if (key === "$schema" || key === "additionalProperties") continue;
    cleaned[key] = cleanSchemaForGemini(schema[key]);
  }

  return cleaned;
}

// ==========================================
// Safe JSON Parser
// ==========================================
function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  }
}

// ==========================================
// HTML -> PDF
// ==========================================
async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  try {
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

// ==========================================
// Interview Report Generator
// ==========================================
export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const prompt = `
You are a Senior Technical Recruiter and Interview Coach.

Return ONLY valid JSON.

Include:
- matchScore (0-100)
- 10 technical questions
- 5 behavioral questions
- skill gaps
- 7 day preparation plan
- title (job role)

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const schema = cleanSchemaForGemini(
      zodToJsonSchema(interviewReportSchema, { target: "jsonSchema7" })
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const rawText = response.text?.trim();

    if (!rawText) {
      throw new Error("Empty response from Gemini");
    }

    const parsed = safeJsonParse(rawText);

    const validated = interviewReportSchema.safeParse(parsed);

    if (!validated.success) {
      throw new Error("Invalid interview report schema from Gemini");
    }

    return validated.data;
  } catch (error) {
    console.error("INTERVIEW REPORT ERROR:", error);
    throw error;
  }
}

// ==========================================
// ATS Resume PDF Generator
// ==========================================
export async function generateResumePdf({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const prompt = `
Create an ATS Optimized Resume in HTML.

Return ONLY JSON:
{
  "html": "<complete html>"
}

Resume:
${resume}

Self:
${selfDescription}

Job:
${jobDescription}
`;

    const schema = cleanSchemaForGemini(
      zodToJsonSchema(resumePdfSchema, { target: "jsonSchema7" })
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const rawText = response.text?.trim();

    if (!rawText) {
      throw new Error("Empty PDF response from Gemini");
    }

    const json = safeJsonParse(rawText);

    if (!json.html) {
      throw new Error("HTML not generated by Gemini");
    }

    const pdfBuffer = await generatePdfFromHtml(json.html);

    return pdfBuffer;
  } catch (error) {
    console.error("PDF GENERATION ERROR:", error);
    throw error;
  }
}