import React from "react";

import {
    Bell,
    CheckCheck,
    Trash2,
    BookOpen,
    FileText,
    Code2,
    ClipboardCheck,
    Trophy,
    Award,
    CalendarCheck,
    Video,
    Megaphone,
    Tag,
    Zap,
    Flame,
    RefreshCw,
} from "lucide-react";

import {
    useNotifications,
    useMarkNotificationAsRead,
    useMarkAllNotificationsAsRead,
    useDeleteNotification,
    useDeleteAllNotifications,
} from "../../Hooks/Notification/useNotification";

import "./Notification.scss";


// ==========================================
// NOTIFICATION ICON
// ==========================================

const getNotificationIcon = (type) => {

    const icons = {
        course: BookOpen,
        lesson: FileText,
        practice: Code2,
        test: ClipboardCheck,
        result: Trophy,
        certificate: Award,
        attendance: CalendarCheck,
        "live-class": Video,
        announcement: Megaphone,
        offer: Tag,
        xp: Zap,
        streak: Flame,
    };

    return icons[type] || Bell;
};


// ==========================================
// TIME FORMAT
// ==========================================

const formatNotificationTime = (date) => {

    if (!date) {
        return "";
    }


    const notificationDate = new Date(date);

    const now = new Date();


    const difference = Math.floor(
        (now.getTime() -
            notificationDate.getTime()) /
        1000
    );


    if (difference < 0) {
        return "Just now";
    }


    if (difference < 60) {
        return "Just now";
    }


    if (difference < 3600) {
        return `${Math.floor(
            difference / 60
        )} min ago`;
    }


    if (difference < 86400) {
        return `${Math.floor(
            difference / 3600
        )} hr ago`;
    }


    if (difference < 604800) {
        return `${Math.floor(
            difference / 86400
        )} days ago`;
    }


    return notificationDate.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};


// ==========================================
// COMPONENT
// ==========================================

