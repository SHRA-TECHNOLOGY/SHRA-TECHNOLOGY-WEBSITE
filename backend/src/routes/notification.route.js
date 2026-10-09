const express = require("express");

const notificationRouter = express.Router();

const notificationController = require("../controllers/notification.controller");

const {isAlreadyReg} = require("../middlewares/isAlreadyReg.middleware");
const isAdmin = require("../middlewares/isAdmin");


// Create
notificationRouter.post(
    "/notifications",
    isAlreadyReg,
    isAdmin,
    notificationController.createNotification
);


// Get my notifications
notificationRouter.get(
    "/notifications",
    isAlreadyReg,
    notificationController.getMyNotifications
);


// Unread count
notificationRouter.get(
    "/notifications/unread-count",
    isAlreadyReg,
    notificationController.getUnreadNotificationCount
);


// Mark single as read
notificationRouter.patch(
    "/notifications/:notificationId/read",
    isAlreadyReg,
    notificationController.markNotificationAsRead
);


// Mark all as read
notificationRouter.patch(
    "/notifications/read-all",
    isAlreadyReg,
    notificationController.markAllNotificationsAsRead
);


// Delete single
notificationRouter.delete(
    "/notifications/:notificationId",
    isAlreadyReg,
    notificationController.deleteNotification
);


// Delete all
notificationRouter.delete(
    "/notifications",
    isAlreadyReg,
    notificationController.deleteAllNotifications
);

// get notification info on h or off
notificationRouter.get(
    "/notifications/preferences",
    isAlreadyReg,
    notificationController.getNotificationPreference
);

// notification on / off
notificationRouter.patch(
    "/notifications/preferences",
    isAlreadyReg,
    notificationController.updateNotificationPreference
);


module.exports = notificationRouter;