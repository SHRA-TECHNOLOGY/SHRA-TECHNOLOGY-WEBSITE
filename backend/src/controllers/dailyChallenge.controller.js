const dailyGoalModel = require("../models/dailyGoal.model");
const practiceModel = require("../models/practice.model");
const testModel = require("../models/test.model");
const authModel = require("../models/auth.model");

// ==========================================
// CREATE / SET DAILY CHALLENGE
// ==========================================

const createDailyChallenge = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      targetType,
      target,
      practice,
      lesson,
      test,
      xpReward,
    } = req.body;

    // ==========================================
    // VALIDATE TARGET TYPE
    // ==========================================

    const allowedTypes = [
      "practice",
      "lesson",
      "test",
      "mixed",
    ];

    if (!targetType || !allowedTypes.includes(targetType)) {
      return res.status(400).json({
        success: false,
        message: "Valid target type is required",
      });
    }

    // ==========================================
    // VALIDATE PRACTICE
    // ==========================================

    if (targetType === "practice") {
      if (!practice) {
        return res.status(400).json({
          success: false,
          message: "Practice problem is required",
        });
      }

      const problem = await practiceModel
        .findOne({
          _id: practice,
          isPublished: true,
        })
        .select(
          "title slug topic difficulty language xp estimatedTime statement"
        )
        .lean();

      if (!problem) {
        return res.status(404).json({
          success: false,
          message: "Practice problem not found",
        });
      }
    }

    // ==========================================
    // VALIDATE TEST
    // ==========================================

    if (targetType === "test") {
      if (!test) {
        return res.status(400).json({
          success: false,
          message: "Test is required",
        });
      }

      const selectedTest = await testModel
        .findOne({
          _id: test,
          isPublished: true,
        })
        .select(
          "title slug topic difficulty questions xp estimatedTime"
        )
        .lean();

      if (!selectedTest) {
        return res.status(404).json({
          success: false,
          message: "Test not found",
        });
      }
    }

    // ==========================================
    // TODAY DATE
    // ==========================================

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // ==========================================
    // CHECK EXISTING DAILY GOAL
    // ==========================================

    let dailyGoal = await dailyGoalModel.findOne({
      user: userId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // ==========================================
    // UPDATE EXISTING GOAL
    // ==========================================

    if (dailyGoal) {
      dailyGoal.targetType = targetType;
      dailyGoal.target = target || 1;

      dailyGoal.practice =
        targetType === "practice"
          ? practice
          : null;

      dailyGoal.lesson =
        targetType === "lesson"
          ? lesson
          : null;

      dailyGoal.test =
        targetType === "test"
          ? test
          : null;

      dailyGoal.xpReward = xpReward || 25;

      // New challenge select hua hai
      dailyGoal.completed = 0;
      dailyGoal.isCompleted = false;
      dailyGoal.completedAt = null;

      await dailyGoal.save();
    }

    // ==========================================
    // CREATE NEW GOAL
    // ==========================================

    else {
      dailyGoal = await dailyGoalModel.create({
        user: userId,
        date: startOfDay,

        targetType,

        target: target || 1,

        completed: 0,

        practice:
          targetType === "practice"
            ? practice
            : null,

        lesson:
          targetType === "lesson"
            ? lesson
            : null,

        test:
          targetType === "test"
            ? test
            : null,

        xpReward: xpReward || 25,

        isCompleted: false,

        completedAt: null,
      });
    }

    // ==========================================
    // POPULATE COMPLETE CHALLENGE
    // ==========================================

    const populatedGoal = await dailyGoalModel
      .findById(dailyGoal._id)

      .populate(
        "practice",
        "title slug topic difficulty language xp estimatedTime statement"
      )

      .populate(
        "lesson",
        "title slug"
      )

      .populate(
        "test",
        "title slug topic difficulty questions xp estimatedTime"
      )

      .lean();

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      message:
        dailyGoal.createdAt?.getTime() ===
        dailyGoal.updatedAt?.getTime()
          ? "Daily challenge created successfully"
          : "Daily challenge updated successfully",

      dailyGoal: populatedGoal,
    });

  } catch (error) {
    console.error(
      "Create Daily Challenge Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create daily challenge",
      error: error.message,
    });
  }
};

// ==========================================
// GET TODAY'S DAILY CHALLENGE
// ==========================================

