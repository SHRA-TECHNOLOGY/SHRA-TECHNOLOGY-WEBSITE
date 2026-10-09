const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["video", "practice", "quiz", "assignment"],
      default: "video",
    },

    status: {
      type: String,
      enum: ["Coming Soon", "Available"],
      default: "Coming Soon",
    },

    videoId: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 0, // Seconds
    },

    thumbnail: {
      type: String,
      default: "",
    },

    isPreview: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    resources: [
      {
        title: String,
        url: String,
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

lessonSchema.index({
  section: 1,
});

lessonSchema.index({
  course: 1,
});

lessonSchema.index({
  order: 1,
});

const lessonCourseModel = mongoose.model("Lesson", lessonSchema);

module.exports = lessonCourseModel;
