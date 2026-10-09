const mongoose = require("mongoose");
const lessonCourseModel = require("../models/lession.course.model");

const courseModel = require("../models/course.model");
const sectionCourseModel = require("../models/section.course.model");

// jb multiple lessons create karna ho tb es function ka use karenge.
const createBulkLessons = async (req, res) => {
  try {
    const { lessons } = req.body;

    // Validate request
    if (!Array.isArray(lessons) || lessons.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a non-empty lessons array.",
      });
    }

    // Validate course and section IDs
    for (const lesson of lessons) {
      if (!mongoose.Types.ObjectId.isValid(lesson.course)) {
        return res.status(400).json({
          success: false,
          message: `Invalid course ID for lesson: ${lesson.title || "Unknown"}`,
        });
      }

      if (!mongoose.Types.ObjectId.isValid(lesson.section)) {
        return res.status(400).json({
          success: false,
          message: `Invalid section ID for lesson: ${lesson.title || "Unknown"}`,
        });
      }
    }

    // Check whether course and sections exist
    const courseId = lessons[0].course;

    const allSameCourse = lessons.every(
      (lesson) => lesson.course.toString() === courseId.toString(),
    );

    if (!allSameCourse) {
      return res.status(400).json({
        success: false,
        message: "All lessons must belong to the same course.",
      });
    }

    const sectionIds = [
      ...new Set(lessons.map((lesson) => lesson.section.toString())),
    ];

    const Course = mongoose.model("Course");
    const Section = mongoose.model("Section");

    const courseExists = await Course.exists({ _id: courseId });

    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    const existingSections = await Section.find({
      _id: { $in: sectionIds },
      course: courseId,
    })
      .select("_id")
      .lean();

    if (existingSections.length !== sectionIds.length) {
      return res.status(400).json({
        success: false,
        message:
          "One or more sections do not exist or belong to another course.",
      });
    }

    // Insert all lessons
    const createdLessons = await lessonCourseModel.insertMany(lessons);

    // Update section lesson counts and durations
    await Promise.all(
      sectionIds.map(async (sectionId) => {
        const sectionLessons = await lessonCourseModel
          .find({
            section: sectionId,
            isPublished: true,
          })
          .select("duration")
          .lean();

        const totalLessons = sectionLessons.length;

        const duration = sectionLessons.reduce(
          (total, lesson) => total + (lesson.duration || 0),
          0,
        );

        await Section.findByIdAndUpdate(sectionId, {
          $set: {
            totalLessons,
            duration,
          },
        });
      }),
    );

    return res.status(201).json({
      success: true,
      message: "Lessons created successfully.",
      count: createdLessons.length,
      lessons: createdLessons,
    });
  } catch (error) {
    console.error("Create Bulk Lessons Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create lessons.",
      error: error.message,
    });
  }
};

// =====================================================
// HELPER: UPDATE SECTION LESSON COUNT AND DURATION
// =====================================================

const updateSectionStats = async (sectionId) => {
  const lessons = await lessonCourseModel
    .find({
      section: sectionId,
      isPublished: true,
    })
    .select("duration")
    .lean();

  const totalLessons = lessons.length;

  const duration = lessons.reduce(
    (total, lesson) => total + (lesson.duration || 0),
    0,
  );

  await sectionCourseModel.findByIdAndUpdate(sectionId, {
    $set: {
      totalLessons,
      duration,
    },
  });
};

// =====================================================
// 1. CREATE LESSON
// =====================================================

const createLesson = async (req, res) => {
  try {
    const {
      course,
      section,
      title,
      description,
      order,
      type,
      status,
      videoId,
      duration,
      thumbnail,
      isPreview,
      isPublished,
      resources,
    } = req.body;

    // Required fields
    if (!course || !section || !title || order === undefined) {
      return res.status(400).json({
        success: false,
        message: "Course, section, title and order are required.",
      });
    }

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(course) ||
      !mongoose.Types.ObjectId.isValid(section)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid course or section ID.",
      });
    }

    // Validate title
    if (!title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Lesson title cannot be empty.",
      });
    }

    // Validate order
    if (!Number.isInteger(Number(order)) || Number(order) < 1) {
      return res.status(400).json({
        success: false,
        message: "Order must be a positive integer.",
      });
    }

    // Validate status
    const lessonStatus = status || "Coming Soon";

    if (!["Coming Soon", "Available"].includes(lessonStatus)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Coming Soon or Available.",
      });
    }

    // Available lesson must have video
    if (
      lessonStatus === "Available" &&
      !(typeof videoId === "string" && videoId.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Video ID is required to make a lesson available.",
      });
    }

    // Validate course
    const courseExists = await courseModel
      .findById(course)
      .select("_id")
      .lean();

    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    // Validate section belongs to course
    const sectionExists = await sectionCourseModel
      .findOne({
        _id: section,
        course,
      })
      .select("_id")
      .lean();

    if (!sectionExists) {
      return res.status(404).json({
        success: false,
        message: "Section not found for this course.",
      });
    }

    // Create lesson
    const lesson = await lessonCourseModel.create({
      course,
      section,
      title: title.trim(),
      description: description || "",
      order: Number(order),
      type: type || "video",
      status: lessonStatus,
      videoId: videoId || "",
      duration: Number(duration) || 0,
      thumbnail: thumbnail || "",
      isPreview: isPreview ?? false,
      isPublished: isPublished ?? true,
      resources: resources || [],
    });

    // Update section statistics
    await updateSectionStats(section);

    return res.status(201).json({
      success: true,
      message: "Lesson created successfully.",
      lesson,
    });
  } catch (error) {
    console.error("Create Lesson Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create lesson.",
      error: error.message,
    });
  }
};

