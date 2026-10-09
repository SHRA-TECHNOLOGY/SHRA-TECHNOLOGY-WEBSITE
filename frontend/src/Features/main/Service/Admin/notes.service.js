import api from "../../../../api/axios";


// ==========================================
// GET COURSES
// ==========================================

export const getCoursesForNotes = async () => {
    const res = await api.get("/notes/courses");

    return res.data;
};


// ==========================================
// GET SECTIONS BY COURSE
// ==========================================

export const getSectionsForNotes = async (courseId) => {
    const res = await api.get(
        `/notes/sections/${courseId}`
    );

    return res.data;
};


// ==========================================
// CREATE NOTE
// ==========================================

export const createNote = async (data) => {
    const res = await api.post(
        "/notes/create",
        data
    );

    return res.data;
};


// ==========================================
// GET ALL NOTES
// ==========================================

export const getAllNotes = async () => {
    const res = await api.get("/notes/all");

    return res.data;
};