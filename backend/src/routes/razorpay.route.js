const {Router} = require('express');
const {isAlreadyReg} = require('../middlewares/isAlreadyReg.middleware');
const {createCourseOrderController,verifyCoursePaymentController} = require('../controllers/payment.controller')

const razorpayRouter = Router();


/**
 * @route POST /api/payment/create-order
 * @description create order for razorpay popup
 * @access private
 */

razorpayRouter.post('/course/payment/create-order',isAlreadyReg,createCourseOrderController)

/**
 * @route POST /api/payment/verify-payment
 * @description verify payment for secure payment
 * @access private
 */

razorpayRouter.post('/course/payment/verify',isAlreadyReg,verifyCoursePaymentController)



module.exports = razorpayRouter;