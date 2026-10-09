const userModel = require("../models/auth.model");
const recentActivityModel = require("../models/recentActivity.model");
const resultTestModel = require("../models/result.test.model");
const enrollmentModel = require("../models/enrollment.course.model");
const practiceSubmissionModel = require("../models/submission.practice.model");
const userBadgeModel = require("../models/userBadge.model");
const announcementModel = require("../models/announcement.model");
const badgeModel = require("../models/badge.model");
const weeklyGoalModel = require("../models/weeklyGoal.model");
const dailyGoalModel = require("../models/dailyGoal.model");
const progressCourseModel = require("../models/progress.course.model");
const liveClassModel = require("../models/liveClass.model");

async function getDashboard(req, res) {
  try {
    const userId = req.user.id;

    // =====================================================
    // 1. USER
    // =====================================================

    const user = await userModel
      .findById(userId)
      .select(
        "fullName username email number city bio profileImage createdAt xp level streak"
      )
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // =====================================================
    // 2. PARALLEL DASHBOARD QUERIES
    // =====================================================

    const [
      recentActivity,
      recentResults,
      allResults,
      enrollments,
      solvedProblems,
      userBadges,
      lastProgress,
      upcomingLiveClass,
      announcements,
    ] = await Promise.all([
      // Recent Activity
      recentActivityModel
        .find({
          user: userId,
        })
        .populate("course", "title slug")
        .populate("lesson", "title slug")
        .populate("practice", "title slug difficulty")
        .populate("test", "title slug difficulty")
        .populate("badge", "name title icon")
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean(),

      // Recent Test Results
      resultTestModel
        .find({
          user: userId,
        })
        .select(
          "test score totalMarks percentage accuracy passed submittedAt attemptNumber"
        )
        .populate("test", "title subject difficulty slug")
        .sort({
          submittedAt: -1,
        })
        .limit(5)
        .lean(),

      // All Test Results
      resultTestModel
        .find({
          user: userId,
        })
        .select("score totalMarks percentage accuracy passed test")
        .lean(),

      // Enrollments
      enrollmentModel
        .find({
          user: userId,
        })
        .populate("course", "title slug description thumbnail")
        .sort({
          updatedAt: -1,
        })
        .lean(),

      // Solved Problems
      practiceSubmissionModel.distinct("problem", {
        user: userId,
        verdict: "Accepted",
      }),

      // Badges
      userBadgeModel
        .find({
          user: userId,
        })
        .populate("badge", "name title description icon color")
        .sort({
          createdAt: -1,
        })
        .lean(),

      // Continue Learning
      progressCourseModel
        .findOne({
          user: userId,
          isCompleted: false,
        })
        .populate("course", "title slug thumbnail")
        .populate("lesson", "title slug order")
        .sort({
          lastWatchedAt: -1,
        })
        .lean(),

      // Upcoming Live Class
      liveClassModel
        .findOne({
          isPublished: true,
          startAt: {
            $gte: new Date(),
          },
        })
        .populate("course", "title slug")
        .sort({
          startAt: 1,
        })
        .lean(),

      // Announcements
      announcementModel
        .find({
          isPublished: true,
          $or: [
            {
              endDate: null,
            },
            {
              endDate: {
                $gte: new Date(),
              },
            },
          ],
        })
        .sort({
          priority: -1,
          createdAt: -1,
        })
        .limit(5)
        .lean(),
    ]);

    // =====================================================
    // 3. TEST TAKEN
    // Unique tests count honge
    // =====================================================

    const testTaken = new Set(
      allResults
        .map((result) => result.test?.toString())
        .filter(Boolean)
    ).size;

    // =====================================================
    // 4. AVERAGE SCORE
    // =====================================================

    const percentages = allResults
      .map((result) => Number(result.percentage))
      .filter((percentage) => !Number.isNaN(percentage));

    const averageScore =
      percentages.length > 0
        ? Number(
            (
              percentages.reduce(
                (total, percentage) => total + percentage,
                0
              ) / percentages.length
            ).toFixed(2)
          )
        : 0;

    // =====================================================
    // 5. CONTINUE LEARNING
    // =====================================================

    let continueLearning = null;

    if (lastProgress) {
      const progressPercentage =
        lastProgress.durationSeconds > 0
          ? Math.min(
              100,
              Math.round(
                (lastProgress.watchedSeconds /
                  lastProgress.durationSeconds) *
                  100
              )
            )
          : 0;

      continueLearning = {
        course: lastProgress.course,
        lesson: lastProgress.lesson,
        progressPercentage,
        watchedSeconds: lastProgress.watchedSeconds,
        durationSeconds: lastProgress.durationSeconds,
        lastWatchedAt: lastProgress.lastWatchedAt,
      };
    }

    // =====================================================
    // 6. GAMIFICATION
    // =====================================================

    const currentXP = Number(user.xp || 0);
    const currentLevel = Number(user.level || 1);
    const currentStreak = Number(user?.streak?.current || 0);
    const longestStreak = Number(user?.streak?.longest || 0);

    const xpPerLevel = 500;

    const currentLevelStartXP =
      (currentLevel - 1) * xpPerLevel;

    const nextLevelXP =
      currentLevel * xpPerLevel;

    const xpInCurrentLevel =
      currentXP - currentLevelStartXP;

    const xpToNextLevel =
      Math.max(0, nextLevelXP - currentXP);

    const levelProgress = Number(
      Math.min(
        100,
        Math.max(
          0,
          (xpInCurrentLevel / xpPerLevel) * 100
        )
      ).toFixed(2)
    );

    // =====================================================
    // 7. DAILY GOAL
    // =====================================================

    const today = new Date();

    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    let dailyGoal = await dailyGoalModel
      .findOne({
        user: userId,
        date: {
          $gte: todayStart,
          $lte: todayEnd,
        },
      })
      .populate("practice", "title slug difficulty topic xp")
      .populate("lesson", "title slug")
      .populate("test", "title slug difficulty")
      .lean();

    if (!dailyGoal) {
      dailyGoal = await dailyGoalModel.create({
        user: userId,
        date: todayStart,
        targetType: "practice",
        target: 1,
        completed: 0,
        xpReward: 25,
        isCompleted: false,
      });

      dailyGoal = await dailyGoalModel
        .findById(dailyGoal._id)
        .populate("practice", "title slug difficulty topic xp")
        .populate("lesson", "title slug")
        .populate("test", "title slug difficulty")
        .lean();
    }

    const dailyPercentage =
      dailyGoal.target > 0
        ? Math.min(
            100,
            Math.round(
              (dailyGoal.completed / dailyGoal.target) * 100
            )
          )
        : 0;

    const dailyGoalData = {
      _id: dailyGoal._id,
      date: dailyGoal.date,
      targetType: dailyGoal.targetType,
      target: dailyGoal.target,
      completed: dailyGoal.completed,
      remaining: Math.max(
        dailyGoal.target - dailyGoal.completed,
        0
      ),
      percentage: dailyPercentage,
      xpReward: dailyGoal.xpReward,
      isCompleted:
        dailyGoal.completed >= dailyGoal.target ||
        dailyGoal.isCompleted,
      practice: dailyGoal.practice || null,
      lesson: dailyGoal.lesson || null,
      test: dailyGoal.test || null,
    };

    // =====================================================
    // 8. WEEKLY PROGRESS
    // =====================================================

    const now = new Date();

    const weekStart = new Date(now);
    const day = weekStart.getDay();

    const diffToMonday =
      day === 0 ? 6 : day - 1;

    weekStart.setDate(
      weekStart.getDate() - diffToMonday
    );

    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);

    weekEnd.setDate(
      weekEnd.getDate() + 6
    );

    weekEnd.setHours(23, 59, 59, 999);

    let weeklyGoal = await weeklyGoalModel.findOne({
      user: userId,
      weekStart,
    });

    if (!weeklyGoal) {
      weeklyGoal = await weeklyGoalModel.create({
        user: userId,
        weekStart,
        weekEnd,
        lessonsTarget: 7,
        problemsTarget: 7,
        testsTarget: 1,
        isActive: true,
      });
    }

    // Weekly queries parallel
    const [
      lessonsCompleted,
      weeklyProblems,
      weeklyTests,
    ] = await Promise.all([

      // Lessons Completed
      recentActivityModel.countDocuments({
        user: userId,
        type: "lesson_completed",
        createdAt: {
          $gte: weekStart,
          $lte: weekEnd,
        },
      }),

      // Problems Solved
      recentActivityModel.distinct("practice", {
        user: userId,
        type: "practice_completed",
        createdAt: {
          $gte: weekStart,
          $lte: weekEnd,
        },
      }),

      // Tests Completed
      recentActivityModel.distinct("test", {
        user: userId,
        type: "test_completed",
        createdAt: {
          $gte: weekStart,
          $lte: weekEnd,
        },
      }),
    ]);

    const problemsCompleted =
      weeklyProblems.filter(Boolean).length;

    const testsCompleted =
      weeklyTests.filter(Boolean).length;

    const lessonProgress =
      weeklyGoal.lessonsTarget > 0
        ? Math.min(
            100,
            Math.round(
              (lessonsCompleted /
                weeklyGoal.lessonsTarget) *
                100
            )
          )
        : 0;

    const problemProgress =
      weeklyGoal.problemsTarget > 0
        ? Math.min(
            100,
            Math.round(
              (problemsCompleted /
                weeklyGoal.problemsTarget) *
                100
            )
          )
        : 0;

    const testProgress =
      weeklyGoal.testsTarget > 0
        ? Math.min(
            100,
            Math.round(
              (testsCompleted /
                weeklyGoal.testsTarget) *
                100
            )
          )
        : 0;

    const totalTarget =
      weeklyGoal.lessonsTarget +
      weeklyGoal.problemsTarget +
      weeklyGoal.testsTarget;

    const totalCompleted =
      Math.min(
        lessonsCompleted,
        weeklyGoal.lessonsTarget
      ) +
      Math.min(
        problemsCompleted,
        weeklyGoal.problemsTarget
      ) +
      Math.min(
        testsCompleted,
        weeklyGoal.testsTarget
      );

    const weeklyPercentage =
      totalTarget > 0
        ? Math.round(
            (totalCompleted / totalTarget) * 100
          )
        : 0;

    const weeklyProgress = {
      weekStart,
      weekEnd,

      overallPercentage: weeklyPercentage,

      lessons: {
        completed: lessonsCompleted,
        target: weeklyGoal.lessonsTarget,
        percentage: lessonProgress,
      },

      problems: {
        completed: problemsCompleted,
        target: weeklyGoal.problemsTarget,
        percentage: problemProgress,
      },

      tests: {
        completed: testsCompleted,
        target: weeklyGoal.testsTarget,
        percentage: testProgress,
      },
    };

    // =====================================================
    // 9. LIVE CLASS DATA
    // =====================================================

    let dashboardLiveClass = null;

    if (upcomingLiveClass) {
      dashboardLiveClass = {
        _id: upcomingLiveClass._id,
        title: upcomingLiveClass.title,
        instructor:
          upcomingLiveClass.instructorName || "",
        thumbnail:
          upcomingLiveClass.thumbnail || "",
        startAt: upcomingLiveClass.startAt,
        duration:
          upcomingLiveClass.duration || 0,
        registeredStudents:
          upcomingLiveClass.registeredStudents || 0,
        meetingUrl:
          upcomingLiveClass.meetingUrl || "",
        course:
          upcomingLiveClass.course || null,
      };
    }

    // =====================================================
    // 10. PROFILE
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
    // 11. DASHBOARD PROGRESS
    // =====================================================

    const progress = {
      courseEnroll: enrollments.length,
      lessonsCompleted,
      problemSolved: solvedProblems.length,
      testTaken,
      averageScore,
      badgeEarned: userBadges.length,
      xp: currentXP,
      level: currentLevel,
      currentStreak,
      longestStreak,
    };

    // =====================================================
    // 12. RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",

      // User profile
      profile,

      // Main dashboard statistics
      progress,

      // XP / Level / Streak
      gamification: {
        xp: currentXP,
        level: currentLevel,
        currentStreak,
        longestStreak,
        nextLevelXP,
        xpToNextLevel,
        levelProgress,
      },

      // Daily goal
      dailyGoal: dailyGoalData,

      // Weekly goal and progress
      weeklyProgress,

      // Upcoming live class
      upcomingLiveClass: dashboardLiveClass,

      // Recent user activities
      recentActivity,

      // Recent test results
      recentResults,

      // Continue learning
      continueLearning,

      // User badges
      badges: userBadges,

      // Platform announcements
      announcements,

      // User enrolled courses
      courses: enrollments,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getDashboard,
};