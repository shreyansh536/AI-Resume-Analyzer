// import React, { useState } from "react";
// import "../../../style/interview.scss";
// import { useParams } from "react-router-dom";

// const NAV_ITEMS = [
//   {
//     id: "technical",
//     label: "Technical Questions",
//   },
//   {
//     id: "behavioral",
//     label: "Behavioral Questions",
//   },
//   {
//     id: "roadmap",
//     label: "Road Map",
//   },
// ];

// const QuestionCard = ({ item, index }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="q-card">
//       <div
//         className="q-card__header"
//         onClick={() => setOpen(!open)}
//       >
//         <span className="q-card__index">Q{index + 1}</span>
//         <p className="q-card__question">{item.question}</p>
//       </div>

//       {open && (
//         <div className="q-card__body">
//           <div className="q-card__section">
//             <h4>Intention</h4>
//             <p>{item.intention}</p>
//           </div>

//           <div className="q-card__section">
//             <h4>Answer</h4>
//             <p>{item.answer}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const RoadMapDay = ({ day }) => (
//   <div className="roadmap-day">
//     <h3>Day {day.day}</h3>
//     <h4>{day.focus}</h4>

//     <ul>
//       {day.tasks.map((task, index) => (
//         <li key={index}>{task}</li>
//       ))}
//     </ul>
//   </div>
// );

// const Interview = () => {
//   const [activeNav, setActiveNav] = useState("technical");
//   const { interviewId } = useParams();

//   const loading = false;

//   const report = {
//     matchScore: 85,

//     technicalQuestions: [
//       {
//         question: "What is React?",
//         intention: "Check React fundamentals",
//         answer:
//           "React is a JavaScript library used to build user interfaces.",
//       },
//       {
//         question: "What are React Hooks?",
//         intention: "Check React knowledge",
//         answer:
//           "Hooks allow function components to use state and lifecycle features.",
//       },
//     ],

//     behavioralQuestions: [
//       {
//         question: "Tell me about yourself",
//         intention: "Assess communication",
//         answer:
//           "Introduce yourself, education, projects, and career goals.",
//       },
//       {
//         question: "Why should we hire you?",
//         intention: "Evaluate confidence",
//         answer:
//           "Highlight your skills, projects, and willingness to learn.",
//       },
//     ],

//     preparationPlan: [
//       {
//         day: 1,
//         focus: "React Fundamentals",
//         tasks: [
//           "Learn JSX",
//           "Learn Components",
//           "Learn Props",
//           "Learn State",
//         ],
//       },
//       {
//         day: 2,
//         focus: "React Hooks",
//         tasks: [
//           "useState",
//           "useEffect",
//           "Custom Hooks",
//         ],
//       },
//     ],

//     skillGaps: [
//       {
//         skill: "System Design",
//         severity: "high",
//       },
//       {
//         skill: "TypeScript",
//         severity: "medium",
//       },
//     ],
//   };

//   if (loading) {
//     return (
//       <main className="loading-screen">
//         <h1>Loading...</h1>
//       </main>
//     );
//   }

//   const scoreColor =
//     report.matchScore >= 80
//       ? "score--high"
//       : report.matchScore >= 60
//       ? "score--mid"
//       : "score--low";

//   return (
//     <div className="interview-page">
//       <div className="interview-layout">
//         {/* Sidebar */}
//         <nav className="interview-nav">
//           <h3>Sections</h3>

//           {NAV_ITEMS.map((item) => (
//             <button
//               key={item.id}
//               className={
//                 activeNav === item.id
//                   ? "interview-nav__item interview-nav__item--active"
//                   : "interview-nav__item"
//               }
//               onClick={() => setActiveNav(item.id)}
//             >
//               {item.label}
//             </button>
//           ))}

//           <button
//             className="button primary-button"
//             onClick={() =>
//               alert(
//                 `Resume download not implemented yet.\nInterview ID: ${interviewId}`
//               )
//             }
//           >
//             Download Resume
//           </button>
//         </nav>

//         <div className="interview-divider" />

//         {/* Content */}
//         <main className="interview-content">
//           {activeNav === "technical" && (
//             <section>
//               <h2>Technical Questions</h2>

//               {report.technicalQuestions.map((question, index) => (
//                 <QuestionCard
//                   key={index}
//                   item={question}
//                   index={index}
//                 />
//               ))}
//             </section>
//           )}

//           {activeNav === "behavioral" && (
//             <section>
//               <h2>Behavioral Questions</h2>

//               {report.behavioralQuestions.map((question, index) => (
//                 <QuestionCard
//                   key={index}
//                   item={question}
//                   index={index}
//                 />
//               ))}
//             </section>
//           )}

//           {activeNav === "roadmap" && (
//             <section>
//               <h2>Preparation Roadmap</h2>

