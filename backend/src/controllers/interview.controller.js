 

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// const pdfParse = require("pdf-parse");

// import { generateInterviewReport , generateResumePdf } from "../servicess/ai.service.js";
// import interviewReportModel from "../models/interviewReport.model.js";

// export async function interviewUser(req, res) {
//   try {
//     console.log("STEP 1: Controller reached");

//     if (!req.file) {
//       console.log("STEP 2: No file");
//       return res.status(400).json({
//         success: false,
//         message: "Resume PDF is required",
//       });
//     }

//     console.log("STEP 3: File received");

//     const pdfData = await pdfParse(req.file.buffer);

//     console.log("STEP 4: PDF parsed");

//     const resumeText = pdfData.text;

//     console.log("STEP 5: Resume length =", resumeText.length);

//     const { selfDescription, jobDescription } = req.body;

//     console.log("STEP 6: Data received");

//     const aiReport = await generateInterviewReport({
//       resume: resumeText,
//       selfDescription,
//       jobDescription,
//     });

//     console.log("==================================");
//     console.log("AI REPORT FULL");
//     console.log("==================================");
//     console.log(JSON.stringify(aiReport, null, 2));

//     const interviewReport = await interviewReportModel.create({
//       user: req.user.id,
//       resume: resumeText,
//       selfDescription,
//       jobDescription,
//       ...aiReport,
//     });

//     console.log("==================================");
//     console.log("SAVED REPORT");
//     console.log("==================================");

//     console.log(
//       JSON.stringify(interviewReport.toObject(), null, 2)
//     );

//     console.log(
//       "Technical Questions Count:",
//       interviewReport.technicalQuestions?.length || 0
//     );

//     console.log(
//       "Behavioral Questions Count:",
//       interviewReport.behavioralQuestions?.length || 0
//     );

//     console.log(
//       "Preparation Plan Count:",
//       interviewReport.preparationPlan?.length || 0
//     );

//     console.log("STEP 8: Saved to DB");

//     return res.status(201).json({
//       success: true,
//       interviewReport,
//     });

//   } catch (error) {
//     console.error("CONTROLLER ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }

// export const getInterviewReportByIdController = async (req, res) => {
//   try {
//     const { interviewId } = req.params;

//     const interviewReport = await interviewReportModel.findOne({
//       _id: interviewId,
//       user: req.user.id,
//     });

//     if (!interviewReport) {
//       return res.status(404).json({
//         success: false,
//         message: "Interview report not found.",
//       });
//     }

//     console.log("FETCHED REPORT:");
//     console.log(
//       JSON.stringify(interviewReport.toObject(), null, 2)
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Interview report fetched successfully.",
//       interviewReport,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error fetching interview report",
//       error: error.message,
//     });
//   }
// };

// export const getAllInterviewReportsController = async (req, res) => {
//   try {
//     const interviewReports = await interviewReportModel
//       .find({ user: req.user.id })
//       .sort({ createdAt: -1 })
//       .select(
//         "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan"
//       );

//     return res.status(200).json({
//       success: true,
//       message: "Interview reports fetched successfully.",
//       interviewReports,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error fetching reports",
//       error: error.message,
//     });
//   }
// };

//  export async function generateResumePdfController(req, res) {
//     const { interviewReportId } = req.params

//     const interviewReport = await interviewReportModel.findById(interviewReportId)

//     if (!interviewReport) {
//         return res.status(404).json({
//             message: "Interview report not found."
//         })
//     }

//     const { resume, jobDescription, selfDescription } = interviewReport

//     const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

//     res.set({
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
//     })

//     res.send(pdfBuffer)
// }


import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");

import {
  generateInterviewReport,
  generateResumePdf,
} from "../servicess/ai.service.js";

import interviewReportModel from "../models/interviewReport.model.js";

// ======================================================
// CREATE INTERVIEW REPORT
// ======================================================

export async function interviewUser(req, res) {
  try {
    console.log("STEP 1: Controller reached");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    console.log("STEP 2: Parsing PDF");

    const pdfData = await pdfParse(req.file.buffer);

    const resumeText = pdfData.text;

    console.log("Resume Length:", resumeText.length);

    const { selfDescription, jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job Description is required",
      });
    }

    console.log("STEP 3: Generating AI Report");

    const aiReport = await generateInterviewReport({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    console.log("AI REPORT GENERATED");

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription,
      jobDescription,

      matchScore: aiReport.matchScore,
      technicalQuestions: aiReport.technicalQuestions,
      behavioralQuestions: aiReport.behavioralQuestions,
      skillGaps: aiReport.skillGaps,
      preparationPlan: aiReport.preparationPlan,
      title: aiReport.title,
    });

    console.log("REPORT SAVED");

    return res.status(201).json({
      success: true,
      interviewReport,
    });
  } catch (error) {
    console.error("INTERVIEW ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// GET SINGLE REPORT
// ======================================================

export async function getInterviewReportByIdController(
  req,
  res
) {
  try {
    const { interviewId } = req.params;

    const interviewReport =
      await interviewReportModel.findOne({
        _id: interviewId,
        user: req.user.id,
      });

    if (!interviewReport) {
      return res.status(404).json({
        success: false,
        message: "Interview report not found",
      });
    }

    return res.status(200).json({
      success: true,
      interviewReport,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// GET ALL REPORTS
// ======================================================

export async function getAllInterviewReportsController(
  req,
  res
) {
  try {
    const interviewReports =
      await interviewReportModel
        .find({
          user: req.user.id,
        })
        .sort({ createdAt: -1 })
        .select(
          "-resume -selfDescription -jobDescription -__v"
        );

    return res.status(200).json({
      success: true,
      interviewReports,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ======================================================
// GENERATE ATS RESUME PDF
// ======================================================

export async function generateResumePdfController(
  req,
  res
) {
  try {
    const { interviewReportId } = req.params;

    const interviewReport =
      await interviewReportModel.findOne({
        _id: interviewReportId,
        user: req.user.id,
      });

    if (!interviewReport) {
      return res.status(404).json({
        success: false,
        message: "Interview report not found",
      });
    }

    console.log("GENERATING PDF...");

    const pdfBuffer = await generateResumePdf({
      resume: interviewReport.resume,
      selfDescription:
        interviewReport.selfDescription,
      jobDescription:
        interviewReport.jobDescription,
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=ATS_Resume_${interviewReportId}.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    return res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF CONTROLLER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}