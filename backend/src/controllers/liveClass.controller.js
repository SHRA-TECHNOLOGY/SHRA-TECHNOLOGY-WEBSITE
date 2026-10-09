const mongoose = require("mongoose");

const liveClassModel = require("../models/liveClass.model");
const courseModel = require("../models/course.model");
const sectionModel = require("../models/section.course.model");
const lessonModel = require("../models/lession.course.model");
const authModel = require("../models/auth.model");

// =====================================================
// ADMIN - CREATE LIVE CLASS
// =====================================================

const createLiveClass = async (req, res) => {
  try {
    const {
      course,
      section,
      lesson,
      teacher,
      title,
      description,
      thumbnail,
      platform,
      meetingLink,
      meetingId,
      meetingPassword,
      scheduledAt,
      duration,
      maxStudents,
      recordingUrl,
      isRecordingAvailable,
      isPublished,
    } = req.body;

    // =================================================
    // AUTH CHECK
    // =================================================

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    // =================================================
    // BASIC VALIDATION
    // =================================================

    if (
      !course ||
      !title?.trim() ||
      !meetingLink?.trim() ||
      !scheduledAt ||
      !duration
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Course, title, meeting link, scheduled date and duration are required",
      });
    }

    // =================================================
    // VALIDATE COURSE ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID",
      });
    }

    // =================================================
    // COURSE CHECK
    // =================================================

    const courseData = await courseModel.findById(course);

    if (!courseData) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // =================================================
    // SECTION CHECK
    // =================================================

    if (section) {
      if (!mongoose.Types.ObjectId.isValid(section)) {
        return res.status(400).json({
          success: false,
          message: "Invalid section ID",
        });
      }

      const sectionData = await sectionModel.findById(section);

      if (!sectionData) {
        return res.status(404).json({
          success: false,
          message: "Section not found",
        });
      }
    }

    // =================================================
    // LESSON CHECK
    // =================================================

    if (lesson) {
      if (!mongoose.Types.ObjectId.isValid(lesson)) {
        return res.status(400).json({
          success: false,
          message: "Invalid lesson ID",
        });
      }

      const lessonData = await lessonModel.findById(lesson);

      if (!lessonData) {
        return res.status(404).json({
          success: false,
          message: "Lesson not found",
        });
      }
    }

    // =================================================
    // TEACHER
    // =================================================

    let teacherId = userId;

    if (teacher) {
      if (!mongoose.Types.ObjectId.isValid(teacher)) {
        return res.status(400).json({
          success: false,
          message: "Invalid teacher ID",
        });
      }

      const teacherData = await authModel
        .findById(teacher)
        .select("_id fullName name role");

      if (!teacherData) {
        return res.status(404).json({
          success: false,
          message: "Teacher not found",
        });
      }

      teacherId = teacher;
    }

    // =================================================
    // PLATFORM VALIDATION
    // =================================================

    const allowedPlatforms = ["Google Meet", "Zoom", "Custom"];

    const selectedPlatform = platform || "Google Meet";

    if (!allowedPlatforms.includes(selectedPlatform)) {
      return res.status(400).json({
        success: false,
        message: "Invalid live class platform",
      });
    }

    // =================================================
    // DATE VALIDATION
    // =================================================

    const classDate = new Date(scheduledAt);

    if (Number.isNaN(classDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid scheduled date",
      });
    }

    if (classDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Live class scheduled time must be in the future",
      });
    }

    // =================================================
    // DURATION VALIDATION
    // =================================================

    const classDuration = Number(duration);

    if (!Number.isFinite(classDuration) || classDuration <= 0) {
      return res.status(400).json({
        success: false,
        message: "Duration must be greater than 0 minutes",
      });
    }

    // =================================================
    // MAX STUDENTS
    // =================================================

    const studentLimit = maxStudents !== undefined ? Number(maxStudents) : 500;

    if (!Number.isFinite(studentLimit) || studentLimit <= 0) {
      return res.status(400).json({
        success: false,
        message: "Maximum students must be greater than 0",
      });
    }

    // =================================================
    // CREATE
    // =================================================

    const liveClass = await liveClassModel.create({
      course,

      section: section || null,

      lesson: lesson || null,

      teacher: teacherId,

      title: title.trim(),

      description: description?.trim() || "",

      thumbnail: thumbnail?.trim() || "",

      platform: selectedPlatform,

      meetingLink: meetingLink.trim(),

      meetingId: meetingId?.trim() || "",

      meetingPassword: meetingPassword?.trim() || "",

      scheduledAt: classDate,

      duration: classDuration,

      maxStudents: studentLimit,

      status: "Upcoming",

      recordingUrl: recordingUrl?.trim() || "",

      isRecordingAvailable: Boolean(isRecordingAvailable),

      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    });

    // =================================================
    // POPULATE
    // =================================================

    const populatedClass = await liveClassModel
      .findById(liveClass._id)
      .populate("course", "title slug")
      .populate("section", "title slug order")
      .populate("lesson", "title slug")
      .populate("teacher", "fullName name email profileImage")
      .lean();

    return res.status(201).json({
      success: true,

      message: "Live class created successfully",

      liveClass: populatedClass,
    });
  } catch (error) {
    console.error("Create Live Class Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to create live class",

      error: error.message,
    });
  }
};

// =====================================================
// USER / STUDENT - FETCH LIVE CLASSES
// =====================================================

