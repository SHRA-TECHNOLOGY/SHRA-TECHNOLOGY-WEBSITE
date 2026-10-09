const mongoose = require("mongoose");

const enrollmentCourseModel = require("../models/enrollment.course.model");
const practiceModel = require("../models/practice.model");
const testModel = require("../models/test.model");


// ==========================================
// CHECK COURSE ENROLLMENT
// ==========================================

const checkCourseEnrollment = async (req, res, next) => {

    try {

        // ==========================================
        // USER
        // ==========================================

        const userId = req.user?.id;

        if (!userId) {

            return res.status(401).json({
                success: false,
                code: "AUTH_REQUIRED",
                message: "Login is required.",
            });

        }


        // ==========================================
        // COURSE ID
        // ==========================================

        let courseId =
            req.params?.courseId ||
            req.body?.courseId ||
            null;


        // ==========================================
        // TEST / COURSE ROUTE
        // ==========================================

        if (courseId) {

            if (
                !mongoose.Types.ObjectId.isValid(courseId)
            ) {

                return res.status(400).json({
                    success: false,
                    code: "INVALID_COURSE_ID",
                    message: "Invalid course ID.",
                });

            }

        }


        // ==========================================
        // PRACTICE
        //
        // /practice/:slug/:problemSlug
        // ==========================================

        if (
            !courseId &&
            req.params?.problemSlug
        ) {

            const problem =
                await practiceModel
                    .findOne({
                        slug: req.params.problemSlug,
                        isPublished: true,
                    })
                    .select("course")
                    .lean();


            if (!problem) {

                return res.status(404).json({
                    success: false,
                    code: "PRACTICE_NOT_FOUND",
                    message: "Practice problem not found.",
                });

            }


            courseId = problem.course;

        }


        // ==========================================
        // PRACTICE RUN / SUBMIT
        //
        // Body:
        // {
        //     problemId: "..."
        // }
        // ==========================================

        if (
            !courseId &&
            req.body?.problemId
        ) {

            const problem =
                await practiceModel
                    .findOne({
                        _id: req.body.problemId,
                        isPublished: true,
                    })
                    .select("course")
                    .lean();


            if (!problem) {

                return res.status(404).json({
                    success: false,
                    code: "PRACTICE_NOT_FOUND",
                    message: "Practice problem not found.",
                });

            }


            courseId = problem.course;

        }


        // ==========================================
        // TEST
        //
        // If courseId is not directly available
        // and test slug is available
        // ==========================================

        if (
            !courseId &&
            (
                req.params?.testSlug ||
                req.params?.slug
            )
        ) {

            const testSlug =
                req.params.testSlug ||
                req.params.slug;


            const test =
                await testModel
                    .findOne({
                        slug: testSlug,
                        isPublished: true,
                    })
                    .select("course")
                    .lean();


            if (!test) {

                return res.status(404).json({
                    success: false,
                    code: "TEST_NOT_FOUND",
                    message: "Test not found.",
                });

            }


            courseId = test.course;

        }


        // ==========================================
        // COURSE ID REQUIRED
        // ==========================================

        if (!courseId) {

            return res.status(400).json({
                success: false,
                code: "COURSE_REQUIRED",
                message: "Course information is required.",
            });

        }


        // ==========================================
        // VALIDATE COURSE ID
        // ==========================================

        if (
            !mongoose.Types.ObjectId.isValid(courseId)
        ) {

            return res.status(400).json({
                success: false,
                code: "INVALID_COURSE_ID",
                message: "Invalid course ID.",
            });

        }


        // ==========================================
        // CHECK ENROLLMENT
        // ==========================================

        const enrollment =
            await enrollmentCourseModel
                .findOne({
                    user: userId,
                    course: courseId,
                })
                .lean();


        // ==========================================
        // NOT ENROLLED
        // ==========================================

        if (!enrollment) {

            return res.status(403).json({

                success: false,

                code: "COURSE_NOT_ENROLLED",

                message:
                    "Please enroll in this course before attempting this test or practice.",

                courseId,

            });

        }


        // ==========================================
        // ENROLLED
        // ==========================================

        req.courseId = courseId;

        req.enrollment = enrollment;


        // ==========================================
        // CONTINUE
        // ==========================================

        next();

    } catch (error) {

        console.error(
            "Course Enrollment Check Error:",
            error
        );

        return res.status(500).json({

            success: false,

            code: "ENROLLMENT_CHECK_FAILED",

            message:
                "Failed to verify course enrollment.",

        });

    }

};


module.exports = {
    checkCourseEnrollment,
};