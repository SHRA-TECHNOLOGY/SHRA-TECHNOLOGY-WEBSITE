import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
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

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    title: {
      type: String,
      default: "",
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    likes: {
      type: Number,
      default: 0,
    },

    isEdited: {
      type: Boolean,
      default: false,
    },

    images: [
      {
        type: String,
      },
    ],

    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reply: {
      type: String,
      default: "",
    },

    repliedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

reviewSchema.index({
  course: 1,
});

reviewSchema.index({
  user: 1,
});

reviewSchema.index({
  rating: 1,
});

reviewSchema.index({
  createdAt: -1,
});

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
