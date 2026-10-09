import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
    getAllCoursesAdmin,
    updateCourseAdmin,
    deleteCourseAdmin,
    toggleCourseStatusAdmin,
} from "../../../Service/Admin/adminCourse.service";


// ==========================================
// GET ALL COURSES
// ==========================================

export const useAdminCourses = () => {
    return useQuery({
        queryKey: ["admin-courses"],
        queryFn: getAllCoursesAdmin,

        staleTime: 1000 * 60 * 5,

        refetchOnWindowFocus: false,
    });
};


// ==========================================
// UPDATE COURSE
// ==========================================

export const useUpdateCourseAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCourseAdmin,

        onSuccess: (data) => {

            toast.success(
                data?.message ||
                "Course updated successfully"
            );

            queryClient.invalidateQueries({
                queryKey: ["admin-courses"],
            });
        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update course"
            );
        },
    });
};


// ==========================================
// DELETE COURSE
// ==========================================

export const useDeleteCourseAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCourseAdmin,

        onSuccess: (data) => {

            toast.success(
                data?.message ||
                "Course deleted successfully"
            );

            queryClient.invalidateQueries({
                queryKey: ["admin-courses"],
            });
        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to delete course"
            );
        },
    });
};


// ==========================================
// TOGGLE COURSE STATUS
// ==========================================

export const useToggleCourseStatusAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleCourseStatusAdmin,

        onSuccess: (data) => {

            toast.success(
                data?.message ||
                "Course status updated"
            );

            queryClient.invalidateQueries({
                queryKey: ["admin-courses"],
            });
        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update course status"
            );
        },
    });
};