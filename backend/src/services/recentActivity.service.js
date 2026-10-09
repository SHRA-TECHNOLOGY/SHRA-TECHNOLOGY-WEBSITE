const recentActivityModel = require("../models/recentActivity.model");

const createRecentActivity = async ({
  user,
  type,
  title,
  description = "",
  course = null,
  lesson = null,
  practice = null,
  test = null,
  badge = null,
  metadata = {},
}) => {
  try {
    return await recentActivityModel.create({
      user,
      type,
      title,
      description,
      course,
      lesson,
      practice,
      test,
      badge,
      metadata,
    });
  } catch (error) {
    console.error(
      "Recent Activity Error:",
      error.message
    );

    // Activity fail hone se main operation fail nahi hoga
    return null;
  }
};

module.exports = {
  createRecentActivity,
};