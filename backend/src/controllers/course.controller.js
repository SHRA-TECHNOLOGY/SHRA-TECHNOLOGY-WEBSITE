const userModel = require("../models/auth.model");
const courseModel = require("../models/course.model");
const enrollmentCourseModel = require("../models/enrollment.course.model");
const sectionCourseModel = require("../models/section.course.model");
const lessonCourseModel = require("../models/lession.course.model");
const progressCourseModel = require("../models/progress.course.model");
const { uploadImage } = require("../services/image.service");
const recentActivityModel = require("../models/recentActivity.model");
const getCourseDetails = require("../services/courseDetails.service");

const { updateStreak } = require("../utils/updateStreak");

const slugify = require("slugify");

// create course code here

async function createCourse(req, res) {
  const {
    courseTitle,
    courseSubTitle,
    description,
    category,
    language,
    level,
    pricing,
    tags,
  } = req.body;

  try {
    // generate slug

    const slug = slugify(courseTitle, {
      lower: true,
      strict: true,
    });

    const existingCourse = await courseModel.findOne({ slug });

    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: "Course already exists.",
      });
    }

    // take url from imageKit
    let thumbnail = "";
    const uploaded = await uploadImage(req.file);

    thumbnail = uploaded.url;

    const course = await courseModel.create({
      title: courseTitle,
      slug,
      subtitle: courseSubTitle,
      description,
      category,
      language,
      level,
      pricing: {
        type: "Paid",
        originalPrice: 999,
        price: pricing,
      },
      tags,
      thumbnail,
      instructor: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//fetch All course

async function allCourse(req, res) {
  try {
    const courses = await courseModel
      .find({ status: "Published" })
      .select(
        "title seriesName slug thumbnail description category language level pricing duration averageRating totalStudents tags",
      );

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully.",
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// specific course details

async function courseByCourseId(req, res) {
  try {
    const { courseId } = req.params;

    const user_id = req.user.id;

    const data = await getCourseDetails({ courseId, user_id });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// all course by one user

// Get all enrolled courses of a particular user

async function allCoursesByUser(req, res) {
  try {
    const { userId } = req.params;
    const loggedInUserId = req.user.id;

    // ==========================================
    // USER VERIFY
    // ==========================================

    if (String(userId) !== String(loggedInUserId)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access denied!",
      });
    }

    // ==========================================
    // ALL ENROLLMENTS
    // ==========================================

    const enrollments = await enrollmentCourseModel
      .find({
        user: userId,
      })
      .select("course status")
      .populate({
        path: "course",
        select: "_id title description thumbnail",
      })
      .lean();

    // ==========================================
    // COURSE IDS
    // ==========================================

    const courseIds = enrollments.map((enrollment) => enrollment.course._id);

    // ==========================================
    // ALL COURSE PROGRESS
    // ==========================================

    const progressData = await progressCourseModel
      .find({
        user: userId,
        course: { $in: courseIds },
      })
      .select("course progress")
      .lean();

    // ==========================================
    // ENROLLMENT + PROGRESS COMBINE
    // ==========================================

    const courses = enrollments.map((enrollment) => {
      const progress = progressData.find(
        (item) => item.course.toString() === enrollment.course._id.toString(),
      );

      return {
        course: enrollment.course,
        enrollmentStatus: enrollment.status,

        progress: progress?.progress || 0,
      };
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//temporary add section data function here

async function addLesson(req, res) {
  const lessons = await lessonCourseModel.insertMany(req.body);

  res.status(201).json({
    success: true,
    message: "Lessons created successfully",
    lessons,
  });
}

// when user clicked lesson open

async function getLessonUrl(req, res) {
  const { courseId } = req.params;
  const { lessonId } = req.body;

  try {
    // 1. Validate course
    const course = await courseModel
      .findOne({
        _id: courseId,
        status: "Published",
      })
      .select("_id")
      .lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    // 2. Fetch lesson
    const lesson = await lessonCourseModel
      .findOne({
        _id: lessonId,
        course: course._id,
        isPublished: true,
      })
      .select("videoId isPreview status")
      .lean();

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found.",
      });
    }

    // 3. Block Coming Soon lessons
    if (lesson.status !== "Available") {
      return res.status(403).json({
        success: false,
        code: "LESSON_COMING_SOON",
        message: "This lesson is coming soon. Please check back later.",
      });
    }

    // 4. Check whether video is available
    if (!lesson.videoId || !lesson.videoId.trim()) {
      return res.status(404).json({
        success: false,
        code: "VIDEO_NOT_AVAILABLE",
        message: "Video is not available for this lesson yet.",
      });
    }

    // 5. Allow preview lessons without enrollment
    if (lesson.isPreview) {
      return res.status(200).json({
        success: true,
        message: "Preview lesson accessed successfully.",
        videoUrl: lesson.videoId,
      });
    }

    // 6. Check active enrollment
    const enrollment = await enrollmentCourseModel
      .findOne({
        user: req.user.id,
        course: course._id,
        status: "Active",
      })
      .select("_id")
      .lean();

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        code: "COURSE_NOT_ENROLLED",
        message: "Please enroll in this course to access this lesson.",
        courseId: course._id,
      });
    }

    // 7. Return video URL
    return res.status(200).json({
      success: true,
      message: "Lesson video fetched successfully.",
      videoUrl: lesson.videoId,
    });
  } catch (error) {
    console.error("Get Lesson URL Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lesson video.",
    });
  }
}

// enroll course function here

async function enrollCourse(req, res) {
  try {
    const { courseId } = req.params;

    const course = await courseModel
      .findOne({ _id: courseId })
      .select("_id title pricing.type");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course is not found !",
      });
    }

    const user_id = req.user.id;

    const existingEnrollment = await enrollmentCourseModel.findOne({
      user: user_id,
      course: course._id,
    });

    if (existingEnrollment) {
      return res.status(200).json({
        success: true,
        message: "You are already enrolled in this course",
      });
    }

    if (course.pricing.type === "Paid") {
      return res.status(403).json({
        success: false,
        message: "Please make payment to enroll in this course",
      });
    }

    // enroll the user in the course
    const enroll = await enrollmentCourseModel.create({
      user: user_id,
      course: course._id,
      enrollmentType: course.pricing.type,
    });

    // record recent activity for course enrollment
    await recentActivityModel.create({
      user: user_id,
      type: "course_enrolled",
      title: `Enrolled in course: ${course.title}`,
      description: `You have successfully enrolled in the course "${course.title}".`,
      course: course._id,
    });

    return res.status(201).json({
      success: true,
      message: "Course enrolled successful",
      enroll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ==========================================
// UPDATE / SAVE COURSE PROGRESS
// ==========================================

async function updateCourseProgress(req, res) {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const { lessonId, sectionId, currentTime, completed } = req.body;

    // ==========================================
    // 1. COURSE VERIFY
    // ==========================================

    const course = await courseModel
      .findOne({
        _id: courseId,
        status: "Published",
      })
      .select("_id")
      .lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // ==========================================
    // 2. ENROLLMENT VERIFY
    // ==========================================

    const enrollment = await enrollmentCourseModel
      .findOne({
        user: userId,
        course: courseId,
        status: "Active",
      })
      .select("_id")
      .lean();

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: "Please enroll in this course",
      });
    }

    // ==========================================
    // 3. TOTAL LESSONS
    // ==========================================

    const totalLessons = await lessonCourseModel.countDocuments({
      course: courseId,
    });

    // ==========================================
    // 4. OLD PROGRESS
    // ==========================================

    const oldProgress = await progressCourseModel
      .findOne({
        user: userId,
        course: courseId,
      })
      .lean();

    // ==========================================
    // 5. COMPLETED LESSONS
    // ==========================================

    let completedLessons = oldProgress?.completedLessons || [];

    // ==========================================
    // Agar lesson complete hua hai
    // toh ID completedLessons mein add hogi
    // ==========================================

    if (completed && lessonId) {
      const alreadyCompleted = completedLessons.some(
        (id) => id.toString() === lessonId.toString(),
      );

      if (!alreadyCompleted) {
        completedLessons = [...completedLessons, lessonId];
      }
    }

    // ==========================================
    // 6. COURSE PROGRESS CALCULATE
    // ==========================================

    const courseProgress =
      totalLessons > 0
        ? Math.round((completedLessons.length / totalLessons) * 100)
        : 0;

    // ==========================================
    // 7. COURSE COMPLETED?
    // ==========================================

    const isCourseCompleted =
      totalLessons > 0 && completedLessons.length >= totalLessons;

    // ==========================================
    // 8. SAVE / UPDATE PROGRESS
    // ==========================================

    const updateData = {
      currentSection: sectionId,
      currentLesson: lessonId,
      lastWatchedTime: currentTime,
      progress: courseProgress,
      lastAccessedAt: new Date(),
    };

    // ==========================================
    // IMPORTANT
    // Course ek baar complete ho gaya
    // toh false dobara nahi hona chahiye
    // ==========================================

    if (isCourseCompleted) {
      updateData.completed = true;
    } else if (!oldProgress?.completed) {
      updateData.completed = false;
    }

    const update = {
      $set: updateData,
    };

    // ==========================================
    // COMPLETED LESSON ADD
    // ==========================================

    if (completed && lessonId) {
      update.$addToSet = {
        completedLessons: lessonId,
      };
    }

    // ==========================================
    // SAVE
    // ==========================================

    const data = await progressCourseModel
      .findOneAndUpdate(
        {
          user: userId,
          course: courseId,
        },
        update,
        {
          returnDocument: "after",
          upsert: true,
        },
      )
      .lean();

    //==========================================
    // Streak Update
    //=========================================

    await updateStreak(req.user.id);

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message: "Course progress saved successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ==========================================
// GET ALL COURSES FOR ADMIN
// ==========================================