// =====================================================
// 2. UPDATE EXISTING LESSON
// =====================================================

const updateLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const {
      title,
      description,
      order,
      type,
      status,
      videoId,
      duration,
      thumbnail,
      isPreview,
      isPublished,
      resources,
    } = req.body;

    // Validate lesson ID
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lesson ID.",
      });
    }

    // Find existing lesson
    const lesson = await lessonCourseModel.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found.",
      });
    }

    // Apply only fields that were sent
    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Lesson title cannot be empty.",
        });
      }

      lesson.title = title.trim();
    }

    if (description !== undefined) {
      lesson.description = description;
    }

    if (order !== undefined) {
      if (!Number.isInteger(Number(order)) || Number(order) < 1) {
        return res.status(400).json({
          success: false,
          message: "Order must be a positive integer.",
        });
      }

      lesson.order = Number(order);
    }

    if (type !== undefined) {
      if (!["video", "practice", "quiz", "assignment"].includes(type)) {
        return res.status(400).json({
          success: false,
          message: "Invalid lesson type.",
        });
      }

      lesson.type = type;
    }

    if (videoId !== undefined) {
      if (typeof videoId !== "string") {
        return res.status(400).json({
          success: false,
          message: "Video ID must be a string.",
        });
      }

      lesson.videoId = videoId.trim();
    }

    if (duration !== undefined) {
      if (!Number.isFinite(Number(duration)) || Number(duration) < 0) {
        return res.status(400).json({
          success: false,
          message: "Duration must be a non-negative number.",
        });
      }

      lesson.duration = Number(duration);
    }

    if (thumbnail !== undefined) {
      lesson.thumbnail = thumbnail;
    }

    if (isPreview !== undefined) {
      lesson.isPreview = isPreview;
    }

    if (isPublished !== undefined) {
      lesson.isPublished = isPublished;
    }

    if (resources !== undefined) {
      lesson.resources = resources;
    }

    // Validate new status
    if (status !== undefined) {
      if (!["Coming Soon", "Available"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid lesson status.",
        });
      }

      lesson.status = status;
    }

    // Available lessons must have a video ID
    if (lesson.status === "Available" && !lesson.videoId.trim()) {
      return res.status(400).json({
        success: false,
        message: "Add a video ID before making this lesson available.",
      });
    }

    await lesson.save();

    // Recalculate statistics for the section
    await updateSectionStats(lesson.section);

    return res.status(200).json({
      success: true,
      message: "Lesson updated successfully.",
      lesson,
    });
  } catch (error) {
    console.error("Update Lesson Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update lesson.",
      error: error.message,
    });
  }
};

// ========================================
// GET COURSES WITH SECTIONS FOR ADMIN
// ========================================

const getAdminCourseOptions = async (req, res) => {
  try {
    // Fetch all courses
    const courses = await courseModel
      .find({})
      .select("_id title slug status")
      .sort({ title: 1 })
      .lean();

    // Fetch all sections
    const sections = await sectionCourseModel
      .find({})
      .select("_id title order course totalLessons duration")
      .sort({ order: 1 })
      .lean();

    // Attach sections to their respective courses
    const coursesWithSections = courses.map((course) => {
      const courseSections = sections.filter(
        (section) => String(section.course) === String(course._id),
      );

      return {
        ...course,
        sections: courseSections,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Courses and sections fetched successfully.",
      count: coursesWithSections.length,
      courses: coursesWithSections,
    });
  } catch (error) {
    console.error("Get Admin Course Options Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses and sections.",
    });
  }
};

// =====================================================
// 3. GET ALL LESSONS FOR ADMIN
// =====================================================

const getAdminLessons = async (req, res) => {
  try {
    const { courseId, sectionId } = req.query;

    const filter = {};

    if (courseId) {
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid course ID.",
        });
      }

      filter.course = courseId;
    }

    if (sectionId) {
      if (!mongoose.Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid section ID.",
        });
      }

      filter.section = sectionId;
    }

    const lessons = await lessonCourseModel
      .find(filter)
      .populate("course", "title slug")
      .populate("section", "title order")
      .sort({ section: 1, order: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Lessons fetched successfully.",
      count: lessons.length,
      lessons,
    });
  } catch (error) {
    console.error("Get Admin Lessons Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lessons.",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE LESSON
// =====================================================

const deleteLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    // 1. Validate lesson ID
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lesson ID.",
      });
    }

    // 2. Find lesson
    const lesson = await lessonCourseModel.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found.",
      });
    }

    // Save section ID before deleting
    const sectionId = lesson.section;

    // 3. Delete lesson
    await lessonCourseModel.deleteOne({
      _id: lessonId,
    });

    // 4. Update section lesson count and duration
    await updateSectionStats(sectionId);

    return res.status(200).json({
      success: true,
      message: "Lesson deleted successfully.",
      deletedLessonId: lessonId,
    });
  } catch (error) {
    console.error("Delete Lesson Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete lesson.",
      error: error.message,
    });
  }
};

module.exports = {
  createLesson,
  updateLesson,
  getAdminLessons,
  deleteLesson,
  getAdminCourseOptions
};
