const { Router } = require("express");
const courseController = require("../controllers/course.controller");
const { isAlreadyReg } = require("../middlewares/isAlreadyReg.middleware");
const isAdmin = require("../middlewares/isAdmin");
const multer = require("multer");

const createCourseValidation = require("../validator/course.validator");

const courseRouter = Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

//Create course api here
courseRouter.post(
  "/create-course",
  isAlreadyReg,
  isAdmin,
  createCourseValidation,
  upload.single("thumbnail"),
  courseController.createCourse,
);

// Fetch all course api
courseRouter.get("/courses", courseController.allCourse);

// particular course fetch by courseId api
courseRouter.get(
  "/course/:courseId",
  isAlreadyReg,
  courseController.courseByCourseId,
);

// particular course fetch by user api
courseRouter.post(
  "/user-course/:userId",
  isAlreadyReg,
  courseController.allCoursesByUser,
);

// temp add section api
courseRouter.post(
  "/course/add-lesson",
  isAlreadyReg,
  isAdmin,
  courseController.addLesson,
);

// get lesson url api
courseRouter.post(
  "/course/:courseId",
  isAlreadyReg,
  courseController.getLessonUrl,
);

// Course Enroll api
courseRouter.post(
  "/course-enroll/:courseId",
  isAlreadyReg,
  courseController.enrollCourse,
);

// Save & Update course progress api

courseRouter.post(
  "/course-progress/:courseId",
  isAlreadyReg,
  courseController.updateCourseProgress,
);

courseRouter.get(
  "/courses/admin/all",
  isAlreadyReg,
  isAdmin,
  courseController.getAllCoursesAdmin,
);

courseRouter.put(
  "/courses/admin/:courseId",
  isAlreadyReg,
  isAdmin,
  courseController.updateCourse,
);

courseRouter.delete(
  "/courses/admin/:courseId",
  isAlreadyReg,
  isAdmin,
  courseController.deleteCourse,
);


courseRouter.patch(
  "/courses/admin/:courseId/status",
  isAlreadyReg,
  isAdmin,
  courseController.toggleCourseStatus,
);

module.exports = courseRouter;
