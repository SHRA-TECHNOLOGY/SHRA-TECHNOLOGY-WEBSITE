const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    correct: {
      type: Number,
      default: 0,
    },

    wrong: {
      type: Number,
      default: 0,
    },

    unattempted: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    accuracy: {
      type: Number,
      default: 0,
    },

    timeTaken: {
      type: Number,
      default: 0, // seconds
    },

    passed: {
      type: Boolean,
      default: false,
    },

    //  XP earned in this attempt
    xpEarned: {
      type: Number,
      default: 0,
      min: 0,
    },

    //  Whether XP was awarded for this test attempt
    xpAwarded: {
      type: Boolean,
      default: false,
    },

    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },

        selectedAnswer: {
          type: Number,
          default: null,
        },

        correctAnswer: {
          type: Number,
          required: true,
        },

        isCorrect: {
          type: Boolean,
          default: false,
        },

        explanation: {
          type: String,
          default: "",
        },
      },
    ],

    reviewedQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    attemptNumber: {
      type: Number,
      default: 1,
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

resultSchema.index({
  user: 1,

  test: 1,
});

resultSchema.index({
  submittedAt: -1,
});

resultSchema.index({
  score: -1,
});

const resultTestModel = mongoose.model("Result", resultSchema);

module.exports = resultTestModel;
