const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
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

    enrolledAt: {
      type: Date,
      default: Date.now,
    },

    enrollmentType: {
      type: String,
      enum: ["Free", "Paid"],
      default: "Free",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Completed",
    },

    paymentId: {
      type: String,
      default: "",
    },

    amountPaid: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Completed", "Cancelled"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
);

enrollmentSchema.index(
  {
    user: 1,
    course: 1,
  },
  {
    unique: true,
  },
);

const enrollmentCourseModel = mongoose.model("Enrollment", enrollmentSchema);

module.exports = enrollmentCourseModel;