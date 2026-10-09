const mongoose = require("mongoose");
const sectionCourseModel = require("../models/section.course.model");

// ==========================================
// CREATE C LANGUAGE SECTIONS
// only api hit kar ke db mein save kar skte hai.
// ==========================================

const createCLanguageSections = async (req, res) => {
    try {

        // ==========================================
        // COURSE ID
        // ==========================================

        const courseId = "6a804a9918e5f8dd847c7cf0";


        // ==========================================
        // VALIDATE COURSE ID
        // ==========================================

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID.",
            });
        }


        // ==========================================
        // CHECK EXISTING SECTIONS
        // ==========================================

        const existingSections =
            await sectionCourseModel.countDocuments({
                course: courseId,
            });

        if (existingSections > 0) {
            return res.status(409).json({
                success: false,
                message:
                    "Sections for this course already exist.",
                count: existingSections,
            });
        }


        // ==========================================
        // SECTION DATA
        // ==========================================

        const sectionsData = [

            {
                course: courseId,

                title:
                    "C Fundamentals",

                description:
                    "Learn the fundamentals of C programming including introduction, setup, variables, data types and operators.",

                order: 1,

                isPublished: true,
            },


            {
                course: courseId,

                title:
                    "Control Flow & Loops",

                description:
                    "Learn decision making, switch statements, loops and programming logic.",

                order: 2,

                isPublished: true,
            },


            {
                course: courseId,

                title:
                    "Functions, Arrays & Strings",

                description:
                    "Learn functions, recursion, arrays, matrices and string handling in C.",

                order: 3,

                isPublished: true,
            },


            {
                course: courseId,

                title:
                    "Pointers, Structures & Memory Management",

                description:
                    "Master pointers, structures, unions, enums and dynamic memory allocation.",

                order: 4,

                isPublished: true,
            },


            {
                course: courseId,

                title:
                    "File Handling",

                description:
                    "Learn file handling and combine files with structures to manage real-world records.",

                order: 5,

                isPublished: true,
            },


            {
                course: courseId,

                title:
                    "Revision, Mini Project & Final Evaluation",

                description:
                    "Revise C programming, solve problems, build a mini project and complete the final evaluation.",

                order: 6,

                isPublished: true,
            },

        ];


        // ==========================================
        // INSERT ALL SECTIONS
        // ==========================================

        const sections =
            await sectionCourseModel.insertMany(
                sectionsData
            );


        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(201).json({

            success: true,

            message:
                "C Language sections created successfully.",

            count: sections.length,

            sections,

        });

    } catch (error) {

        console.error(
            "Create C Language Sections Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to create C Language sections.",

            error: error.message,

        });

    }
};


module.exports = {
    createCLanguageSections,
};