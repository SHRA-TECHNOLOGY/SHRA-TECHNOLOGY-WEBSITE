const mongoose = require("mongoose");

const weeklyGoalSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER
    // ==========================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ==========================================
    // WEEK
    // ==========================================

    weekStart: {
      type: Date,
      required: true,
      index: true,
    },

    weekEnd: {
      type: Date,
      required: true,
    },

    // ==========================================
    // WEEKLY TARGETS
    // ==========================================

    lessonsTarget: {
      type: Number,
      default: 7,
      min: 0,
    },

    problemsTarget: {
      type: Number,
      default: 7,
      min: 0,
    },

    testsTarget: {
      type: Number,
      default: 1,
      min: 0,
    },

    // ==========================================
    // OPTIONAL
    // User goal active hai ya nahi
    // ==========================================

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ek user ke ek week ka ek hi goal
weeklyGoalSchema.index(
  {
    user: 1,
    weekStart: 1,
  },
  {
    unique: true,
  }
);

const weeklyGoalModel = mongoose.model(
  "WeeklyGoal",
  weeklyGoalSchema
);

module.exports = weeklyGoalModel;