const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema(
  {
    // ==========================================
    // BADGE NAME
    // ==========================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // DESCRIPTION
    // ==========================================

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================================
    // ICON
    // Frontend icon name
    // ==========================================

    icon: {
      type: String,
      default: "award",
    },

    // ==========================================
    // COLOR
    // ==========================================

    color: {
      type: String,
      default: "#7C5CFC",
    },

    // ==========================================
    // BADGE REQUIREMENT
    // ==========================================

    requirementType: {
      type: String,
      enum: [
        "problem_solved",
        "streak",
        "xp",
        "test_completed",
        "course_completed",
        "lesson_completed",
      ],
      required: true,
    },

    requirementValue: {
      type: Number,
      default: 1,
    },

    // ==========================================
    // XP REWARD
    // ==========================================

    xpReward: {
      type: Number,
      default: 0,
    },

    // ==========================================
    // ORDER
    // ==========================================

    order: {
      type: Number,
      default: 1,
    },

    // ==========================================
    // PUBLISH
    // ==========================================

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

badgeSchema.index({
  isPublished: 1,
  order: 1,
});

const badgeModel = mongoose.model(
  "Badge",
  badgeSchema
);

module.exports = badgeModel;