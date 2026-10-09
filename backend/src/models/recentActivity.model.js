const mongoose = require("mongoose");

const recentActivitySchema = new mongoose.Schema(
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
    // ACTIVITY TYPE
    // ==========================================

    type: {
      type: String,
      enum: [
        "course_enrolled",
        "lesson_completed",
        "practice_completed",
        "test_completed",
        "badge_earned",
        "live_class_joined",
        "course_completed",
        "certificate_earned",
      ],
      required: true,
    },


    // ==========================================
    // MAIN TITLE
    // ==========================================

    title: {
      type: String,
      required: true,
      trim: true,
    },


    // ==========================================
    // SUB TITLE / DESCRIPTION
    // ==========================================

    description: {
      type: String,
      default: "",
      trim: true,
    },


    // ==========================================
    // RELATED COURSE
    // ==========================================

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },


    // ==========================================
    // RELATED LESSON
    // ==========================================

    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      default: null,
    },


    // ==========================================
    // RELATED PRACTICE
    // ==========================================

    practice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PracticeProblem",
      default: null,
    },


    // ==========================================
    // RELATED TEST
    // ==========================================

    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      default: null,
    },


    // ==========================================
    // RELATED BADGE
    // ==========================================

    badge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Badge",
      default: null,
    },


    // ==========================================
    // EXTRA DATA
    // ==========================================

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },


    // ==========================================
    // CREATED DATE
    // ==========================================

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: false,
  }
);


// ==========================================
// INDEX
// ==========================================

recentActivitySchema.index({
  user: 1,
  createdAt: -1,
});

const recentActivityModel = mongoose.model("RecentActivity",
  recentActivitySchema);

module.exports = recentActivityModel;

