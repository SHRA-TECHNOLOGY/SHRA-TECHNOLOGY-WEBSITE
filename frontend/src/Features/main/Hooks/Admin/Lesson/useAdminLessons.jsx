import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
    getAdminLessons,
    createLesson,
    updateLesson,
    deleteLesson,
    getAdminCourseOptions
} from "../../../Service/Admin/lesson.service";

// ========================================
// GET ALL LESSONS
// ========================================

export const useAdminLessons = (params = null) => {
    return useQuery({
        queryKey: ["admin-lessons", params],
        queryFn: () => getAdminLessons(params),
        enabled: Boolean(params?.courseId),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};

// ========================================
// CREATE LESSON
// ========================================

export const useCreateLesson = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createLesson,

        onSuccess: (data) => {
            toast.success(
                data?.message || "Lesson created successfully!"
            );

            queryClient.invalidateQueries({
                queryKey: ["admin-lessons"],
            });

            queryClient.invalidateQueries({
                queryKey: ["course-details"],
            });
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to create lesson."
            );
        },
    });
};

// ========================================
// UPDATE LESSON
// ========================================

export const useUpdateLesson = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateLesson,

        onSuccess: (data) => {
            toast.success(
                data?.message || "Lesson updated successfully!"
            );

            queryClient.invalidateQueries({
                queryKey: ["admin-lessons"],
            });

            queryClient.invalidateQueries({
                queryKey: ["course-details"],
            });
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to update lesson."
            );
        },
    });
};

// ========================================
// DELETE LESSON
// ========================================

export const useDeleteLesson = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteLesson,

        onSuccess: (data) => {
            toast.success(
                data?.message || "Lesson deleted successfully!"
            );

            queryClient.invalidateQueries({
                queryKey: ["admin-lessons"],
            });

            queryClient.invalidateQueries({
                queryKey: ["course-details"],
            });
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message ||
                "Failed to delete lesson."
            );
        },
    });
};



export const useAdminCourseOptions = () => {
    return useQuery({
        queryKey: ["admin-course-options"],
        queryFn: getAdminCourseOptions,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};