const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "New Course",
        "Contest",
        "Offer",
        "Event",
        "Update",
        "Notice",
      ],
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
      trim: true,
    },

    // Optional: announcement kis course se related hai
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },

    // Optional: announcement kis contest se related hai
    contest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      default: null,
    },

    // Announcement kab tak valid hai
    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
      default: null,
    },

    // UI mein announcement show karna hai ya nahi
    isPublished: {
      type: Boolean,
      default: true,
    },

    // Announcement ko top par rakhne ke liye
    priority: {
      type: Number,
      default: 0,
    },

    // Optional button
    actionText: {
      type: String,
      default: "",
      trim: true,
    },

    actionUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Latest + priority announcements ke liye
announcementSchema.index({
  isPublished: 1,
  priority: -1,
  createdAt: -1,
});

const announcementModel = mongoose.model("Announcement",
  announcementSchema);

module.exports = announcementModel;



// example for data
// {
//   type: "New Course",
//   title: "React.js Masterclass Released",
//   description: "Learn React from beginner to advanced with real-world projects.",
//   actionText: "View Course",
//   actionUrl: "/courses/react-js",
//   isPublished: true,
//   priority: 10
// }