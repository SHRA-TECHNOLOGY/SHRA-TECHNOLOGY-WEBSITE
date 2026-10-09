import api from "../../../../api/axios";

// ========================================
// GET ALL LESSONS
// ========================================

export const getAdminLessons = async (params = {}) => {
    const res = await api.get("/admin/lessons", {
        params,
    });

    return res.data;
};

// ========================================
// CREATE LESSON
// ========================================

export const createLesson = async (lessonData) => {
    const res = await api.post(
        "/admin/lessons",
        lessonData
    );

    return res.data;
};

// ========================================
// UPDATE LESSON
// ========================================

export const updateLesson = async ({ lessonId, data }) => {
    const res = await api.patch(
        `/admin/lessons/${lessonId}`,
        data
    );

    return res.data;
};

// ========================================
// DELETE LESSON
// ========================================

export const deleteLesson = async (lessonId) => {
    const res = await api.delete(
        `/admin/lessons/${lessonId}`
    );

    return res.data;
};

export const getAdminCourseOptions = async () => {
    const response = await api.get("/admin/course-options");

    return response.data;
};