import toast from "react-hot-toast";

export const handleEnrollmentRequired = (
    error,
    navigate
) => {

    const response = error?.response?.data;

    if (
        response?.code !==
        "COURSE_NOT_ENROLLED"
    ) {
        return false;
    }


    const courseId =
        response?.courseId;


    toast.error(
        response?.message ||
        "Please enroll in this course first."
    );


    if (courseId) {

        navigate(
            `/course/${courseId}`
        );

    }


    return true;
};