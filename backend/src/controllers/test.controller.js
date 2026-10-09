const testModel = require("../models/test.model");
const questionTestModel = require("../models/question.test.model");
const resultTestModel = require("../models/result.test.model");
const testConfigModel = require("../models/testRules.model");
const courseModel = require("../models/course.model");
const userModel = require("../models/auth.model");
const mongoose = require("mongoose");
const {updateStreak} = require("../utils/updateStreak");
const slugify = require("slugify");

const { createRecentActivity } = require("../services/recentActivity.service");

//create test controller section here

// after deploy web integrate ai/manually/CSV format to upload instructor

async function createSubjectTest(req, res) {
  try {
    const tests = req.body.map((test) => ({
      ...test,
      slug: slugify(test.title, {
        lower: true,
        strict: true,
      }),
    }));

    const test = await testModel.insertMany(tests);

    return res.status(201).json({
      success: true,
      message: "Test Created successful",
      test,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Fetch all course tests

async function getAllCourseTests(req, res) {
  try {
    const [monthly, weekly, latest, mock, coursesTest] = await Promise.all([
      testModel.find({ category: "Monthly", isPublished: true }).lean(),

      testModel.find({ category: "Weekly", isPublished: true }).lean(),

      testModel
        .find({ isPublished: true })
        .sort({ createdAt: -1 })
        .limit(15)
        .lean(),

      testModel.find({ category: "Mock", isPublished: true }).lean(),

      // ALL COURSE TESTS
      testModel
        .find({ isPublished: true })
        .populate("course", "_id title slug")
        .lean(),
    ]);

    // ==========================================
    // COURSE WISE TEST GROUPING
    // ==========================================

    const courseWiseTests = {};

    coursesTest.forEach((test) => {
      const courseId = test.course?._id?.toString();

      if (!courseId) return;

      // add basic course details

      if (!courseWiseTests[courseId]) {
        courseWiseTests[courseId] = {
          courseId: test.course._id,
          courseName: test.course.title || "Unknown Course",
          totalTests: 0,
          slug: test.slug,
          // tests: [],
        };
      }

      courseWiseTests[courseId].totalTests++;

      // // add test details
      // courseWiseTests[courseId].tests.push({
      //   _id: test._id,
      //   title: test.title,
      //   subject: test.subject,
      //   slug: test.slug,
      //   category: test.category,
      //   isPublished: test.isPublished,
      //   createdAt: test.createdAt,
      // });
    });

    return res.status(200).json({
      success: true,

      monthly,
      weekly,
      latest,
      mock,

      // Course-wise tests
      courseWiseTests: Object.values(courseWiseTests),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// fetch one specific course all test

async function getSpecificCourseTest(req, res) {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const course = await courseModel
      .findOne({ _id: courseId })
      .select("_id title slug description")
      .lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course is not founded !",
      });
    }

    // ==========================================
    // ALL TESTS OF COURSE
    // ==========================================

    const courseTest = await testModel
      .find({
        course: courseId,
        isPublished: true,
      })
      .sort({
        order: 1,
        createdAt: 1,
      })
      .lean();

    // ==========================================
    // USER ATTEMPTS
    // ==========================================

    const attempts = await resultTestModel
      .find({
        user: userId,
        test: { $in: courseTest.map((test) => test._id) },
      })
      .select("score test")
      .lean();

    // ==========================================
    // BEST + AVERAGE SCORE
    // ==========================================

    const scores = attempts
      .map((attempt) => Number(attempt.score))
      .filter((score) => !isNaN(score));

    const bestScore = scores.length > 0 ? Math.max(...scores) : 0;

    const averageScore =
      scores.length > 0
        ? Number(
            (
              scores.reduce((total, score) => total + score, 0) / scores.length
            ).toFixed(2),
          )
        : 0;

    // ==========================================
    // ATTEMPT DATA WITH EACH TEST
    // ==========================================

    const tests = courseTest.map((test) => {
      const testAttempts = attempts.filter(
        (attempt) => attempt.test.toString() === test._id.toString(),
      );

      const testScores = testAttempts
        .map((attempt) => Number(attempt.score))
        .filter((score) => !isNaN(score));

      const testBestScore = testScores.length > 0 ? Math.max(...testScores) : 0;

      return {
        ...test,

        attempted: testAttempts.length > 0,

        attempts: testAttempts,

        bestScore: testBestScore,
      };
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Course Test fetch successful",

      course: course,

      totalTests: courseTest.length,

      totalAttempted: attempts.length,

      bestScore,

      averageScore,

      courseTest: tests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// fetch particular test (test karna h)

async function getSpecificTest(req, res) {
  try {
    const { courseId, slug } = req.params;

    const test = await testModel.findOne({ course: courseId, slug: slug });

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test Not founded yet !",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Test fetch successful",
      test,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// fetch instruction particular test

async function getInstructionTest(req, res) {
  try {
    const { courseId, slug } = req.params;

    const testDetails = await testModel
      .findOne({ course: courseId, slug: slug })
      .select(
        "title subject description difficulty duration totalMarks totalQuestions passingPercentage negativeMarking",
      )
      .lean();

    const instruction = await testConfigModel.findOne().lean();

    return res.status(200).json({
      success: true,
      message: "Test instruction fetch successful",
      testInstruction: {
        testDetails,
        instruction,
      },
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// fetch question particular test

async function getQuestionsTest(req, res) {
  try {
    const { courseId, slug } = req.params;

    const isCheckTest = await testModel
      .findOne({ course: courseId, slug: slug })
      .select("_id title");

    if (!isCheckTest) {
      return res.status(404).json({
        success: false,
        message: "Test not founded !",
      });
    }

    const testQuestions = await questionTestModel
      .find({ test: isCheckTest._id })
      .select(
        "question options explanation marks order difficulty type isPublished",
      );

    return res.status(200).json({
      success: true,
      message: "Test questions fetch successful",
      testQuestions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//when user submit test

async function submitTest(req, res) {
  try {
    const { testId, answers, review, timeTaken } = req.body;

    // find current test
    const currentTest = await testModel
      .findOne({
        _id: testId,
        isPublished: true,
      })
      .select(
        "title duration totalMarks totalQuestions passingPercentage negativeMarking course xp",
      )
      .lean();

    if (!currentTest) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    // fetch all questions
    const questions = await questionTestModel
      .find({
        test: testId,
        isPublished: true,
      })
      .select("question options correctAnswer explanation marks order")
      .lean();

    if (!questions.length) {
      return res.status(400).json({
        success: false,
        message: "No questions found for this test",
      });
    }

    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    let score = 0;

    // calculate properties
    questions.forEach((question) => {
      const selectedAnswer = answers?.[question._id.toString()];

      if (selectedAnswer === undefined) {
        unattempted++;
      } else if (question.correctAnswer === selectedAnswer) {
        correct++;
        score += question.marks;
      } else {
        wrong++;
        score -= currentTest.negativeMarking;
      }
    });

    score = Math.max(0, score);

    const totalQuestions = questions.length;

    const attempted = correct + wrong;

    const totalMarks = questions.reduce(
      (total, question) => total + question.marks,
      0,
    );

    const percentage =
      totalMarks > 0 ? Number(((score / totalMarks) * 100).toFixed(2)) : 0;

    const accuracy =
      attempted > 0 ? Number(((correct / attempted) * 100).toFixed(2)) : 0;

    const passed = percentage >= currentTest.passingPercentage;

    // answer format for save db
    const answerDetails = questions.map((question) => {
      const selectedAnswer = answers?.[question._id.toString()];

      return {
        question: question._id,
        selectedAnswer: selectedAnswer !== undefined ? selectedAnswer : null,

        correctAnswer: question.correctAnswer,

        isCorrect:
          selectedAnswer !== undefined
            ? selectedAnswer === question.correctAnswer
            : false,

        explanation: question.explanation,
      };
    });

    // count attempts by user
    const previousAttempts = await resultTestModel.countDocuments({
      user: req.user.id,
      test: testId,
    });

    const attemptNumber = previousAttempts + 1;

    // ==========================================
    // XP CALCULATION
    // Only FIRST attempt gets XP
    // ==========================================

    let xpEarned = 0;
    let xpAwarded = false;

    if (attemptNumber === 1) {
      // First attempt → calculate XP according to performance
      if (currentTest.xp > 0) {
        xpEarned = Math.round(currentTest.xp * (percentage / 100));

        xpAwarded = xpEarned > 0;
      }
    } else {
      // Later attempts → get XP from first attempt
      const firstAttempt = await resultTestModel
        .findOne({
          user: req.user.id,
          test: testId,
          attemptNumber: 1,
        })
        .select("xpEarned")
        .lean();

      xpEarned = firstAttempt?.xpEarned || 0;
      xpAwarded = false;
    }

    // save result in db
    const result = await resultTestModel.create({
      user: req.user.id,
      test: testId,
      score,
      totalMarks,
      correct,
      wrong,
      unattempted,
      percentage,
      accuracy,
      timeTaken,
      passed,
      answers: answerDetails,
      reviewedQuestions: review || [],
      attemptNumber,

      // XP
      xpEarned,
      xpAwarded,
    });

    // ==========================================
    // ADD XP TO USER
    // ==========================================

    if (xpAwarded) {
      await userModel.findByIdAndUpdate(req.user.id, {
        $inc: {
          xp: xpEarned,
        },
      });
    }

    //==========================================
    // Streak Update
    //=========================================

    await updateStreak(req.user.id);

    // Create Recent Activity
    await createRecentActivity({
      user: req.user.id,
      type: "test_completed",
      title: `Completed ${currentTest.title}`,
      description: `You scored ${percentage}% in ${currentTest.title}.`,
      test: testId,
      course: currentTest.course || null,
      metadata: {
        score,
        totalMarks,
        percentage,
        correct,
        wrong,
        unattempted,
        passed,
        attemptNumber,
        xpEarned,
      },
    });

    // return result
    return res.status(200).json({
      success: true,
      message: "Test submitted successful",
      resultId: result._id,
      xpEarned,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// result declaration controller

async function resultDeclarationTest(req, res) {
  try {
    const { resultId } = req.params;

    const result = await resultTestModel
      .findOne({
        _id: resultId,
        user: req.user.id,
      })
      .select(
        "test score totalMarks correct wrong unattempted percentage accuracy timeTaken passed attemptNumber submittedAt",
      )
      .populate("test", "title subject difficulty duration")
      .lean();

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    // Rank calculate
    const rank =
      (await resultTestModel.countDocuments({
        test: result.test._id,
        score: { $gt: result.score },
      })) + 1;

    // Total participants
    const totalParticipants = await resultTestModel.countDocuments({
      test: result.test._id,
    });

    // Top percentage
    const topPercentage =
      totalParticipants > 0
        ? Number(((rank / totalParticipants) * 100).toFixed(2))
        : 0;

    return res.status(200).json({
      success: true,
      message: "Result fetched successfully",

      result: {
        ...result,

        rank,
        totalParticipants,
        topPercentage,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// test review controller here

async function reviewTest(req, res) {
  try {
    const { resultId } = req.params;

    const result = await resultTestModel
      .findOne({
        _id: resultId,
        user: req.user.id,
      })
      .select(
        "test score totalMarks correct wrong unattempted percentage accuracy answers reviewedQuestions",
      )
      .populate("test", "title subject")
      .populate("answers.question", "question options marks order")
      .lean();

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Test review fetched successfully",
      review: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ==========================================
// Get Test XP Leaderboard
// ==========================================

const getTestXPLeaderboard = async (req, res) => {
  try {
    const { testId } = req.query;

    const userId = new mongoose.Types.ObjectId(req.user.id);

    const now = new Date();

    // ==========================================
    // DATE RANGE
    // ==========================================

    // WEEK → Monday 00:00:00 to now
    const day = now.getDay();
    const diff = day === 0 ? 6 : day - 1;

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - diff);
    weekStart.setHours(0, 0, 0, 0);

    // MONTH → 1st day 00:00:00 to now
    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0,
      0,
    );

    // ==========================================
    // BASE MATCH
    // ==========================================

    const baseMatch = {
      xpAwarded: true,
      xpEarned: {
        $gt: 0,
      },
    };

    // Specific test
    if (testId) {
      if (!mongoose.Types.ObjectId.isValid(testId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid testId",
        });
      }

      baseMatch.test = new mongoose.Types.ObjectId(testId);
    }

    // ==========================================
    // COMMON PIPELINE
    // ==========================================

    const getLeaderboard = (startDate = null) => {
      const match = {
        ...baseMatch,
      };

      // Date filter only when required
      if (startDate) {
        match.submittedAt = {
          $gte: startDate,
          $lte: now,
        };
      }

      return [
        {
          $match: match,
        },

        // User wise XP
        {
          $group: {
            _id: "$user",
            xp: {
              $sum: "$xpEarned",
            },
          },
        },

        // Highest XP first
        {
          $sort: {
            xp: -1,
          },
        },

        // User details
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },

        {
          $unwind: "$user",
        },

        {
          $project: {
            _id: 0,
            userId: "$user._id",
            name: "$user.fullName",
            avatar: "$user.profileImage",
            xp: 1,
          },
        },
      ];
    };

    // ==========================================
    // ONE AGGREGATION → ALL 3 PERIODS
    // ==========================================

    const result = await resultTestModel.aggregate([
      {
        $facet: {
          week: getLeaderboard(weekStart),
          month: getLeaderboard(monthStart),
          all: getLeaderboard(),
        },
      },
    ]);

    const data = result[0];

    // ==========================================
    // ADD RANK + TOP 10 + CURRENT USER
    // ==========================================

    const formatLeaderboard = (users) => {
      const rankedUsers = users.map((user, index) => ({
        ...user,
        rank: index + 1,
      }));

      const top10 = rankedUsers.slice(0, 10);

      const currentUser = rankedUsers.find(
        (user) => user.userId.toString() === userId.toString(),
      );

      const leaderboard = [...top10];

      // Current user Top 10 mein nahi hai
      // toh usko bhi response mein bhejo
      if (currentUser && currentUser.rank > 10) {
        leaderboard.push(currentUser);
      }

      return {
        leaderboard,
        currentUserRank: currentUser?.rank || null,
      };
    };

    // ==========================================
    // FINAL RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      week: formatLeaderboard(data.week),

      month: formatLeaderboard(data.month),

      all: formatLeaderboard(data.all),
    });
  } catch (error) {
    console.error("Leaderboard Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// CREATE SINGLE QUESTION
// ==========================================

const createQuestion = async (req, res) => {
  try {
    const question = await questionTestModel.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Question created successfully",
      question,
    });
  } catch (error) {
    console.error("Create Question Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create question",
      error: error.message,
    });
  }
};

// ==========================================
// CREATE MULTIPLE QUESTIONS
// ==========================================

const createQuestions = async (req, res) => {
  try {
    const questions = req.body;

    // Check body is array
    if (!Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array of questions",
      });
    }

    if (questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one question is required",
      });
    }

    const createdQuestions = await questionTestModel.insertMany(questions);

    return res.status(201).json({
      success: true,
      message: `${createdQuestions.length} questions created successfully`,
      count: createdQuestions.length,
      questions: createdQuestions,
    });
  } catch (error) {
    console.error("Create Questions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create questions",
      error: error.message,
    });
  }
};

module.exports = {
  createSubjectTest,
  getAllCourseTests,
  getSpecificCourseTest,
  getSpecificTest,
  getInstructionTest,
  getQuestionsTest,
  submitTest,
  resultDeclarationTest,
  reviewTest,
  getTestXPLeaderboard,
  createQuestion,
  createQuestions,
};
