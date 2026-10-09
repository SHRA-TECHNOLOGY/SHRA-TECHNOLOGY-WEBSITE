import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
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

    enrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },

    certificateId: {
      type: String,
      unique: true,
      required: true,
    },

    issueDate: {
      type: Date,
      default: Date.now,
    },

    completionDate: {
      type: Date,
      required: true,
    },

    finalScore: {
      type: Number,
      default: null,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    template: {
      type: String,
      default: "default",
    },

    certificateUrl: {
      type: String,
      default: "",
    },

    verificationUrl: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Issued", "Revoked"],
      default: "Pending",
    },

    isDownloaded: {
      type: Boolean,
      default: false,
    }

  },
  {
    timestamps: true,
  }
);

certificateSchema.index({
    user:1
});

certificateSchema.index({
    course:1
});

certificateSchema.index({
    certificateId:1
});

certificateSchema.index({
    status:1
});

const certificateModel =  mongoose.model("Certificate", certificateSchema);

module.exports = certificateModel ;