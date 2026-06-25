 
import React, { useState, useRef } from "react";
import "../../../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [error, setError] = useState("");

  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    setError("");

    const resumeFile = resumeInputRef.current?.files?.[0];

    // ✅ validation
    if (!jobDescription.trim()) {
      setError("Job Description is required");
      return;
    }

    if (!resumeFile && !selfDescription.trim()) {
      setError("Please upload resume or write self description");
      return;
    }

    try {
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      navigate(`/interview/${data._id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to generate interview plan");
    }
  };

  return (
    <div className="home-page">
      {/* Page Header */}
      <header className="page-header">
        <h1>
          Create Your Custom{" "}
          <span className="highlight">Interview Plan</span>
        </h1>
        <p>
          Let our AI analyze the job requirements and your profile.
        </p>
      </header>

      {/* Error UI */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Main Card */}
      <div className="interview-card">
        <div className="interview-card__body">
          {/* Left Panel */}
          <div className="panel panel--left">
            <div className="panel__header">
              <h2>Target Job Description</h2>
              <span className="badge badge--required">
                Required
              </span>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
              className="panel__textarea"
              placeholder="Paste job description..."
              maxLength={5000}
            />

            <div className="char-counter">
              {jobDescription.length} / 5000 chars
            </div>
          </div>

          <div className="panel-divider" />

          {/* Right Panel */}
          <div className="panel panel--right">
            <div className="panel__header">
              <h2>Your Profile</h2>
            </div>

            <div className="upload-section">
              <label className="section-label">
                Upload Resume
              </label>

              <input
                ref={resumeInputRef}
                type="file"
                accept=".pdf,.docx"
              />
            </div>

            <div className="or-divider">
              <span>OR</span>
            </div>

            <textarea
              value={selfDescription}
              onChange={(e) =>
                setSelfDescription(e.target.value)
              }
              className="panel__textarea"
              placeholder="Describe your profile..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="interview-card__footer">
          <span className="footer-info">
            AI Strategy Generator • ~30s
          </span>

          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="generate-btn"
          >
            {loading
              ? "Generating..."
              : "Generate Interview Strategy"}
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      {reports?.length > 0 && (
        <section className="recent-reports">
          <h2>My Recent Interview Plans</h2>

          <ul className="reports-list">
            {reports.map((report) => (
              <li
                key={report._id}
                onClick={() =>
                  navigate(`/interview/${report._id}`)
                }
              >
                <h3>{report.title}</h3>
                <p>
                  Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Home;