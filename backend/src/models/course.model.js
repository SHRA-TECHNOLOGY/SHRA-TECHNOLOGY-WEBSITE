const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    subtitle: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    thumbnail: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      default: "Hindi",
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pricing: {
      type: {
        type: String,
        enum: ["Free", "Paid"],
        default: "Free",
      },

      originalPrice: {
        type: Number,
        default: 0,
      },

      price: {
        type: Number,
        default: 0,
      },
    },

    duration: {
      type: Number, // minutes
      default: 0,
    },

    totalSections: {
      type: Number,
      default: 0,
    },

    totalLessons: {
      type: Number,
      default: 0,
    },

    totalResources: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    totalStudents: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Published",
    },

    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

courseSchema.index({
  category: 1,
});

courseSchema.index({
  instructor: 1,
});

courseSchema.index({
  status: 1,
});

const courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;
