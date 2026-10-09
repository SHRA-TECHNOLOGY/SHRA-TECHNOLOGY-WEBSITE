const practiceModel = require("../models/practice.model");
const submissionPracticeModel = require("../models/submission.practice.model");
const authModel = require("../models/auth.model");
const courseModel = require("../models/course.model");
const recentActivityModel = require("../models/recentActivity.model");

const { executePython } = require("../services/codeExecution.service");
const { executeC } = require("../services/executeC.service");

const { updateStreak } = require("../utils/updateStreak");

const mongoose = require("mongoose");

// add practice set

async function addPracticeSet(req, res) {
  try {
    const practiceSet = await practiceModel.insertMany(req.body);

    return res.status(201).json({
      success: true,
      message: "Practice set added successfully",
      practiceSet,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// fetch data for home page

async function getAllPractice(req, res) {
  try {
    const userId = req.user.id;

    const [totalProblem, solvedProblems, streakData, languageStats, bestScore] =
      await Promise.all([
        // ==========================================
        // TOTAL PROBLEMS
        // ==========================================

        practiceModel.countDocuments({
          isPublished: true,
        }),

        // ==========================================
        // UNIQUE SOLVED PROBLEMS
        // ==========================================

        submissionPracticeModel.distinct("problem", {
          user: userId,
          isSolved: true,
        }),

        // ==========================================
        // CURRENT STREAK
        // ==========================================

        authModel.findById(userId).select("streak").lean(),

        // ==========================================
        // LANGUAGE + COURSE WISE TOTAL PROBLEMS
        // ==========================================

        practiceModel.aggregate([
          {
            $match: {
              isPublished: true,
            },
          },

          // Course join
          {
            $lookup: {
              from: "courses",
              localField: "course",
              foreignField: "_id",
              as: "course",
            },
          },

          // Array -> Object
          {
            $unwind: "$course",
          },

          // Required fields
          {
            $project: {
              language: 1,
              course: {
                _id: "$course._id",
                title: "$course.title",
                slug: "$course.slug",
              },
            },
          },

          // Language + Course wise grouping
          {
            $group: {
              _id: {
                language: "$language",
                courseId: "$course._id",
              },

              total: {
                $sum: 1,
              },

              course: {
                $first: "$course",
              },
            },
          },

          // Sort
          {
            $sort: {
              "_id.language": 1,
            },
          },
        ]),

        // ==========================================
        // BEST SCORE
        // ==========================================

        submissionPracticeModel
          .findOne({
            user: userId,
            isSolved: true,
          })
          .sort({
            xpEarned: -1,
          })
          .select("xpEarned")
          .lean(),
      ]);

    // ==========================================
    // TOTAL SOLVED
    // ==========================================

    const totalSolved = solvedProblems.length;

    // ==========================================
    // SOLVED PROBLEMS
    // LANGUAGE + COURSE WISE
    // ==========================================

    const solvedByLanguage = await submissionPracticeModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          isSolved: true,
        },
      },

      // Ek problem ko ek hi baar count karo
      {
        $group: {
          _id: "$problem",
        },
      },

      // Problem details lao
      {
        $lookup: {
          from: "practiceproblems",
          localField: "_id",
          foreignField: "_id",
          as: "problem",
        },
      },

      {
        $unwind: "$problem",
      },

      // Language + Course ko preserve karo
      {
        $group: {
          _id: {
            language: "$problem.language",
            courseId: "$problem.course",
          },

          solved: {
            $sum: 1,
          },
        },
      },
    ]);

    // ==========================================
    // SOLVED MAP
    // ==========================================

    const solvedMap = {};

    solvedByLanguage.forEach((item) => {
      const key = `${item._id.courseId}_${item._id.language}`;

      solvedMap[key] = item.solved;
    });

    // ==========================================
    // FINAL LANGUAGE DATA
    // ==========================================

    const languages = languageStats.map((item) => {
      const language = item._id.language;
      const courseId = item._id.courseId;

      const key = `${courseId}_${language}`;

      const solved = solvedMap[key] || 0;

      const progress =
        item.total > 0 ? Number(((solved / item.total) * 100).toFixed(1)) : 0;

      return {
        language,

        totalProblems: item.total,

        solved,

        progress,

        course: {
          _id: item.course._id,
          title: item.course.title,
          slug: item.course.slug,
        },
      };
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      message: "Practice data fetched successfully.",

      practiceData: {
        totalProblem,

        totalSolved,

        streak: streakData?.streak || 0,

        bestScore: bestScore?.xpEarned || 0,

        languages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// get all practice set of specific course

async function getCourseAllProblem(req, res) {
  try {
    const { slug } = req.params;

    // ==========================================
    // GET COURSE
    // ==========================================

    const course = await courseModel.findOne({ slug }).select("_id").lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    // ==========================================
    // GET ALL PROBLEMS
    // ==========================================

    const problems = await practiceModel
      .find({
        course: course._id,
        isPublished: true,
      })
      .select(
        "_id title slug topic difficulty language acceptance estimatedTime order",
      )
      .sort({ order: 1 })
      .lean();

    if (!problems.length) {
      return res.status(200).json({
        success: true,
        message: "No problems found!",
        problems: [],
      });
    }

    // ==========================================
    // GET USER'S SOLVED PROBLEMS
    // ==========================================

    const solvedSubmissions = await submissionPracticeModel
      .find({
        user: req.user.id,
        isSolved: true,
        problem: {
          $in: problems.map((problem) => problem._id),
        },
      })
      .select("problem")
      .lean();

    // ==========================================
    // CREATE SET OF SOLVED PROBLEM IDs
    // ==========================================

    const solvedProblemIds = new Set(
      solvedSubmissions.map((submission) => submission.problem.toString()),
    );

    // ==========================================
    // ADD SOLVED FIELD
    // ==========================================

    const problemsWithSolvedStatus = problems.map((problem) => ({
      ...problem,

      solved: solvedProblemIds.has(problem._id.toString()),
    }));

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Problem Set fetched successfully",
      problems: problemsWithSolvedStatus,
    });
  } catch (error) {
    console.error("Get Course Problems Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// get one specific test

async function getSingleProblem(req, res) {
  try {
    const { slug, problemSlug } = req.params;

    const course = await courseModel
      .findOne({ slug: slug })
      .select("_id")
      .lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course is not founded !",
      });
    }

    const problem = await practiceModel
      .findOne({
        slug: problemSlug,
        isPublished: true,
      })
      .select(
        "title slug topic difficulty statement examples constraints hints starterCode testCases language acceptance estimatedTime xp order",
      )
      .lean();

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Problem fetched successfully",
      problem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// run code controller
const runPracticeCode = async (req, res) => {
  try {
    const { problemId, language, code } = req.body;

    // Validation
    if (!problemId) {
      return res.status(400).json({
        success: false,
        message: "Problem ID is required",
      });
    }

    if (!language) {
      return res.status(400).json({
        success: false,
        message: "Language is required",
      });
    }

    if (!code || !code.trim()) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    // Problem fetch
    const problem = await practiceModel
      .findOne({
        _id: problemId,
        isPublished: true,
      })
      .select("title language testCases")
      .lean();

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // // Language check
    if (problem.language !== language) {
      return res.status(400).json({
        success: false,
        message: "Selected language does not match this problem",
      });
    }

    // Supported languages
    const supportedLanguages = ["python", "c"];

    if (!supportedLanguages.includes(language)) {
      return res.status(400).json({
        success: false,
        message: `${language} execution is not implemented yet`,
      });
    }

    // Sample test cases
    const sampleTestCases = (problem.testCases || []).filter(
      (test) => test.isSample === true,
    );

    if (!sampleTestCases.length) {
      return res.status(400).json({
        success: false,
        message: "No sample test cases available",
      });
    }

    // Execute code
    let result;

    if (language === "python") {
      result = await executePython({
        code,
        testCases: sampleTestCases,
      });
    } else if (language === "c") {
      result = await executeC({
        code,
        testCases: sampleTestCases,
      });
    }

    // Default message
    let message = "Code executed successfully";

    // Find failed test
    const failedTest = result?.results?.find((test) => test?.passed === false);

    if (failedTest) {
      const status = failedTest.status;

      if (status === "Compilation Error") {
        message = "Compilation Error";
      } else if (status === "Runtime Error") {
        message = "Runtime Error";
      } else if (status === "Time Limit Exceeded") {
        message = "Time Limit Exceeded";
      } else {
        message = "Wrong Answer";
      }
    }

    return res.status(200).json({
      success: true,
      message,

      // Exact failed test information
      error: failedTest
        ? {
            testCase: failedTest.testCase,
            status: failedTest.status,
            error: failedTest.error,

            errorDetails: failedTest.errorDetails || null,

            input: failedTest.input,
            expectedOutput: failedTest.expectedOutput,
            actualOutput: failedTest.actualOutput,
          }
        : null,

      result,
    });
  } catch (error) {
    console.error("Run Practice Error:", error);

    return res.status(500).json({
      success: false,
      message: "Code execution failed",
      error: error.message,
    });
  }
};

// submit practice problem

const submitPracticeCode = async (req, res) => {
  try {
    const { problemId, language, code } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!problemId) {
      return res.status(400).json({
        success: false,
        message: "Problem ID is required",
      });
    }

    if (!language) {
      return res.status(400).json({
        success: false,
        message: "Language is required",
      });
    }

    if (!code || !code.trim()) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    // ==========================================
    // GET PROBLEM
    // ==========================================

    const problem = await practiceModel
      .findOne({
        _id: problemId,
        isPublished: true,
      })
      .select("title language testCases hiddenTestCases xp")
      .lean();

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    // ==========================================
    // LANGUAGE CHECK
    // ==========================================

    if (problem.language !== language) {
      return res.status(400).json({
        success: false,
        message: "Selected language does not match this problem",
      });
    }

    // ==========================================
    // SUPPORTED LANGUAGES
    // ==========================================

    const supportedLanguages = ["python", "c"];

    if (!supportedLanguages.includes(language)) {
      return res.status(400).json({
        success: false,
        message: `${language} submission is not implemented yet`,
      });
    }

    // ==========================================
    // CHECK ALREADY SOLVED
    // ==========================================

    const alreadySolvedProblem = await submissionPracticeModel
      .findOne({
        user: req.user.id,
        problem: problemId,
        isSolved: true,
      })
      .sort({ createdAt: -1 })
      .lean();

    if (alreadySolvedProblem) {
      return res.status(200).json({
        success: true,
        submitted: true,
        alreadySubmitted: true,

        message: "You have already submitted this problem successfully.",

        result: {
          submissionId: alreadySolvedProblem._id,

          verdict: "Already Submitted",

          passedTestCases: alreadySolvedProblem.passedTestCases,

          totalTestCases: alreadySolvedProblem.totalTestCases,

          xpEarned: 0,

          isSolved: true,

          alreadySolved: true,

          submittedAt: alreadySolvedProblem.createdAt,
        },
      });
    }

    // ==========================================
    // PUBLIC + HIDDEN TEST CASES
    // ==========================================

    const publicTests = problem.testCases || [];

    const hiddenTests = problem.hiddenTestCases || [];

    const allTestCases = [...publicTests, ...hiddenTests].map((test) => ({
      input: test.input || "",
      expectedOutput: test.expectedOutput || "",
    }));

    if (!allTestCases.length) {
      return res.status(400).json({
        success: false,
        message: "No test cases available",
      });
    }

    // ==========================================
    // EXECUTE CODE
    // ==========================================

    let execution;

    if (language === "python") {
      execution = await executePython({
        code,
        testCases: allTestCases,
      });
    } else if (language === "c") {
      execution = await executeC({
        code,
        testCases: allTestCases,
      });
    }

    // ==========================================
    // EXECUTION RESULT
    // ==========================================

    const passedTestCases = execution?.passedTestCases || 0;

    const totalTestCases = execution?.totalTestCases || allTestCases.length;

    const allPassed = passedTestCases === totalTestCases && totalTestCases > 0;

    // ==========================================
    // NOT ALL TEST CASES PASSED
    // ==========================================

    if (!allPassed) {
      const failedTest = execution?.results?.find(
        (test) => test?.passed === false,
      );

      let verdict = "Wrong Answer";

      if (failedTest?.status === "Time Limit Exceeded") {
        verdict = "Time Limit Exceeded";
      } else if (failedTest?.status === "Runtime Error") {
        verdict = "Runtime Error";
      } else if (failedTest?.status === "Compilation Error") {
        verdict = "Compilation Error";
      }

      // ==========================================
      // DO NOT SAVE
      // DO NOT GIVE XP
      // ==========================================

      return res.status(200).json({
        success: true,

        submitted: false,

        message: "All test cases did not pass.",

        result: {
          verdict,

          passedTestCases,

          totalTestCases,

          xpEarned: 0,

          isSolved: false,

          results: execution?.results || [],
        },
      });
    }

    // ==========================================
    // ALL TEST CASES PASSED
    // ==========================================

    const verdict = "Accepted";

    const isSolved = true;

    // ==========================================
    // XP
    // ==========================================

    const xpEarned = problem.xp || 0;

    // ==========================================
    // SAVE SUCCESSFUL SUBMISSION
    // ==========================================

    const submission = await submissionPracticeModel.create({
      user: req.user.id,

      problem: problemId,

      language,

      code,

      verdict,

      passedTestCases,

      totalTestCases,

      runtime: execution?.runtime || 0,

      memory: execution?.memory || 0,

      xpEarned,

      isSolved: true,
    });

    // ==========================================
    // UPDATE USER XP
    // ==========================================

    if (xpEarned > 0) {
      await authModel.findByIdAndUpdate(req.user.id, {
        $inc: {
          xp: xpEarned,
        },
      });
    }

    //==========================================
    // Streak Update
    //=========================================

    await updateStreak(req.user.id);

    // ==========================================
    // RECENT ACTIVITY
    // ==========================================

    await recentActivityModel.create({
      user: req.user.id,

      type: "practice_completed",

      title: `Solved: ${problem.title}`,

      description: `Successfully solved the practice problem "${problem.title}".`,

      practice: problem._id,

      course: problem.course || null,

      metadata: {
        language,
        verdict,
        xpEarned,
        passedTestCases,
        totalTestCases,
      },
    });

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      submitted: true,

      message: `Accepted! You earned ${xpEarned} XP.`,

      result: {
        submissionId: submission._id,

        verdict,

        passedTestCases,

        totalTestCases,

        xpEarned,

        isSolved,

        alreadySolved: false,

        results: execution?.results || [],
      },
    });
  } catch (error) {
    console.error("Submit Practice Error:", error);

    return res.status(500).json({
      success: false,
      message: "Submission failed",
      error: error.message,
    });
  }
};

module.exports = {
  addPracticeSet,
  getAllPractice,
  getCourseAllProblem,
  getSingleProblem,
  runPracticeCode,
  submitPracticeCode,
};