const Notification = () => {


    // ==========================================
    // GET NOTIFICATIONS
    // ==========================================

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useNotifications();


    // ==========================================
    // MUTATIONS
    // ==========================================

    const {
        mutate: markRead,
        isPending: isMarkingRead,
    } = useMarkNotificationAsRead();


    const {
        mutate: markAllRead,
        isPending: isMarkingAllRead,
    } = useMarkAllNotificationsAsRead();


    const {
        mutate: deleteOne,
        isPending: isDeleting,
    } = useDeleteNotification();


    const {
        mutate: deleteAll,
        isPending: isDeletingAll,
    } = useDeleteAllNotifications();


    // ==========================================
    // DATA
    // ==========================================

    const notifications =
        data?.notifications || [];


    const unreadCount =
        data?.unreadCount ??
        notifications.filter(
            (notification) =>
                !notification.isRead
        ).length;


    // ==========================================
    // MARK READ
    // ==========================================

    const handleMarkRead = (notificationId) => {

        if (!notificationId) {
            return;
        }


        markRead(notificationId);
    };


    // ==========================================
    // MARK ALL READ
    // ==========================================

    const handleMarkAllRead = () => {

        if (
            unreadCount === 0 ||
            isMarkingAllRead
        ) {
            return;
        }


        markAllRead();
    };


    // ==========================================
    // DELETE
    // ==========================================

    const handleDelete = (notificationId) => {

        if (
            !notificationId ||
            isDeleting
        ) {
            return;
        }


        deleteOne(notificationId);
    };


    // ==========================================
    // DELETE ALL
    // ==========================================

    const handleDeleteAll = () => {

        if (
            notifications.length === 0 ||
            isDeletingAll
        ) {
            return;
        }


        const confirmed = window.confirm(
            "Are you sure you want to delete all notifications?"
        );


        if (!confirmed) {
            return;
        }


        deleteAll();
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (isLoading) {

        return (

            <div className="notification-page">

                <div className="notification-header">

                    <div>

                        <div className="notification-title-skeleton"></div>

                        <div className="notification-subtitle-skeleton"></div>

                    </div>

                </div>


                <div className="notification-loading-list">

                    {[1, 2, 3, 4].map((item) => (

                        <div
                            className="notification-loading-card"
                            key={item}
                        >

                            <span className="notification-loading-icon"></span>


                            <div className="notification-loading-content">

                                <span className="notification-loading-title"></span>

                                <span className="notification-loading-text"></span>

                                <span className="notification-loading-small"></span>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (isError) {

        return (

            <div className="notification-state">

                <div className="notification-error-card">

                    <div className="notification-error-icon">
                        !
                    </div>


                    <h3>
                        Unable to Load Notifications
                    </h3>


                    <p>
                        {error?.response?.data?.message ||
                            "Something went wrong while loading notifications."}
                    </p>


                    <button
                        type="button"
                        className="notification-retry-btn"
                        onClick={() => refetch()}
                    >

                        <RefreshCw size={17} />

                        Try Again

                    </button>

                </div>

            </div>
        );
    }


    return (

        <div className="notification-page">


            {/* ======================================
                HEADER
            ====================================== */}

            <div className="notification-header">

                <div className="notification-heading">

                    <div className="notification-heading-icon">

                        <Bell size={22} />

                    </div>


                    <div>

                        <h2>
                            Notifications
                        </h2>

                        <p>
                            Stay updated with your latest activities.
                        </p>

                    </div>

                </div>


                <div className="notification-header-actions">


                    {unreadCount > 0 && (

                        <span className="notification-unread-count">

                            {unreadCount} Unread

                        </span>

                    )}


                    {notifications.length > 0 && (

                        <button
                            type="button"
                            className="mark-all-btn"
                            onClick={handleMarkAllRead}
                            disabled={
                                unreadCount === 0 ||
                                isMarkingAllRead
                            }
                        >

                            <CheckCheck size={17} />

                            {isMarkingAllRead
                                ? "Marking..."
                                : "Mark all as read"
                            }

                        </button>

                    )}

                </div>

            </div>


            {/* ======================================
                EMPTY
            ====================================== */}

            {notifications.length === 0 ? (

                <div className="notification-empty">

                    <div className="notification-empty-icon">

                        <Bell size={28} />

                    </div>


                    <h3>
                        No Notifications
                    </h3>


                    <p>
                        You're all caught up. New notifications
                        will appear here.
                    </p>

                </div>

            ) : (

                <div className="notification-list">


                    {notifications.map(
                        (notification) => {

                            const Icon =
                                getNotificationIcon(
                                    notification.type
                                );


                            return (

                                <div
                                    key={
                                        notification._id
                                    }
                                    className={`notification-item ${
                                        !notification.isRead
                                            ? "unread"
                                            : ""
                                    }`}
                                    onClick={() => {

                                        if (
                                            !notification.isRead &&
                                            !isMarkingRead
                                        ) {

                                            handleMarkRead(
                                                notification._id
                                            );

                                        }

                                    }}
                                >


                                    {/* ICON */}

                                    <div
                                        className={`notification-type-icon ${notification.type}`}
                                    >

                                        <Icon size={20} />

                                    </div>


                                    {/* CONTENT */}

                                    <div className="notification-content">


                                        <div className="notification-item-top">

                                            <h3>
                                                {notification.title}
                                            </h3>


                                            {!notification.isRead && (

                                                <span className="unread-dot"></span>

                                            )}

                                        </div>


                                        <p>
                                            {notification.message}
                                        </p>


                                        <div className="notification-item-bottom">

                                            <span className="notification-time">

                                                {formatNotificationTime(
                                                    notification.createdAt
                                                )}

                                            </span>


                                            {notification.priority ===
                                                "high" && (

                                                <span className="notification-priority">

                                                    Important

                                                </span>

                                            )}

                                        </div>

                                    </div>


                                    {/* ACTIONS */}

                                    <div
                                        className="notification-actions"
                                        onClick={(e) =>
                                            e.stopPropagation()
                                        }
                                    >


                                        {!notification.isRead && (

                                            <button
                                                type="button"
                                                title="Mark as read"
                                                onClick={() =>
                                                    handleMarkRead(
                                                        notification._id
                                                    )
                                                }
                                                disabled={
                                                    isMarkingRead
                                                }
                                            >

                                                <CheckCheck
                                                    size={17}
                                                />

                                            </button>

                                        )}


                                        <button
                                            type="button"
                                            title="Delete"
                                            className="delete-notification-btn"
                                            onClick={() =>
                                                handleDelete(
                                                    notification._id
                                                )
                                            }
                                            disabled={
                                                isDeleting
                                            }
                                        >

                                            <Trash2 size={17} />

                                        </button>

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}


            {/* ======================================
                DELETE ALL
            ====================================== */}

            {notifications.length > 0 && (

                <div className="notification-footer">

                    <button
                        type="button"
                        className="delete-all-notifications"
                        onClick={handleDeleteAll}
                        disabled={isDeletingAll}
                    >

                        <Trash2 size={16} />

                        {isDeletingAll
                            ? "Deleting..."
                            : "Delete all notifications"
                        }

                    </button>

                </div>

            )}

        </div>
    );
};


export default Notification;