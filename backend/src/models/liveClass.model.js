const mongoose = require("mongoose");

const liveClassSchema = new mongoose.Schema(
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

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    thumbnail: {
      type: String,
      default: "",
    },

    platform: {
      type: String,
      enum: ["Google Meet", "Zoom", "Custom"],
      default: "Google Meet",
    },

    meetingLink: {
      type: String,
      required: true,
    },

    meetingId: {
      type: String,
      default: "",
    },

    meetingPassword: {
      type: String,
      default: "",
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number, // Minutes
      required: true,
    },

    maxStudents: {
      type: Number,
      default: 500,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Live", "Completed", "Cancelled"],
      default: "Upcoming",
    },

    recordingUrl: {
      type: String,
      default: "",
    },

    isRecordingAvailable: {
      type: Boolean,
      default: false,
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

liveClassSchema.index({
  scheduledAt: 1,
});

liveClassSchema.index({
  teacher: 1,
});

liveClassSchema.index({
  course: 1,
});

liveClassSchema.index({
  status: 1,
});

const liveClassModel =  mongoose.model("LiveClass", liveClassSchema);

module.exports = liveClassModel;