//               {report.preparationPlan.map((day) => (
//                 <RoadMapDay
//                   key={day.day}
//                   day={day}
//                 />
//               ))}
//             </section>
//           )}
//         </main>

//         <div className="interview-divider" />

//         {/* Right Sidebar */}
//         <aside className="interview-sidebar">
//           <div className="match-score">
//             <h3>Match Score</h3>

//             <div className={`match-score__ring ${scoreColor}`}>
//               {report.matchScore}%
//             </div>
//           </div>

//           <div className="sidebar-divider" />

//           <div className="skill-gaps">
//             <h3>Skill Gaps</h3>

//             {report.skillGaps.map((gap, index) => (
//               <span
//                 key={index}
//                 className={`skill-tag skill-tag--${gap.severity}`}
//               >
//                 {gap.skill}
//               </span>
//             ))}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default Interview;


// import { downloadInterviewReportPdf } from "../../auth/services/interview.api.js";
// import React, { useState, useEffect } from "react";
// import "../../../style/interview.scss";
// import { useParams } from "react-router-dom";
// import { useInterview } from "../hooks/useInterview";

// const NAV_ITEMS = [
//   {
//     id: "technical",
//     label: "Technical Questions",
//   },
//   {
//     id: "behavioral",
//     label: "Behavioral Questions",
//   },
//   {
//     id: "roadmap",
//     label: "Road Map",
//   },
// ];

// const QuestionCard = ({ item, index }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="q-card">
//       <div
//         className="q-card__header"
//         onClick={() => setOpen(!open)}
//       >
//         <span className="q-card__index">Q{index + 1}</span>
//         <p className="q-card__question">{item.question}</p>
//       </div>

//       {open && (
//         <div className="q-card__body">
//           <div className="q-card__section">
//             <h4>Intention</h4>
//             <p>{item.intention}</p>
//           </div>

//           <div className="q-card__section">
//             <h4>Answer</h4>
//             <p>{item.answer}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const RoadMapDay = ({ day }) => (
//   <div className="roadmap-day">
//     <h3>Day {day.day}</h3>
//     <h4>{day.focus}</h4>

//     <ul>
//       {day.tasks?.map((task, index) => (
//         <li key={index}>{task}</li>
//       ))}
//     </ul>
//   </div>
// );

// const Interview = () => {
//   const [activeNav, setActiveNav] = useState("technical");

//   const { interviewId } = useParams();

//   const {
//     loading,
//     report,
//     getReportById,
//   } = useInterview();

//   useEffect(() => {
//     if (interviewId) {
//       getReportById(interviewId);
//     }
//   }, [interviewId]);

//   if (loading) {
//     return (
//       <main className="loading-screen">
//         <h1>Loading Interview Report...</h1>
//       </main>
//     );
//   }

//   if (!report) {
//     return (
//       <main className="loading-screen">
//         <h1>No Report Found</h1>
//       </main>
//     );
//   }
//   console.log("REPORT DATA:", report);

//   const scoreColor =
//     report.matchScore >= 80
//       ? "score--high"
//       : report.matchScore >= 60
//       ? "score--mid"
//       : "score--low";



//        const handleDownloadPdf = async () => {
//   try {
//     const blob = await downloadInterviewReportPdf(interviewId);

//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${report?.title || "interview-report"}.pdf`;
//     a.click();

//     window.URL.revokeObjectURL(url);
//   } catch (err) {
//     console.error("PDF Download Error:", err);
//     alert("Failed to download PDF");
//   }
// };
//   return (
//     <div className="interview-page">
//       <div className="interview-layout">

//         {/* Sidebar */}
//         <nav className="interview-nav">
//           <h3>{report.title || "Interview Report"}</h3>

//           {NAV_ITEMS.map((item) => (
//             <button
//               key={item.id}
//               className={
//                 activeNav === item.id
//                   ? "interview-nav__item interview-nav__item--active"
//                   : "interview-nav__item"
//               }
//               onClick={() => setActiveNav(item.id)}
//             >
//               {item.label}
//             </button>
//           ))}
//         </nav>

//         <div className="interview-divider" />

//         {/* Main Content */}
//         <main className="interview-content">

//           {activeNav === "technical" && (
//             <section>
//               <h2>Technical Questions</h2>

//               {report.technicalQuestions?.map(
//                 (question, index) => (
//                   <QuestionCard
//                     key={index}
//                     item={question}
//                     index={index}
//                   />
//                 )
//               )}
//             </section>
//           )}

//           {activeNav === "behavioral" && (
//             <section>
//               <h2>Behavioral Questions</h2>

//               {report.behavioralQuestions?.map(
//                 (question, index) => (
//                   <QuestionCard
//                     key={index}
//                     item={question}
//                     index={index}
//                   />
//                 )
//               )}
//             </section>
//           )}

//           {activeNav === "roadmap" && (
//             <section>
//               <h2>Preparation Roadmap</h2>

