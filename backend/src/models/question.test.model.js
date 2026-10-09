const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: [
      {
        type: String,
      },
    ],

    correctAnswer: {
      type: Number,
      required: true,
    },

    explanation: {
      type: String,
      default: "",
    },

    marks: {
      type: Number,
      default: 1,
    },

    order: {
      type: Number,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    type: {
      type: String,
      enum: ["mcq", "coding"],
      default: "mcq",
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

questionSchema.index({
  test: 1,
});

questionSchema.index({
  order: 1,
});

questionSchema.index({
  difficulty: 1,
});

const questionTestModel =  mongoose.model("Question", questionSchema);

module.exports = questionTestModel ;