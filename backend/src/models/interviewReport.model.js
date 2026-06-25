
import mongoose from "mongoose";

// ==========================
// Skill Gap Schema
// ==========================
const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "severity is required"],
    },
  },
  {
    _id: false,
  }
);

// ==========================
// Preparation Plan Schema
// ==========================
const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "day is required"],
    },
    focus: {
      type: String,
      required: [true, "focus is required"],
    },
    tasks: {
      type: [String],
      required: [true, "tasks array is required"],
    },
  },
  {
    _id: false,
  }
);

// ==========================
// Technical Question Schema
// ==========================
const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "intention is required"],
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  {
    _id: false,
  }
);

// ==========================
// Behavioral Question Schema
// ==========================
const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "behavioral question is required"],
    },
    intention: {
      type: String,
      required: [true, "intention is required"],
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  {
    _id: false,
  }
);

// ==========================
// Main Interview Report Schema
// ==========================
const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "job description is required"],
    },

    resume: {
      type: String,
    },

    selfDescription: {
      type: String,
    },

    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    // ✅ FIXED NAMES
    technicalQuestions: [technicalQuestionSchema],

    behavioralQuestions: [behavioralQuestionSchema],

    preparationPlan: [preparationPlanSchema],

    skillGaps: [skillGapSchema],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    title: {
      type: String,
      required: [true, "job title is required"],
    },
  },
  {
    timestamps: true,
  }
);

const InterviewReport = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);

export default InterviewReport;