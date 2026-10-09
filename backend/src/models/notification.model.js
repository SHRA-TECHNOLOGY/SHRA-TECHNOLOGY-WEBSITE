const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "course",
        "lesson",
        "practice",
        "test",
        "result",
        "certificate",
        "attendance",
        "live-class",
        "announcement",
        "offer",
        "xp",
        "streak"
      ],
      required: true,
    },

    priority: {
      type: String,
      enum: [
        "low",
        "normal",
        "high"
      ],
      default: "normal",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    actionUrl: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    expiresAt: {
      type: Date,
      default: null,
    }

  },
  {
    timestamps: true,
  }
);

notificationSchema.index({
    user:1
});

notificationSchema.index({
    isRead:1
});

notificationSchema.index({
    createdAt:-1
});

notificationSchema.index({
    type:1
});

const notificationModel =  mongoose.model(
  "Notification",
  notificationSchema
);

module.exports = notificationModel;