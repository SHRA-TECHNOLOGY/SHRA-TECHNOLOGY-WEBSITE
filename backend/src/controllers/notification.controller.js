const notificationModel = require("../models/notification.model");

const authModel = require("../models/auth.model");


// ==========================================
// CREATE NOTIFICATION
// ==========================================

const createNotification = async (req, res) => {

    try {

        const {
            user,
            title,
            message,
            type,
            priority,
            actionUrl,
            image,
            expiresAt,
        } = req.body;


        // ==========================================
        // VALIDATION
        // ==========================================

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Student is required",
            });
        }


        if (!title?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Notification title is required",
            });
        }


        if (!message?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Notification message is required",
            });
        }


        if (!type) {
            return res.status(400).json({
                success: false,
                message: "Notification type is required",
            });
        }


        // ==========================================
        // EXPIRY VALIDATION
        // ==========================================

        let validExpiresAt = null;

        if (expiresAt) {

            const expiryDate = new Date(expiresAt);

            if (Number.isNaN(expiryDate.getTime())) {

                return res.status(400).json({
                    success: false,
                    message: "Invalid expiry date",
                });

            }


            if (expiryDate <= new Date()) {

                return res.status(400).json({
                    success: false,
                    message: "Expiry date must be in the future",
                });

            }

            validExpiresAt = expiryDate;
        }


        // ==========================================
        // COMMON DATA
        // ==========================================

        const notificationData = {
            title: title.trim(),
            message: message.trim(),
            type,
            priority: priority || "normal",
            actionUrl: actionUrl?.trim() || "",
            image: image?.trim() || "",
            expiresAt: validExpiresAt,
        };


        // ==========================================
        // ALL STUDENTS
        // ==========================================

        if (user === "all") {

            const students = await authModel
                .find({
                    role: "student",
                })
                .select("_id")
                .lean();


            if (!students.length) {

                return res.status(404).json({
                    success: false,
                    message: "No students found",
                });

            }


            const notifications = students.map(
                (student) => ({
                    ...notificationData,
                    user: student._id,
                })
            );


            await notificationModel.insertMany(
                notifications
            );


            return res.status(201).json({
                success: true,
                message: `Notification sent to ${students.length} students`,
                recipientCount: students.length,
            });

        }


        // ==========================================
        // SINGLE STUDENT
        // ==========================================

        const student = await authModel
            .findOne({
                _id: user,
                role: "student",
            })
            .select("_id name email")
            .lean();


        if (!student) {

            return res.status(404).json({
                success: false,
                message: "Student not found",
            });

        }


        const notification =
            await notificationModel.create({

                ...notificationData,

                user: student._id,

            });


        return res.status(201).json({
            success: true,
            message: `Notification sent to ${student.name}`,
            recipientCount: 1,
            notification,
        });


    } catch (error) {

        console.error(
            "Create Notification Error:",
            error
        );


        return res.status(500).json({
            success: false,
            message: "Failed to create notification",
            error: error.message,
        });

    }
};

// ==========================================
// GET MY NOTIFICATIONS
// ==========================================

const getMyNotifications = async (req, res) => {
    try {

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user",
            });
        }

        // ------------------------------------------
        // Find Notifications
        // ------------------------------------------

        const notifications = await notificationModel
            .find({
                user: userId,

                $or: [
                    { expiresAt: null },
                    { expiresAt: { $gt: new Date() } },
                ],
            })
            .sort({
                createdAt: -1,
            })
            .lean();

        // ------------------------------------------
        // Unread Count
        // ------------------------------------------

        const unreadCount = notifications.filter(
            (notification) => !notification.isRead
        ).length;

        return res.status(200).json({
            success: true,
            message: "Notifications fetched successfully",
            count: notifications.length,
            unreadCount,
            notifications,
        });

    } catch (error) {

        console.error("Get My Notifications Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch notifications",
            error: error.message,
        });
    }
};


// ==========================================
// GET UNREAD COUNT
// ==========================================

