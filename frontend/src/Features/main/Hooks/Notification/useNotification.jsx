import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import {
    getMyNotifications,
    getUnreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    deleteAllNotifications,
    createNotification,
    getNotificationPreference,
    updateNotificationPreference

} from "../../Service/notification.service";


// ==========================================
// GET NOTIFICATIONS
// ==========================================

export const useNotifications = () => {

    return useQuery({
        queryKey: ["notifications"],

        queryFn: getMyNotifications,

        staleTime: 1000 * 30,

        refetchInterval: 1000 * 60,

        refetchOnWindowFocus: true,
    });
};


// ==========================================
// UNREAD COUNT
// ==========================================

export const useUnreadNotificationCount = () => {

    return useQuery({
        queryKey: ["notification-unread-count"],

        queryFn: getUnreadNotificationCount,

        staleTime: 1000 * 30,

        refetchInterval: 1000 * 60,

        refetchOnWindowFocus: true,
    });
};


// ==========================================
// MARK READ
// ==========================================

export const useMarkNotificationAsRead = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: markNotificationAsRead,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });

            queryClient.invalidateQueries({
                queryKey: ["notification-unread-count"],
            });
        },
    });
};


// ==========================================
// MARK ALL READ
// ==========================================

export const useMarkAllNotificationsAsRead = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: markAllNotificationsAsRead,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });

            queryClient.invalidateQueries({
                queryKey: ["notification-unread-count"],
            });
        },
    });
};


// ==========================================
// DELETE
// ==========================================

export const useDeleteNotification = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteNotification,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });

            queryClient.invalidateQueries({
                queryKey: ["notification-unread-count"],
            });
        },
    });
};


// ==========================================
// DELETE ALL
// ==========================================

export const useDeleteAllNotifications = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteAllNotifications,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });

            queryClient.invalidateQueries({
                queryKey: ["notification-unread-count"],
            });
        },
    });
};


// ==========================================
// CREATE NOTIFICATION
// ==========================================

export const useCreateNotification = () => {

    return useMutation({

        mutationFn: createNotification,

        onSuccess: (data) => {

            toast.success(
                data?.message ||
                "Notification sent successfully"
            );

        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to send notification"
            );

        },

    });
};



// ==========================================
// GET NOTIFICATION PREFERENCE
// ==========================================

export const useNotificationPreference = () => {

    return useQuery({

        queryKey: [
            "notification-preference",
        ],

        queryFn:
            getNotificationPreference,

        staleTime: 1000 * 60 * 5,

        refetchOnWindowFocus: false,

    });
};

// notification on / off

export const useUpdateNotificationPreference = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: updateNotificationPreference,

        onSuccess: (data) => {

            toast.success(
                data?.message ||
                "Notification preference updated"
            );

            queryClient.invalidateQueries({
                queryKey: ["profile-dashboard"],
            });

        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                "Failed to update notification preference"
            );

        },

    });
};