async function getAllCoursesAdmin(req, res) {
  try {
    const courses = await courseModel
      .find({})
      .select(
        "_id title subtitle slug description thumbnail category language level pricing duration averageRating totalStudents tags status createdAt updatedAt",
      )
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get Admin Courses Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
}

// =========================================
// UPDATE COURSE
// =========================================

async function updateCourse(req, res) {
  try {
    const { courseId } = req.params;

    const {
      courseTitle,
      courseSubTitle,
      description,
      category,
      language,
      level,
      pricing,
      tags,
      status,
    } = req.body;

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (courseTitle !== undefined) {
      course.title = courseTitle.trim();

      let slug = slugify(courseTitle, {
        lower: true,
        strict: true,
        trim: true,
      });

      const existing = await courseModel.findOne({
        slug,
        _id: { $ne: courseId },
      });

      if (existing) {
        slug = `${slug}-${Date.now()}`;
      }

      course.slug = slug;
    }

    if (courseSubTitle !== undefined) course.subtitle = courseSubTitle.trim();

    if (description !== undefined) course.description = description.trim();

    if (category !== undefined) course.category = category;

    if (language !== undefined) course.language = language;

    if (level !== undefined) course.level = level;

    if (pricing !== undefined) course.pricing.price = pricing;

    if (tags !== undefined) course.tags = tags;

    if (status !== undefined) course.status = status;

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error("Update Course Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
}

// ==========================================
// DELETE COURSE
// ==========================================

async function deleteCourse(req, res) {
  try {
    const { courseId } = req.params;

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await courseModel.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete Course Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
}

// ==========================================
// TOGGLE COURSE STATUS
// ==========================================

async function toggleCourseStatus(req, res) {
  try {
    const { courseId } = req.params;

    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    course.status = course.status === "Published" ? "Draft" : "Published";

    await course.save();

    return res.status(200).json({
      success: true,
      message: `Course ${course.status.toLowerCase()} successfully`,
      status: course.status,
    });
  } catch (error) {
    console.error("Toggle Course Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update course status",
      error: error.message,
    });
  }
}

module.exports = {
  createCourse,
  allCourse,
  courseByCourseId,
  allCoursesByUser,
  enrollCourse,
  addLesson,
  getLessonUrl,
  updateCourseProgress,

  // Admin
  getAllCoursesAdmin,
  updateCourse,
  deleteCourse,
  toggleCourseStatus,
};
