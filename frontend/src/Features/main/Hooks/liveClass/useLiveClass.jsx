import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import {
    getLiveClasses,
    getLiveClassById,
    createLiveClass,
    getAllLiveClassesAdmin,
    updateLiveClassRecording
} from "../../Service/liveClass.service";


// ==========================================
// USER - LIVE CLASSES
// ==========================================

export const useLiveClasses = () => {

    return useQuery({

        queryKey: [
            "live-classes"
        ],

        queryFn:
            getLiveClasses,

        staleTime:
            1000 * 60 * 2,

        refetchOnWindowFocus:
            false,

    });
};


// ==========================================
// USER - SINGLE LIVE CLASS
// ==========================================

export const useLiveClass = (
    liveClassId
) => {

    return useQuery({

        queryKey: [
            "live-class",
            liveClassId
        ],

        queryFn: () =>
            getLiveClassById(
                liveClassId
            ),

        enabled:
            Boolean(liveClassId),

        staleTime:
            1000 * 60 * 2,

        refetchOnWindowFocus:
            false,

    });
};


// ==========================================
// ADMIN - CREATE LIVE CLASS
// ==========================================

export const useCreateLiveClass = () => {

    const queryClient =
        useQueryClient();


    return useMutation({

        mutationFn:
            createLiveClass,


        onSuccess: (data) => {

            toast.success(
                data?.message ||
                "Live class created successfully"
            );


            // User live classes
            queryClient.invalidateQueries({
                queryKey: [
                    "live-classes"
                ],
            });


            // Admin live classes
            queryClient.invalidateQueries({
                queryKey: [
                    "admin-live-classes"
                ],
            });

        },


        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to create live class"
            );

        },

    });
};


// ==========================================
// ADMIN - ALL LIVE CLASSES
// ==========================================

export const useAdminLiveClasses = () => {

    return useQuery({

        queryKey: [
            "admin-live-classes"
        ],

        queryFn:
            getAllLiveClassesAdmin,

        staleTime:
            1000 * 60 * 2,

        refetchOnWindowFocus:
            false,

    });
};


// =====================================================
// ADD / UPDATE RECORDING
// =====================================================

export const useUpdateLiveClassRecording = () => {

    const queryClient =
        useQueryClient();


    return useMutation({

        mutationFn:
            updateLiveClassRecording,


        onSuccess: (data) => {

            queryClient.invalidateQueries({
                queryKey: [
                    "live-classes",
                ],
            });


            queryClient.invalidateQueries({
                queryKey: [
                    "admin-live-classes",
                ],
            });


            queryClient.invalidateQueries({
                queryKey: [
                    "live-class",
                ],
            });

        },

    });

};