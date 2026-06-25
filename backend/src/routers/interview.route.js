 

// import express from "express";
// import { authMiddleware } from "../middleware/auth.middleware.js";
// import { upload } from "../middleware/file.middleware.js";

// import {
//   interviewUser,
//   getInterviewReportByIdController,
//   getAllInterviewReportsController,
//   generateResumePdfController

// } from "../controllers/interview.controller.js";

// export const interviewRouter = express.Router();


// // Create interview report
// interviewRouter.post(
//   "/",
//   authMiddleware,
//   upload.single("resume"),
//   interviewUser
// );

// // Get single report
// interviewRouter.get(
//   "/report/:interviewId",
//   authMiddleware,
//   getInterviewReportByIdController
// );

// // Get all reports
// interviewRouter.get(
//   "/",
//   authMiddleware,
//   getAllInterviewReportsController
// );

// // interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, interviewController.generateResumePdfController)
// interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware , generateResumePdfController)

// export default interviewRouter;


import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/file.middleware.js";

import {
  interviewUser,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
} from "../controllers/interview.controller.js";

const interviewRouter = express.Router();

// ============================================
// CREATE INTERVIEW REPORT
// ============================================
interviewRouter.post(
  "/",
  authMiddleware,
  upload.single("resume"),
  interviewUser
);

// ============================================
// GET ALL REPORTS
// ============================================
interviewRouter.get(
  "/",
  authMiddleware,
  getAllInterviewReportsController
);

// ============================================
// GET SINGLE REPORT
// ============================================
interviewRouter.get(
  "/report/:interviewId",
  authMiddleware,
  getInterviewReportByIdController
);

// ============================================
// DOWNLOAD ATS RESUME PDF
// ============================================
interviewRouter.get(
  "/resume/pdf/:interviewReportId",
  authMiddleware,
  generateResumePdfController
);

export default interviewRouter;