const getUnreadNotificationCount = async (req, res) => {
    try {

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user",
            });
        }

        const unreadCount = await notificationModel.countDocuments({
            user: userId,
            isRead: false,

            $or: [
                { expiresAt: null },
                { expiresAt: { $gt: new Date() } },
            ],
        });

        return res.status(200).json({
            success: true,
            unreadCount,
        });

    } catch (error) {

        console.error(
            "Get Unread Notification Count Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch unread notification count",
            error: error.message,
        });
    }
};


// ==========================================
// MARK SINGLE NOTIFICATION AS READ
// ==========================================

const markNotificationAsRead = async (req, res) => {
    try {

        const userId = req.user?.id;
        const { notificationId } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user",
            });
        }

        if (!notificationId) {
            return res.status(400).json({
                success: false,
                message: "Notification ID is required",
            });
        }

        const notification =
            await notificationModel.findOneAndUpdate(
                {
                    _id: notificationId,
                    user: userId,
                },
                {
                    $set: {
                        isRead: true,
                    },
                },
                {
                    returnDocument: "after",
                }
            );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification marked as read",
            notification,
        });

    } catch (error) {

        console.error(
            "Mark Notification As Read Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to mark notification as read",
            error: error.message,
        });
    }
};


// ==========================================
// MARK ALL NOTIFICATIONS AS READ
// ==========================================

const markAllNotificationsAsRead = async (req, res) => {
    try {

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user",
            });
        }

        const result =
            await notificationModel.updateMany(
                {
                    user: userId,
                    isRead: false,
                },
                {
                    $set: {
                        isRead: true,
                    },
                }
            );

        return res.status(200).json({
            success: true,
            message: "All notifications marked as read",
            modifiedCount: result.modifiedCount,
        });

    } catch (error) {

        console.error(
            "Mark All Notifications As Read Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to mark all notifications as read",
            error: error.message,
        });
    }
};


// ==========================================
// DELETE SINGLE NOTIFICATION
// ==========================================

const deleteNotification = async (req, res) => {
    try {

        const userId = req.user?.id;
        const { notificationId } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user",
            });
        }

        if (!notificationId) {
            return res.status(400).json({
                success: false,
                message: "Notification ID is required",
            });
        }

        const notification =
            await notificationModel.findOneAndDelete({
                _id: notificationId,
                user: userId,
            });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification deleted successfully",
        });

    } catch (error) {

        console.error(
            "Delete Notification Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete notification",
            error: error.message,
        });
    }
};


// ==========================================
// DELETE ALL NOTIFICATIONS
// ==========================================

const deleteAllNotifications = async (req, res) => {
    try {

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user",
            });
        }

        const result =
            await notificationModel.deleteMany({
                user: userId,
            });

        return res.status(200).json({
            success: true,
            message: "All notifications deleted successfully",
            deletedCount: result.deletedCount,
        });

    } catch (error) {

        console.error(
            "Delete All Notifications Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete all notifications",
            error: error.message,
        });
    }
};

// ==========================================
// UPDATE ON/OFF  NOTIFICATIONS
// ==========================================
const updateNotificationPreference = async (req, res) => {
    try {

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user",
            });
        }


        const { enabled } = req.body;


        if (typeof enabled !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "Enabled must be true or false",
            });
        }


        const user = await authModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    "notificationSettings.enabled": enabled,
                },
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        ).select("notificationSettings");


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        return res.status(200).json({

            success: true,

            message: enabled
                ? "Notifications enabled"
                : "Notifications disabled",

            enabled:
                user.notificationSettings?.enabled ?? true,
        });

    } catch (error) {

        console.error(
            "Update Notification Preference Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update notification preference",
            error: error.message,
        });
    }
};


const getNotificationPreference = async (req, res) => {
    try {

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user",
            });
        }


        const user = await authModel
            .findById(userId)
            .select("notificationSettings")
            .lean();


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }


        return res.status(200).json({
            success: true,
            enabled:
                user.notificationSettings?.enabled ?? true,
        });

    } catch (error) {

        console.error(
            "Get Notification Preference Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get notification preference",
            error: error.message,
        });
    }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
    createNotification,
    getMyNotifications,
    getUnreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    deleteAllNotifications,
    updateNotificationPreference,
    getNotificationPreference
};