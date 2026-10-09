const mongoose = require("mongoose");

const resultModel = require("../models/result.test.model");
const testModel = require("../models/test.model");
const enrollmentCourseModel = require("../models/enrollment.course.model");

// ==========================================
// CHECK RESULT COURSE ENROLLMENT
// ==========================================

const checkResultCourseEnrollment = async (req, res, next) => {
  try {
    // ==========================================
    // USER
    // ==========================================

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Login is required.",
      });
    }

    // ==========================================
    // RESULT ID
    // ==========================================

    const { resultId } = req.params;

    if (!resultId) {
      return res.status(400).json({
        success: false,
        message: "Result ID is required.",
      });
    }

    // ==========================================
    // VALIDATE RESULT ID
    // ==========================================

    if (!mongoose.Types.ObjectId.isValid(resultId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid result ID.",
      });
    }

    // ==========================================
    // FIND USER'S RESULT
    // ==========================================

    const result = await resultModel
      .findOne({
        _id: resultId,
        user: userId,
      })
      .select("_id test user")
      .lean();

    // ==========================================
    // RESULT NOT FOUND
    // ==========================================

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Test result not found.",
      });
    }

    // ==========================================
    // FIND TEST
    // ==========================================

    const test = await testModel
      .findById(result.test)
      .select("_id course title slug")
      .lean();

    // ==========================================
    // TEST NOT FOUND
    // ==========================================

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test associated with this result not found.",
      });
    }

    // ==========================================
    // COURSE CHECK
    // ==========================================

    if (!test.course) {
      return res.status(400).json({
        success: false,
        message: "Course information is not available for this test.",
      });
    }

    console.log("========== ENROLLMENT CHECK ==========");
    console.log("USER ID:", userId);
    console.log("COURSE ID:", courseId);
    console.log("PARAMS:", req.params);

    // ==========================================
    // CHECK ENROLLMENT
    // ==========================================

    const enrollment = await enrollmentCourseModel
      .findOne({
        user: userId,
        course: test.course,
      })
      .lean();

    // ==========================================
    // NOT ENROLLED
    // ==========================================

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        code: "COURSE_NOT_ENROLLED",
        message: "Please enroll in this course first.",
        courseId: test.course,
      });
    }

    console.log("ENROLLMENT:", enrollment);

    // ==========================================
    // ATTACH DATA
    // ==========================================

    req.courseId = test.course;

    req.enrollment = enrollment;

    req.testResult = result;

    req.test = test;

    // ==========================================
    // NEXT
    // ==========================================

    next();
  } catch (error) {
    console.error("Result Course Enrollment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify course enrollment.",
    });
  }
};

module.exports = {
  checkResultCourseEnrollment,
};
