import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import {
    getCoursesForNotes,
    getSectionsForNotes,
    createNote,
    getAllNotes,
} from "../../../Service/Admin/notes.service";


// ==========================================
// COURSES
// ==========================================

export const useNotesCourses = () => {

    return useQuery({
        queryKey: ["notes-courses"],
        queryFn: getCoursesForNotes,

        staleTime: 1000 * 60 * 10,

        refetchOnWindowFocus: false,
    });
};


// ==========================================
// SECTIONS
// ==========================================

export const useNotesSections = (courseId) => {

    return useQuery({
        queryKey: ["notes-sections", courseId],

        queryFn: () =>
            getSectionsForNotes(courseId),

        enabled: Boolean(courseId),

        staleTime: 1000 * 60 * 10,

        refetchOnWindowFocus: false,
    });
};


// ==========================================
// CREATE NOTE
// ==========================================

export const useCreateNote = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createNote,

        onSuccess: (data) => {

            toast.success(
                data?.message ||
                "Notes uploaded successfully!"
            );


            // Notes list refresh
            queryClient.invalidateQueries({
                queryKey: ["notes"],
            });


            // Course notes refresh
            queryClient.invalidateQueries({
                queryKey: ["course-notes"],
            });
        },


        onError: (error) => {

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to upload notes.";

            toast.error(message);
        },
    });
};


// ==========================================
// GET ALL NOTES
// ==========================================

export const useAllNotes = () => {
    return useQuery({
        queryKey: ["all-notes"],
        queryFn: getAllNotes,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};