const getLiveClasses = async (req, res) => {
  try {
    // =================================================
    // FETCH PUBLISHED CLASSES
    // =================================================

    const liveClasses = await liveClassModel
      .find({
        isPublished: true,
      })
      .populate("course", "title slug thumbnail")
      .populate("teacher", "fullName name profileImage")
      .populate("section", "title slug order")
      .populate("lesson", "title slug")
      .sort({
        scheduledAt: 1,
      })
      .lean();

    // =================================================
    // UPDATE STATUS ACCORDING TO CURRENT TIME
    // =================================================

    const currentTime = new Date();

    for (const liveClass of liveClasses) {
      const startTime = new Date(liveClass.scheduledAt);

      const endTime = new Date(
        startTime.getTime() + Number(liveClass.duration) * 60 * 1000,
      );

      // =============================================
      // UPCOMING → LIVE
      // =============================================

      if (
        liveClass.status === "Upcoming" &&
        currentTime >= startTime &&
        currentTime < endTime
      ) {
        await liveClassModel.findByIdAndUpdate(liveClass._id, {
          $set: {
            status: "Live",
          },
        });

        liveClass.status = "Live";
      }

      // =============================================
      // UPCOMING → COMPLETED
      // =============================================
      else if (liveClass.status === "Upcoming" && currentTime >= endTime) {
        await liveClassModel.findByIdAndUpdate(liveClass._id, {
          $set: {
            status: "Completed",
          },
        });

        liveClass.status = "Completed";
      }

      // =============================================
      // LIVE → COMPLETED
      // =============================================
      else if (liveClass.status === "Live" && currentTime >= endTime) {
        await liveClassModel.findByIdAndUpdate(liveClass._id, {
          $set: {
            status: "Completed",
          },
        });

        liveClass.status = "Completed";
      }
    }

    // =================================================
    // UPCOMING
    // =================================================

    const upcoming = liveClasses.filter(
      (item) => item.status === "Upcoming" || item.status === "Live",
    );

    // =================================================
    // PREVIOUS
    // =================================================

    const previous = liveClasses.filter((item) => item.status === "Completed");

    return res.status(200).json({
      success: true,

      message: "Live classes fetched successfully",

      upcoming,

      previous,

      count: liveClasses.length,
    });
  } catch (error) {
    console.error("Get Live Classes Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch live classes",

      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE LIVE CLASS
// =====================================================

const getLiveClassById = async (req, res) => {
  try {
    const { liveClassId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(liveClassId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid live class ID",
      });
    }

    const liveClass = await liveClassModel
      .findOne({
        _id: liveClassId,
        isPublished: true,
      })
      .populate("course", "title slug thumbnail description")
      .populate("teacher", "fullName name email profileImage")
      .populate("section", "title slug order")
      .populate("lesson", "title slug")
      .lean();

    if (!liveClass) {
      return res.status(404).json({
        success: false,

        message: "Live class not found",
      });
    }

    return res.status(200).json({
      success: true,

      message: "Live class fetched successfully",

      liveClass,
    });
  } catch (error) {
    console.error("Get Live Class By ID Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch live class",

      error: error.message,
    });
  }
};

// =====================================================
// ADMIN - GET ALL LIVE CLASSES
// =====================================================

const getAllLiveClassesAdmin = async (req, res) => {
  try {
    const liveClasses = await liveClassModel
      .find({})
      .populate("course", "title slug")
      .populate("teacher", "fullName name email")
      .populate("section", "title slug order")
      .populate("lesson", "title slug")
      .sort({
        scheduledAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,

      message: "All live classes fetched successfully",

      count: liveClasses.length,

      liveClasses,
    });
  } catch (error) {
    console.error("Get All Live Classes Admin Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch live classes",

      error: error.message,
    });
  }
};

// =====================================================
// ADMIN - ADD / UPDATE RECORDING
// =====================================================

const updateLiveClassRecording = async (req, res) => {
  try {
    const { liveClassId } = req.params;
    const { recordingUrl } = req.body;

    // ==========================================
    // AUTH CHECK
    // ==========================================

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    // ==========================================
    // ID VALIDATION
    // ==========================================

    if (!mongoose.Types.ObjectId.isValid(liveClassId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid live class ID",
      });
    }

    // ==========================================
    // RECORDING URL VALIDATION
    // ==========================================

    if (!recordingUrl?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Recording URL is required",
      });
    }

    // ==========================================
    // FIND CLASS
    // ==========================================

    const liveClass = await liveClassModel.findById(liveClassId);

    if (!liveClass) {
      return res.status(404).json({
        success: false,
        message: "Live class not found",
      });
    }

    // ==========================================
    // ONLY COMPLETED CLASS
    // ==========================================

    if (liveClass.status !== "Completed") {
      return res.status(400).json({
        success: false,
        message:
          "Recording can only be added after the live class is completed",
      });
    }

    // ==========================================
    // UPDATE RECORDING
    // ==========================================

    liveClass.recordingUrl = recordingUrl.trim();

    liveClass.isRecordingAvailable = true;

    await liveClass.save();

    // ==========================================
    // POPULATE
    // ==========================================

    const updatedClass = await liveClassModel
      .findById(liveClass._id)
      .populate("course", "title slug")
      .populate("teacher", "fullName name email profileImage")
      .populate("section", "title slug order")
      .populate("lesson", "title slug")
      .lean();

    return res.status(200).json({
      success: true,

      message: "Recording added successfully",

      liveClass: updatedClass,
    });
  } catch (error) {
    console.error("Update Live Class Recording Error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to update recording",

      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createLiveClass,

  getLiveClasses,

  getLiveClassById,

  getAllLiveClassesAdmin,
  updateLiveClassRecording
};
