import api from "../../../../api/axios";

// Get all students
export const getAllStudents = async () => {
    const res = await api.get("/students/all");

    return res.data;
};