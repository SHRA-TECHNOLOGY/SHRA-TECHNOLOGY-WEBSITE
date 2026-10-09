const mongoose = require("mongoose");

const practiceProblemSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      default: null,
    },

    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    topic: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    statement: {
      type: String,
      required: true,
    },

    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],

    constraints: [String],

    hints: [String],

    starterCode: {
      cpp: String,
      c: String,
      java: String,
      python: String,
      javascript: String,
    },

    testCases: [
      {
        input: String,
        expectedOutput: String,
        isSample: {
          type: Boolean,
          default: true,
        },
      },
    ],

    hiddenTestCases: [
      {
        input: String,
        expectedOutput: String,
      },
    ],

    language: {
      type: String,
      enum: ["c","python",],
      required: true,
      index: true,
    },

    acceptance: {
      type: Number,
      default: 0,
    },

    estimatedTime: {
      type: Number,
      default: 15,
    },

    xp: {
      type: Number,
      default: 20,
    },

    order: {
      type: Number,
      default: 1,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

practiceProblemSchema.index({
  course: 1,
});

practiceProblemSchema.index({
  section: 1,
});

practiceProblemSchema.index({
  lesson: 1,
});


const practiceModel = mongoose.model("PracticeProblem", practiceProblemSchema);

module.exports = practiceModel;
