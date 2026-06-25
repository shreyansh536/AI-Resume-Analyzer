// import { createContext,useState } from "react";
// export const InterviewContext = createContext()

// export const InterviewProvider = ({ children }) => {
//     const [loading, setLoading] = useState(false)
//     const [report, setReport] = useState(null)
//     const [reports, setReports] = useState([])

//     return (
//         <InterviewContext.Provider value={{ loading, setLoading, report, setReport, reports, setReports }}>
//             {children}
//         </InterviewContext.Provider>
//     )
// }



import { createContext, useState, useMemo } from "react";

export const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);

  // =====================================
  // Prevent unnecessary re-renders
  // =====================================
  const value = useMemo(
    () => ({
      loading,
      setLoading,
      report,
      setReport,
      reports,
      setReports,
    }),
    [loading, report, reports]
  );

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};