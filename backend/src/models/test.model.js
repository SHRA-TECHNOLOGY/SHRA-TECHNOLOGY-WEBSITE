const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
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
      lowercase: true,
    },

    description: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    category: {
      type: String,
      enum: ["Monthly", "Weekly", "Mock"],
      default: "Weekly",
    },

    duration: {
      type: Number,
      required: true,
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    passingPercentage: {
      type: Number,
      default: 50,
    },

    negativeMarking: {
      type: Number,
      default: 0,
    },

    unlockPercentage: {
      type: Number,
      default: 70,
    },

    // ==========================================
    // XP REWARD
    // ==========================================

    xp: {
      type: Number,
      default: 10,
      min: 0,
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
  }
);

testSchema.index({
  subject: 1,
});

testSchema.index({
  order: 1,
});

testSchema.index({
  difficulty: 1,
});

const testModel = mongoose.model("Test", testSchema);

module.exports = testModel;