// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true,
// });

// export const generateInterviewReport = async ({
//   jobDescription,
//   selfDescription,
//   resumeFile,
// }) => {
//   const token = localStorage.getItem("token");

//   console.log("TOKEN:", token);

//   const formData = new FormData();
//   formData.append("jobDescription", jobDescription);
//   formData.append("selfDescription", selfDescription);
//   formData.append("resume", resumeFile);

//   const response = await api.post(
//     "/api/interview/",
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return response.data;
// };

// export const getInterviewReportById = async (interviewId) => {
//   const token = localStorage.getItem("token");

//   const response = await api.get(
//     `/api/interview/report/${interviewId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return response.data;
// };

// export const getAllInterviewReports = async () => {
//   const token = localStorage.getItem("token");

//   const response = await api.get(
//     "/api/interview/",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return response.data;
// };
// export const generateResumePdf = async ({
//   jobDescription,
//   selfDescription,
//   resumeFile,
// }) => {
//   const token = localStorage.getItem("token");

//   const formData = new FormData();
//   formData.append("jobDescription", jobDescription);
//   formData.append("selfDescription", selfDescription);
//   formData.append("resume", resumeFile);

//   const response = await api.post(
//     "/api/interview/resume-pdf",
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//       responseType: "blob", // 🔥 IMPORTANT for PDF
//     }
//   );

//   return response.data;
// };
 
 





//  import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true,
// });

// // =========================
// // CREATE INTERVIEW REPORT
// // =========================
// export const generateInterviewReport = async ({
//   jobDescription,
//   selfDescription,
//   resumeFile,
// }) => {
//   const token = localStorage.getItem("token");

//   const formData = new FormData();
//   formData.append("jobDescription", jobDescription);
//   formData.append("selfDescription", selfDescription);
//   formData.append("resume", resumeFile);

//   const response = await api.post(
//     "/api/interview/",
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return response.data;
// };

// // =========================
// // GET SINGLE REPORT
// // =========================
// export const getInterviewReportById = async (interviewId) => {
//   const token = localStorage.getItem("token");

//   const response = await api.get(
//     `/api/interview/report/${interviewId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return response.data;
// };

// // =========================
// // GET ALL REPORTS
// // =========================
// export const getAllInterviewReports = async () => {
//   const token = localStorage.getItem("token");

//   const response = await api.get("/api/interview/", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };
// export const downloadInterviewReportPdf = async (interviewId) => {
//   const token = localStorage.getItem("token");

//   const response = await api.get(
//     `/api/interview/report-pdf/${interviewId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       responseType: "blob",
//     }
//   );

//   return response.data;
// };




import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// =========================
// CREATE REPORT
// =========================
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  const response = await api.post("/api/interview/", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// =========================
// GET SINGLE REPORT
// =========================
export const getInterviewReportById = async (interviewId) => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    `/api/interview/report/${interviewId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// =========================
// GET ALL REPORTS
// =========================
export const getAllInterviewReports = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/api/interview/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =========================
// DOWNLOAD PDF (FINAL FIX)
// =========================
export const downloadInterviewReportPdf = async (interviewId) => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    `/api/interview/resume/pdf/${interviewId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }
  );

  return response.data;
};