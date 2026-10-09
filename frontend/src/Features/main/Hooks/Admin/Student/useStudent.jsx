import { useQuery } from "@tanstack/react-query";

import {
    getAllStudents,
} from "../../../Service/Admin/student.service";


// ======================================================
// GET ALL STUDENTS
// ======================================================

export const useAllStudents = () => {

    return useQuery({
        queryKey: ["admin-students"],

        queryFn: getAllStudents,

        staleTime: 1000 * 60 * 5,

        refetchOnWindowFocus: false,
    });
};