const {Router} = require('express')
const lessonController = require('../controllers/lesson.controller')
const {isAlreadyReg} = require('../middlewares/isAlreadyReg.middleware')
const isAdmin = require('../middlewares/isAdmin')

const lessonRouter = Router()

// multiple lessons create  route api

// lessonRouter.post("/admin/create-lessons",isAlreadyReg,isAdmin,lessonController.createBulkLessons)

// Create new lesson
lessonRouter.post(
    "/admin/lessons",
    isAlreadyReg,
    isAdmin,
    lessonController.createLesson
);

// Update existing lesson
lessonRouter.patch(
    "/admin/lessons/:lessonId",
    isAlreadyReg,
    isAdmin,
    lessonController.updateLesson
);

// Get all lessons for admin
lessonRouter.get(
    "/admin/lessons",
    isAlreadyReg,
    isAdmin,
    lessonController.getAdminLessons
);

// Delete lesson
lessonRouter.delete(
    "/admin/lessons/:lessonId",
    isAlreadyReg,
    isAdmin,
    lessonController.deleteLesson
);

// option for course

lessonRouter.get(
    "/admin/course-options",
    isAlreadyReg,
    isAdmin,
    lessonController.getAdminCourseOptions
);

module.exports = lessonRouter