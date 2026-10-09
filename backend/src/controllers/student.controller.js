const userModel = require("../models/auth.model");
const enrollmentCourseModel = require("../models/enrollment.course.model");


// ======================================================
// GET ALL STUDENTS
// ======================================================

const getAllStudents = async (req, res) => {
    try {

        // Get all students
        const students = await userModel
            .find({
                role: "student",
            })
            .select("_id fullName email")
            .sort({ createdAt: -1 })
            .lean();


        // Get course count for every student
        const studentsWithDetails = await Promise.all(

            students.map(async (student) => {

                const courseCount =
                    await enrollmentCourseModel.countDocuments({
                        user: student._id,
                    });


                return {
                    _id: student._id,

                    name: student.fullName || "Unknown Student",

                    email: student.email,

                    courseCount: courseCount,

                    // Attendance abhi 0 rakha hai
                    // Actual attendance model connect karne ke baad
                    // yaha real percentage aayega.
                    attendance: 0,
                };
            })
        );


        return res.status(200).json({
            success: true,

            message: "Students fetched successfully",

            count: studentsWithDetails.length,

            students: studentsWithDetails,
        });


    } catch (error) {

        console.error(
            "Get All Students Error:",
            error
        );


        return res.status(500).json({
            success: false,

            message: "Failed to fetch students",

            error: error.message,
        });
    }
};


module.exports = {
    getAllStudents,
};