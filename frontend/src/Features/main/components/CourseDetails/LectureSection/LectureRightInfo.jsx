import { CirclePlay, CircleCheck, CloudSnow } from 'lucide-react'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import '../../../styles/CourseDetails/LectureRight.scss'
import {
    useCreateCourseOrder,
    useVerifyCoursePayment,
} from "../../../Hooks/Course/useCourse";

import toast from "react-hot-toast";
import { AuthContext } from "../../../../auth/auth.context";

const LectureRightInfo = ({ data }) => {

    const { user } = useContext(AuthContext);

    const { courseId } = useParams();


    // Currently processing course
    const [processingCourseId, setProcessingCourseId] = useState(null);


    // ==========================================
    // CREATE ORDER
    // ==========================================

    const {
        mutate: createOrder,
        isPending: isCreatingOrder,
    } = useCreateCourseOrder();


    // ==========================================
    // VERIFY PAYMENT
    // ==========================================

    const {
        mutate: verifyPayment,
        isPending: isVerifyingPayment,
    } = useVerifyCoursePayment();


    // ==========================================
    // ENROLL / PAYMENT
    // ==========================================

    const handleEnroll = (courseId) => {

        setProcessingCourseId(courseId);


        // ======================================
        // CREATE RAZORPAY ORDER
        // ======================================

        createOrder(courseId, {

            onSuccess: (data) => {

                console.log("Create Order Response:", data);


                if (!data?.success) {

                    setProcessingCourseId(null);

                    toast.error(
                        data?.message ||
                        "Unable to create order"
                    );

                    return;
                }


                // ==================================
                // RAZORPAY OPTIONS
                // ==================================

                const options = {

                    key: import.meta.env.VITE_RAZORPAY_KEY,

                    amount: data.order.amount,

                    currency: data.order.currency,

                    name: "SHRA Technology",

                    description: data.course.title,

                    order_id: data.order.id,


                    // =================================
                    // PAYMENT SUCCESS
                    // =================================

                    handler: function (response) {


                        // ==============================
                        // VERIFY PAYMENT
                        // ==============================

                        verifyPayment(
                            {
                                razorpay_order_id:
                                    response.razorpay_order_id,

                                razorpay_payment_id:
                                    response.razorpay_payment_id,

                                razorpay_signature:
                                    response.razorpay_signature,

                                courseId,
                            },

                            {

                                onSuccess: (verifyData) => {


                                    setProcessingCourseId(null);


                                    toast.success(
                                        verifyData?.message ||
                                        "Course enrolled successfully"
                                    );


                                    // refresh page when student enroll course
                                    window.location.reload();

                                },


                                onError: (error) => {

                                    setProcessingCourseId(null);


                                    toast.error(
                                        error?.response?.data?.message ||
                                        "Payment verification failed"
                                    );

                                },

                            }
                        );

                    },


                    // =================================
                    // USER DETAILS
                    // =================================

                    prefill: {

                        name:
                            user?.fullName ||
                            user?.name ||
                            "",

                        email:
                            user?.email ||
                            "",

                    },


                    theme: {

                        color: "#6c4dff",

                    },

                };


                // ==================================
                // OPEN RAZORPAY
                // ==================================

                const razorpay = new window.Razorpay(options);


                razorpay.on(
                    "payment.failed",
                    function (response) {


                        setProcessingCourseId(null);


                        toast.error(
                            response?.error?.description ||
                            "Payment failed"
                        );

                    }
                );


                razorpay.open();

            },


            // ======================================
            // CREATE ORDER ERROR
            // ======================================

            onError: (error) => {

                setProcessingCourseId(null);


                toast.error(
                    error?.response?.data?.message ||
                    "Unable to create payment order"
                );

            },

        });

    };

    const isProcessing = processingCourseId === courseId;

    const course = data?.data?.course || null;

    const isEnroll = data?.data?.enrollment?.isEnrolled === true;

    let progress = data?.data?.progress?.percentage || 0;

    // description
    const includes = [
        "40 hours of on-demand video",
        "156 downloadable resources",
        "Full lifetime access",
        "Access on mobile and desktop",
        "Certificate of completion",
    ];

    return (
        <div className='lecture-right'>
            <div className="upper-part">
                <h3>{course?.pricing?.type}</h3>

                {
                    isEnroll === true ? (


                        <div className="xp-wrapper">

                            <div className="xp-header">

                                <h3>
                                    Course Progress
                                </h3>

                                <span>
                                    {progress}%
                                </span>

                            </div>

                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                ></div>

                            </div>

                            <button className='continue-btn'><CirclePlay /> Continue Learning</button>

                        </div>
                    ) : (

                        <>
                            <div className="button-section">

                                <button
                                    onClick={() =>
                                        handleEnroll(courseId)
                                    }
                                    disabled={
                                        isProcessing ||
                                        (isCreatingOrder &&
                                            processingCourseId ===
                                            courseId) ||
                                        (isVerifyingPayment &&
                                            processingCourseId ===
                                            courseId)
                                    }
                                >

                                    {isProcessing
                                        ? "Processing..."
                                        : course?.pricing?.type ===
                                            "Free"
                                            ? "Enroll Now"
                                            : "Buy Now"}

                                </button>
                                <button className='addTOWishlist-btn'>Add to Wishlist</button>
                            </div>

                        </>
                    )
                }

            </div>

            <div className="lower-section">
                <h3>This course in includes:</h3>

                <div className="course-feature-list">
                    {
                        includes.map((item, index) => {
                            return (
                                <div className="single-course-feature" key={index}>
                                    <span><CircleCheck /></span>
                                    <p>{item}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default LectureRightInfo
