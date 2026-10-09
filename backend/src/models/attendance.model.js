import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    liveClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LiveClass",
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      default: "Absent",
    },

    joinedAt: {
      type: Date,
      default: null,
    },

    leftAt: {
      type: Date,
      default: null,
    },

    attendancePercentage: {
      type: Number,
      default: 100,
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Teacher/Admin
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

attendanceSchema.index({
  student: 1,
});

attendanceSchema.index({
  liveClass: 1,
});

attendanceSchema.index({
  student: 1,
  liveClass: 1,
});

const attendanceModel = mongoose.model("Attendance", attendanceSchema);

module.exports = attendanceModel;