//               {report.preparationPlan?.map((day) => (
//                 <RoadMapDay
//                   key={day.day}
//                   day={day}
//                 />
//               ))}
//             </section>
//           )}
//         </main>

//         <div className="interview-divider" />

//         {/* Right Sidebar */}
//         <aside className="interview-sidebar">

//           <div className="match-score">
//             <h3>Match Score</h3>

//             <div
//               className={`match-score__ring ${scoreColor}`}
//             >
//               {report.matchScore}%
//             </div>
//           </div>

//           <div className="sidebar-divider" />

//           <div className="skill-gaps">
//             <h3>Skill Gaps</h3>

//             {report.skillGaps?.map((gap, index) => (
//               <span
//                 key={index}
//                 className={`skill-tag skill-tag--${gap.severity}`}
//               >
//                 {gap.skill}
//               </span>
//             ))}
//           </div>
//             <div style={{ marginTop: "20px" }}>
//     <button
//       onClick={handleDownloadPdf}
//       style={{
//         width: "100%",
//         padding: "10px",
//         background: "#111",
//         color: "#fff",
//         border: "none",
//         cursor: "pointer",
//         borderRadius: "6px",
//       }}
//     >
//       Download Report PDF
//     </button>
//   </div>
//         </aside>

//       </div>
//     </div>
//   );
// };
 

// export default Interview;



import { downloadInterviewReportPdf } from "../../auth/services/interview.api.js";
import React, { useState, useEffect } from "react";
import "../../../style/interview.scss";
import { useParams } from "react-router-dom";
import { useInterview } from "../hooks/useInterview";

// NAV ITEMS
const NAV_ITEMS = [
  { id: "technical", label: "Technical Questions" },
  { id: "behavioral", label: "Behavioral Questions" },
  { id: "roadmap", label: "Road Map" },
];

// QUESTION CARD
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="q-card">
      <div className="q-card__header" onClick={() => setOpen(!open)}>
        <span className="q-card__index">Q{index + 1}</span>
        <p>{item.question}</p>
      </div>

      {open && (
        <div className="q-card__body">
          <h4>Intention</h4>
          <p>{item.intention}</p>

          <h4>Answer</h4>
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
};

// ROADMAP
const RoadMapDay = ({ day }) => (
  <div className="roadmap-day">
    <h3>Day {day.day}</h3>
    <h4>{day.focus}</h4>
    <ul>
      {day.tasks?.map((task, i) => (
        <li key={i}>{task}</li>
      ))}
    </ul>
  </div>
);

const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");

  const { interviewId } = useParams();

  const { loading, report, getReportById } = useInterview();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  // =========================
  // PDF DOWNLOAD
  // =========================
  const handleDownloadPdf = async () => {
    try {
      const blob = await downloadInterviewReportPdf(interviewId);

      const fileBlob = new Blob([blob], { type: "application/pdf" });

      const url = window.URL.createObjectURL(fileBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${report?.title || "interview-report"}.pdf`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF Download Error:", err);
      alert("Failed to download PDF");
    }
  };

  // LOADING
  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading Interview Report...</h1>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="loading-screen">
        <h1>No Report Found</h1>
      </main>
    );
  }

  const scoreColor =
    report.matchScore >= 80
      ? "score--high"
      : report.matchScore >= 60
      ? "score--mid"
      : "score--low";

  return (
    <div className="interview-page">
      <div className="interview-layout">

        {/* Sidebar */}
        <nav className="interview-nav">
          <h3>{report.title || "Interview Report"}</h3>

          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={activeNav === item.id ? "active" : ""}
              onClick={() => setActiveNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="interview-divider" />

        {/* Main Content */}
        <main className="interview-content">

          {activeNav === "technical" &&
            report.technicalQuestions?.map((q, i) => (
              <QuestionCard key={i} item={q} index={i} />
            ))}

          {activeNav === "behavioral" &&
            report.behavioralQuestions?.map((q, i) => (
              <QuestionCard key={i} item={q} index={i} />
            ))}

          {activeNav === "roadmap" &&
            report.preparationPlan?.map((d) => (
              <RoadMapDay key={d.day} day={d} />
            ))}
        </main>

        <div className="interview-divider" />

        {/* Right Sidebar */}
        <aside className="interview-sidebar">

          <div className="match-score">
            <h3>Match Score</h3>
            <div>{report.matchScore}%</div>
          </div>

          <div className="sidebar-divider" />

          <div className="skill-gaps">
            <h3>Skill Gaps</h3>

            {report.skillGaps?.map((gap, i) => (
              <span key={i}>{gap.skill}</span>
            ))}
          </div>

          {/* DOWNLOAD BUTTON */}
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleDownloadPdf}
              style={{
                width: "100%",
                padding: "10px",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Download Report PDF
            </button>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default Interview;