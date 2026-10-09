const razorpay = require("../services/razorpay.service");
const crypto = require("crypto");

const courseModel = require("../models/course.model");
const enrollmentCourseModel = require("../models/enrollment.course.model");
const paymentHistoryModel = require("../models/paymentHistory.model");
const recentActivityModel = require("../models/recentActivity.model");


// =====================================================
// CREATE COURSE ORDER
// =====================================================

async function createCourseOrderController(req, res) {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // ================================================
    // FIND COURSE
    // ================================================

    const course = await courseModel
      .findById(courseId)
      .select("title description pricing status");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // ================================================
    // COURSE PUBLISHED CHECK
    // ================================================

    if (course.status !== "Published") {
      return res.status(400).json({
        success: false,
        message: "Course is not available",
      });
    }

    // ================================================
    // CHECK FREE COURSE
    // ================================================

    if (course.pricing.type === "Free") {
      return res.status(400).json({
        success: false,
        message: "This is a free course",
      });
    }

    // ================================================
    // COURSE PRICE
    // ================================================

    const amount = Number(course.pricing.price);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid course price",
      });
    }

    // ================================================
    // CHECK ALREADY ENROLLED
    // ================================================

    const existingEnrollment = await enrollmentCourseModel.findOne({
      user: req.user.id,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    // ================================================
    // RAZORPAY ORDER
    // ================================================

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `course_${Date.now()}`,

      notes: {
        userId: req.user.id.toString(),
        courseId: courseId.toString(),
      },
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,

      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },

      course: {
        id: course._id,
        title: course.title,
        price: amount,
        description: course.description,
      },
    });
  } catch (error) {
    console.error("Create Course Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
}

// =====================================================
// VERIFY COURSE PAYMENT
// =====================================================

async function verifyCoursePaymentController(req, res) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    // ================================================
    // VALIDATION
    // ================================================

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courseId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are required",
      });
    }

    // ================================================
    // VERIFY SIGNATURE
    // ================================================

    const expectedSignature = crypto
      .createHmac("sha256", process.env.TEST_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (razorpay_signature !== expectedSignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // ================================================
    // FIND COURSE
    // ================================================

    const course = await courseModel
      .findById(courseId)
      .select("title description pricing status");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // ================================================
    // CHECK ALREADY ENROLLED
    // ================================================

    const existingEnrollment = await enrollmentCourseModel.findOne({
      user: req.user.id,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this course",
      });
    }

    // ================================================
    // CREATE ENROLLMENT
    // ================================================

    const enrollment = await enrollmentCourseModel.create({
      user: req.user.id,

      course: courseId,

      enrollmentType: "Paid",

      paymentStatus: "Completed",

      paymentId: razorpay_payment_id,

      amountPaid: Number(course.pricing.price),

      status: "Active",
    });

    await recentActivityModel.create({
      user: req.user.id,
      type: "course_enrolled",
      title: `Enrolled in course: ${course.title}`,
      description: `You have successfully enrolled in the course "${course.title}".`,
      course: course._id,
    });

    // ================================================
    // PAYMENT HISTORY
    // ================================================

    const paymentHistory = await paymentHistoryModel.create({
      user: req.user.id,

      course: courseId,

      amount: Number(course.pricing.price),

      currency: "INR",

      orderId: razorpay_order_id,

      paymentId: razorpay_payment_id,

      signature: razorpay_signature,

      status: "success",
    });

    // ================================================
    // RESPONSE
    // ================================================

    return res.status(200).json({
      success: true,

      message: "Payment verified and course enrolled successfully",

      enrollmentId: enrollment._id,

      paymentId: paymentHistory._id,

      course: {
        id: course._id,
        title: course.title,
      },
    });
  } catch (error) {
    console.error("Verify Course Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  createCourseOrderController,
  verifyCoursePaymentController,
};
