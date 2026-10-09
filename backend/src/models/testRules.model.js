const mongoose = require("mongoose");

const testConfigSchema = new mongoose.Schema(
  {
    rules: {
      type: [String],
      default: [],
    },

    importantNote: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const testConfigModel = mongoose.model(
  "TestConfig",
  testConfigSchema
);

module.exports = testConfigModel;