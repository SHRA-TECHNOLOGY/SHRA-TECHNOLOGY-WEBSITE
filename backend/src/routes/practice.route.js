const { Router } = require("express");

const practiceController =
    require("../controllers/practice.controller");

const {
    isAlreadyReg
} = require("../middlewares/isAlreadyReg.middleware");

const isAdmin =
    require("../middlewares/isAdmin");

const {
    checkCourseEnrollment,
} = require("../middlewares/checkCourseEnrollment");


const practiceRouter = Router();


// ==========================================
// ADMIN - ADD PRACTICE SET
// ==========================================

practiceRouter.post(
    "/add-practice-set",
    isAlreadyReg,
    isAdmin,
    practiceController.addPracticeSet
);


// ==========================================
// PRACTICE HOME
// User can explore all problems
// ==========================================

practiceRouter.get(
    "/practice",
    isAlreadyReg,
    practiceController.getAllPractice
);


// ==========================================
// COURSE PRACTICE SET
// User can view problems without enrollment
// ==========================================

practiceRouter.get(
    "/practice/:slug",
    isAlreadyReg,
    practiceController.getCourseAllProblem
);


// ==========================================
// SINGLE PRACTICE PROBLEM
// User can VIEW the problem
// Enrollment is NOT required here
// ==========================================

practiceRouter.get(
    "/practice/:slug/:problemSlug",
    isAlreadyReg,
    practiceController.getSingleProblem
);


// ==========================================
// RUN CODE
// Enrollment REQUIRED
// ==========================================

practiceRouter.post(
    "/practice/run",
    isAlreadyReg,
    checkCourseEnrollment,
    practiceController.runPracticeCode
);


// ==========================================
// SUBMIT CODE
// Enrollment REQUIRED
// ==========================================

practiceRouter.post(
    "/practice/submit",
    isAlreadyReg,
    checkCourseEnrollment,
    practiceController.submitPracticeCode
);


module.exports = practiceRouter;