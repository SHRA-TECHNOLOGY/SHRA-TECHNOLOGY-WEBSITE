const {mongoose, model } =  require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
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

    totalLessons: {
      type: Number,
      default: 0,
    },

    duration: {
      type: Number,
      default: 0, // minutes
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

sectionSchema.index({
  course: 1,
});

sectionSchema.index({
  order: 1,
});

const sectionCourseModel = mongoose.model("Section", sectionSchema);

module.exports = sectionCourseModel;
