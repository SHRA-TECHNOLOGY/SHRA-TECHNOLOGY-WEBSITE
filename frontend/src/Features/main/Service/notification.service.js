import api from "../../../api/axios";

// ==========================================
// GET MY NOTIFICATIONS
// ==========================================

export const getMyNotifications = async () => {
    const res = await api.get("/notifications");
    return res.data;
};


// ==========================================
// GET UNREAD COUNT
// ==========================================

export const getUnreadNotificationCount = async () => {
    const res = await api.get("/notifications/unread-count");
    return res.data;
};


// ==========================================
// MARK AS READ
// ==========================================

export const markNotificationAsRead = async (notificationId) => {
    const res = await api.patch(
        `/notifications/${notificationId}/read`
    );

    return res.data;
};


// ==========================================
// MARK ALL AS READ
// ==========================================

export const markAllNotificationsAsRead = async () => {
    const res = await api.patch(
        "/notifications/read-all"
    );

    return res.data;
};


// ==========================================
// DELETE
// ==========================================

export const deleteNotification = async (notificationId) => {
    const res = await api.delete(
        `/notifications/${notificationId}`
    );

    return res.data;
};


// ==========================================
// DELETE ALL
// ==========================================

export const deleteAllNotifications = async () => {
    const res = await api.delete("/notifications");
    return res.data;
};


// ==========================================
// CREATE NOTIFICATION
// ==========================================

export const createNotification = async (data) => {
    const res = await api.post(
        "/notifications",
        data
    );

    return res.data;
};

// ==========================================
// GET PREFERENCE
// ==========================================

export const getNotificationPreference = async () => {

    const res = await api.get(
        "/notifications/preferences"
    );

    return res.data;
};

// notification on / off
export const updateNotificationPreference = async (enabled) => {

    const res = await api.patch(
        "/notifications/preferences",
        {
            enabled,
        }
    );

    return res.data;
};