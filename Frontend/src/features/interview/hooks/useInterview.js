 


//  import {
//   getAllInterviewReports,
//   generateInterviewReport,
//   getInterviewReportById,
//   // generateResumePdf,
// } from "../../auth/services/interview.api.js";

// import { useContext } from "react";
// import { InterviewContext } from "../interview.context.jsx";

// export const useInterview = () => {
//   const context = useContext(InterviewContext);

//   if (!context) {
//     throw new Error(
//       "useInterview must be used within an InterviewProvider"
//     );
//   }

//   const {
//     loading,
//     setLoading,
//     report,
//     setReport,
//     reports,
//     setReports,
//   } = context;

//   // =====================================
//   // Generate Report
//   // =====================================
//   const generateReport = async ({
//     jobDescription,
//     selfDescription,
//     resumeFile,
//   }) => {
//     setLoading(true);

//     try {
//       console.log("=================================");
//       console.log("GENERATE REPORT STARTED");
//       console.log("=================================");

//       console.log("Resume File:", resumeFile);
//       console.log(
//         "Job Description Length:",
//         jobDescription?.length
//       );
//       console.log(
//         "Self Description Length:",
//         selfDescription?.length
//       );

//       const response = await generateInterviewReport({
//         jobDescription,
//         selfDescription,
//         resumeFile,
//       });

//       console.log("=================================");
//       console.log("API RESPONSE RECEIVED");
//       console.log("=================================");
//       console.log(response);

//       if (response?.interviewReport) {
//         console.log(
//           "Interview Report:",
//           response.interviewReport
//         );

//         setReport(response.interviewReport);

//         return response.interviewReport;
//       }

//       console.warn("No interviewReport found in response");

//       return null;
//     } catch (error) {
//       console.error("=================================");
//       console.error("GENERATE REPORT ERROR");
//       console.error("=================================");

//       console.error(error);

//       if (error.response) {
//         console.log(
//           "Status Code:",
//           error.response.status
//         );

//         console.log(
//           "Response Data:",
//           error.response.data
//         );
//       } else {
//         console.log(
//           "Error Message:",
//           error.message
//         );
//       }

//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================
//   // Get Single Report
//   // =====================================
//   const getReportById = async (id) => {
//     setLoading(true);

//     try {
//       console.log("Fetching Report ID:", id);

//       const response =
//         await getInterviewReportById(id);

//       console.log(
//         "Fetched Report:",
//         response.interviewReport
//       );

//       setReport(response.interviewReport);

//       return response.interviewReport;
//     } catch (error) {
//       console.error(
//         "Get Report Error:",
//         error
//       );

//       if (error.response) {
//         console.log(
//           "Status:",
//           error.response.status
//         );

//         console.log(
//           "Response:",
//           error.response.data
//         );
//       }

//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================
//   // Get All Reports
//   // =====================================
//   const getReports = async () => {
//     setLoading(true);

//     try {
//       const response =
//         await getAllInterviewReports();

//       console.log(
//         "All Reports:",
//         response.interviewReports
//       );

//       setReports(response.interviewReports);

//       return response.interviewReports;
//     } catch (error) {
//       console.error(
//         "Get Reports Error:",
//         error
//       );

//       if (error.response) {
//         console.log(
//           "Status:",
//           error.response.status
//         );

//         console.log(
//           "Response:",
//           error.response.data
//         );
//       }

//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     report,
//     reports,

//     generateReport,
//     getReportById,
//     getReports,

//     // generateResumePdf,
//   };
// };



import { useContext } from "react";
import { InterviewContext } from "../interview.context.jsx";

import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
} from "../../auth/services/interview.api.js";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  // =====================================
  // Safety check (prevents crash)
  // =====================================
  if (!context) {
    throw new Error(
      "useInterview must be used within an InterviewProvider"
    );
  }

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
  } = context;

  // =====================================
  // Generate Interview Report
  // =====================================
  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);

    try {
      console.log("=================================");
      console.log("🚀 GENERATE REPORT STARTED");
      console.log("=================================");

      console.log("📄 Resume File:", resumeFile);
      console.log("📝 Job Description Length:", jobDescription?.length);
      console.log("👤 Self Description Length:", selfDescription?.length);

      // API CALL
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      console.log("=================================");
      console.log("📦 API RESPONSE RECEIVED");
      console.log("=================================");
      console.log(response);

      // =====================================
      // Validate response
      // =====================================
      if (response?.interviewReport) {
        console.log("✅ Interview Report Found");

        setReport(response.interviewReport);

        return response.interviewReport;
      }

      console.warn("⚠️ No interviewReport found in response");

      return null;
    } catch (error) {
      console.error("=================================");
      console.error("❌ GENERATE REPORT ERROR");
      console.error("=================================");
      console.error(error);

      if (error.response) {
        console.log("📌 Status Code:", error.response.status);
        console.log("📌 Response Data:", error.response.data);
      } else {
        console.log("📌 Error Message:", error.message);
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Get Single Report by ID
  // =====================================
  const getReportById = async (id) => {
    setLoading(true);

    try {
      console.log("=================================");
      console.log("📥 FETCHING REPORT BY ID");
      console.log("ID:", id);
      console.log("=================================");

      const response = await getInterviewReportById(id);

      console.log("📦 Report Fetched:");
      console.log(response.interviewReport);

      setReport(response.interviewReport);

      return response.interviewReport;
    } catch (error) {
      console.error("❌ GET REPORT ERROR:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Get All Reports
  // =====================================
  const getReports = async () => {
    setLoading(true);

    try {
      console.log("=================================");
      console.log("📥 FETCHING ALL REPORTS");
      console.log("=================================");

      const response = await getAllInterviewReports();

      console.log("📦 All Reports:");
      console.log(response.interviewReports);

      setReports(response.interviewReports);

      return response.interviewReports;
    } catch (error) {
      console.error("❌ GET ALL REPORTS ERROR:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }

      return [];
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EXPORT
  // =====================================
  return {
    loading,
    report,
    reports,

    generateReport,
    getReportById,
    getReports,
  };
};