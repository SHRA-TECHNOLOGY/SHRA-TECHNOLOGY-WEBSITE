const mongoose = require("mongoose");

const practiceSubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PracticeProblem",
      required: true,
    },

    language: {
      type: String,
      enum: ["c", "cpp", "java", "python", "javascript"],
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    verdict: {
      type: String,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Time Limit Exceeded",
        "Runtime Error",
        "Compilation Error",
        "Memory Limit Exceeded",
      ],
      default: "Wrong Answer",
    },

    passedTestCases: {
      type: Number,
      default: 0,
    },

    totalTestCases: {
      type: Number,
      default: 0,
    },

    runtime: {
      type: Number,
      default: 0, // ms
    },

    memory: {
      type: Number,
      default: 0, // MB
    },

    xpEarned: {
      type: Number,
      default: 0,
    },

    isSolved: {
      type: Boolean,
      default: false,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

practiceSubmissionSchema.index({
  user: 1,
  problem: 1,
});

practiceSubmissionSchema.index({
  submittedAt: -1,
});

practiceSubmissionSchema.index({
  verdict: 1,
});

const submissionPracticeModel = mongoose.model(
  "PracticeSubmission",
  practiceSubmissionSchema,
);

module.exports = submissionPracticeModel;
