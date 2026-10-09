import api from "../../../../api/axios";

// ==========================================
// GET ALL COURSES - ADMIN
// ==========================================

export const getAllCoursesAdmin = async () => {
    const res = await api.get("/courses/admin/all");

    return res.data;
};


// ==========================================
// UPDATE COURSE
// ==========================================

export const updateCourseAdmin = async ({
    courseId,
    data,
}) => {
    const res = await api.put(
        `/courses/admin/${courseId}`,
        data
    );

    return res.data;
};


// ==========================================
// DELETE COURSE
// ==========================================

export const deleteCourseAdmin = async (courseId) => {
    const res = await api.delete(
        `/courses/admin/${courseId}`
    );

    return res.data;
};


// ==========================================
// TOGGLE COURSE STATUS
// ==========================================

export const toggleCourseStatusAdmin = async (courseId) => {
    const res = await api.patch(
        `/courses/admin/${courseId}/status`
    );

    return res.data;
};