const userModel = require("../models/auth.model");
const enrollmentModel = require("../models/enrollment.course.model");
const resultTestModel = require("../models/result.test.model");
const practiceSubmissionModel = require("../models/submission.practice.model");
const userBadgeModel = require("../models/userBadge.model");

const { uploadImage, deleteImage } = require("../services/image.service");

async function getProfileDashboard(req, res) {
  try {
    const userId = req.user.id;

    // =====================================================
    // ALL DATABASE QUERIES IN PARALLEL
    // =====================================================

    const [user, enrollments, testResults, practiceSubmissions, userBadges] =
      await Promise.all([
        // USER PROFILE
        userModel
          .findById(userId)
          .select(
            "fullName username email number city bio createdAt profileImage",
          )
          .lean(),

        // USER ENROLLMENTS
        enrollmentModel
          .find({
            user: userId,
          })
          .populate("course", "title slug")
          .lean(),

        // TEST RESULTS
        resultTestModel
          .find({
            user: userId,
          })
          .populate("test", "title slug difficulty")
          .sort({
            createdAt: -1,
          })
          .lean(),

        // PRACTICE SUBMISSIONS
        practiceSubmissionModel
          .find({
            user: userId,
          })
          .populate("problem", "title slug difficulty")
          .sort({
            createdAt: -1,
          })
          .lean(),

        // USER BADGES
        userBadgeModel
          .find({
            user: userId,
          })
          .populate("badge", "name title description icon color")
          .sort({
            createdAt: -1,
          })
          .lean(),
      ]);

    // =====================================================
    // USER CHECK
    // =====================================================

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // =====================================================
    // PROBLEM SOLVED
    // =====================================================

    // Only successfully solved problems
    const solvedProblemIds = new Set(
      practiceSubmissions
        .filter(
          (submission) =>
            submission.isSolved === true || submission.verdict === "Accepted",
        )
        .map((submission) => submission.problem?._id?.toString())
        .filter(Boolean),
    );

    const problemSolved = solvedProblemIds.size;

    // =====================================================
    // TEST TAKEN
    // =====================================================

    const testTaken = testResults.length;

    // =====================================================
    // AVERAGE TEST SCORE
    // =====================================================

    const testScores = testResults
      .map((result) => Number(result.percentage))
      .filter((score) => !Number.isNaN(score));

    const averageScore =
      testScores.length > 0
        ? Number(
            (
              testScores.reduce((sum, score) => sum + score, 0) /
              testScores.length
            ).toFixed(2),
          )
        : 0;

    // =====================================================
    // BADGE COUNT
    // =====================================================

    const badgeEarned = userBadges.length;

    // =====================================================
    // RECENT PRACTICE ACTIVITIES
    // =====================================================

    const problemActivities = practiceSubmissions
      .filter(
        (submission) =>
          submission.isSolved === true || submission.verdict === "Accepted",
      )
      .slice(0, 10)
      .map((submission) => ({
        type: "problem",

        title: submission.problem?.title || "Coding Problem",

        action: "Solved",

        difficulty: submission.problem?.difficulty || "Easy",

        createdAt: submission.createdAt,
      }));

    // =====================================================
    // RECENT TEST ACTIVITIES
    // =====================================================

    const testActivities = testResults.slice(0, 10).map((result) => ({
      type: "test",

      title: result.test?.title || "Test",

      action: "Attempted",

      score: result.percentage ?? 0,

      difficulty: result.test?.difficulty || null,

      createdAt: result.createdAt,
    }));

    // =====================================================
    // COMBINE RECENT ACTIVITIES
    // =====================================================

    const recentActivity = [...problemActivities, ...testActivities]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    // =====================================================
    // PROFILE
    // =====================================================

    const profile = {
      name: user.fullName || "",

      username: user.username || "",

      email: user.email || "",

      mobile: user.number || "",

      city: user.city || "",

      bio: user.bio || "",

      profileImage: user.profileImage || "",

      joinedAt: user.createdAt,
    };

    // =====================================================
    // PROGRESS
    // =====================================================

    const progress = {
      problemSolved,

      testTaken,

      averageScore,

      badgeEarned,

      courseEnroll: enrollments.length,
    };

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,

      message: "Profile dashboard fetched successfully",

      profile,

      progress,

      recentActivity,

      badges: userBadges,
    });
  } catch (error) {
    console.error("Profile Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile dashboard",
      error: error.message,
    });
  }
}

const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    // Current user
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Upload new image to ImageKit
    const uploadedImage = await uploadImage(req.file, "profile-images");

    // Delete old image from ImageKit
    if (user.profileImageId) {
      try {
        await deleteImage(user.profileImageId);
      } catch (error) {
        console.log("Old profile image delete failed:", error.message);
      }
    }

    // Save new image URL + ImageKit fileId
    user.profileImage = uploadedImage.url;
    user.profileImageId = uploadedImage.fileId;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      profileImage: uploadedImage.url,
      profileImageId: uploadedImage.fileId,
    });
  } catch (error) {
    console.error("Update Profile Image Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile image",
    });
  }
};

module.exports = {
  getProfileDashboard,
  updateProfileImage,
};
