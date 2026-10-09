const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    currentSection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },

    currentLesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },

    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],

    lastWatchedTime: {
      type: Number,
      default: 0,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

courseProgressSchema.index(
  {
    user: 1,
    course: 1,
  },
  {
    unique: true,
  }
);

const progressCourseModel = mongoose.model("CourseProgress", courseProgressSchema);

module.exports = progressCourseModel;