const getTodayDailyChallenge = async (req, res) => {
  try {
    const userId = req.user.id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const dailyGoal = await dailyGoalModel
      .findOne({
        user: userId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
      .populate(
        "practice",
        "title slug topic difficulty language xp estimatedTime statement",
      )
      .populate("lesson", "title slug")
      .populate("test", "title slug difficulty xp estimatedTime")
      .lean();

    if (!dailyGoal) {
      return res.status(200).json({
        success: true,
        hasChallenge: false,
        dailyGoal: null,
      });
    }

    return res.status(200).json({
      success: true,
      hasChallenge: true,

      dailyGoal: {
        id: dailyGoal._id,
        date: dailyGoal.date,

        targetType: dailyGoal.targetType,

        target: dailyGoal.target,

        completed: dailyGoal.completed,

        xpReward: dailyGoal.xpReward,

        isCompleted: dailyGoal.isCompleted,

        completedAt: dailyGoal.completedAt,

        practice: dailyGoal.practice || null,

        lesson: dailyGoal.lesson || null,

        test: dailyGoal.test || null,
      },
    });
  } catch (error) {
    console.error("Get Daily Challenge Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch daily challenge",
      error: error.message,
    });
  }
};

// ==========================================
// COMPLETE DAILY CHALLENGE
// ==========================================

const completeDailyChallenge = async (req, res) => {
  try {
    const userId = req.user.id;

    const { dailyGoalId } = req.body;

    if (!dailyGoalId) {
      return res.status(400).json({
        success: false,
        message: "Daily goal ID is required",
      });
    }

    const dailyGoal = await dailyGoalModel.findOne({
      _id: dailyGoalId,
      user: userId,
    });

    if (!dailyGoal) {
      return res.status(404).json({
        success: false,
        message: "Daily challenge not found",
      });
    }

    // ==========================================
    // ALREADY COMPLETED
    // ==========================================

    if (dailyGoal.isCompleted) {
      return res.status(200).json({
        success: true,
        message: "Challenge already completed",
        alreadyCompleted: true,
        xpEarned: 0,
        dailyGoal,
      });
    }

    // ==========================================
    // XP REWARD
    // ==========================================

    const xpEarned = dailyGoal.xpReward || 0;

    // ==========================================
    // COMPLETE DAILY GOAL
    // ==========================================

    dailyGoal.completed = dailyGoal.target;
    dailyGoal.isCompleted = true;
    dailyGoal.completedAt = new Date();

    await dailyGoal.save();

    // ==========================================
    // ADD XP TO USER
    // ==========================================

    if (xpEarned > 0) {
      await authModel.findByIdAndUpdate(
        userId,
        {
          $inc: {
            xp: xpEarned,
          },
        },
        {
          new: true,
        },
      );
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: `Daily challenge completed! You earned ${xpEarned} XP.`,

      xpEarned,

      dailyGoal: {
        id: dailyGoal._id,
        targetType: dailyGoal.targetType,
        target: dailyGoal.target,
        completed: dailyGoal.completed,
        xpReward: dailyGoal.xpReward,
        isCompleted: dailyGoal.isCompleted,
        completedAt: dailyGoal.completedAt,
      },
    });
  } catch (error) {
    console.error("Complete Daily Challenge Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to complete daily challenge",
      error: error.message,
    });
  }
};

// ==========================================
// GET PRACTICE + TEST LIST
// FOR DAILY CHALLENGE
// ==========================================

const getChallengeOptions = async (req, res) => {
  try {
    const [problems, tests] = await Promise.all([
      practiceModel
        .find({
          isPublished: true,
        })
        .select("title slug topic difficulty language xp estimatedTime")
        .sort({
          difficulty: 1,
          order: 1,
        })
        .lean(),

      testModel
        .find({
          isPublished: true,
        })
        .select("title slug subject difficulty totalQuestions xp duration")
        .sort({
          difficulty: 1,
        })
        .lean(),
    ]);

    return res.status(200).json({
      success: true,
      message: "Challenge options fetched successfully",

      problems,
      tests,
    });
  } catch (error) {
    console.error("Get Challenge Options Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch challenge options",
      error: error.message,
    });
  }
};

module.exports = {
  createDailyChallenge,
  getTodayDailyChallenge,
  completeDailyChallenge,
  getChallengeOptions
};
