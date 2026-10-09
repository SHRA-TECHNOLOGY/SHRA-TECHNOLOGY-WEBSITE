const { Router } = require("express");

const testController = require("../controllers/test.controller");

const {
    isAlreadyReg
} = require("../middlewares/isAlreadyReg.middleware");

const isAdmin =
    require("../middlewares/isAdmin");

const {
    checkCourseEnrollment,
} = require("../middlewares/checkCourseEnrollment");

// const {
//     checkResultCourseEnrollment,
// } = require("../middlewares/checkResultCourseEnrollment");


const testRouter = Router();


// ==========================================
// CREATE TEST
// ==========================================

testRouter.post(
    "/create-test",
    isAlreadyReg,
    testController.createSubjectTest
);


// ==========================================
// ALL TESTS
// ==========================================

testRouter.post(
    "/tests",
    isAlreadyReg,
    testController.getAllCourseTests
);


// ==========================================
// SUBMIT TEST
// ==========================================

testRouter.post(
    "/tests/attempt/submit",
    isAlreadyReg,
    testController.submitTest
);


// ==========================================
// COURSE TESTS
// ==========================================

testRouter.post(
    "/tests/:courseId",
    isAlreadyReg,
    testController.getSpecificCourseTest
);


// ==========================================
// SINGLE TEST
// ==========================================

testRouter.post(
    "/tests/:courseId/:slug",
    isAlreadyReg,
    testController.getSpecificTest
);


// ==========================================
// TEST INSTRUCTION
// ==========================================

testRouter.post(
    "/tests/instruction/:courseId/:slug",
    isAlreadyReg,
    testController.getInstructionTest
);


// ==========================================
// ACTUAL TEST ATTEMPT
// ==========================================

testRouter.post(
    "/tests/attempt/:courseId/:slug",
    isAlreadyReg,
    testController.getQuestionsTest
);


// ==========================================
// RESULT
// ==========================================

testRouter.post(
    "/test/result/:resultId",
    isAlreadyReg,
    testController.resultDeclarationTest
);


// ==========================================
// REVIEW
// ==========================================

testRouter.post(
    "/test/review/:resultId",
    isAlreadyReg,
    testController.reviewTest
);


// ==========================================
// LEADERBOARD
// ==========================================

testRouter.get(
    "/leaderboard/xp",
    isAlreadyReg,
    testController.getTestXPLeaderboard
);


// ==========================================
// ADMIN
// ==========================================

testRouter.post(
    "/single-question",
    isAlreadyReg,
    isAdmin,
    testController.createQuestion
);

testRouter.post(
    "/multiple-questions",
    isAlreadyReg,
    isAdmin,
    testController.createQuestions
);


module.exports = testRouter;