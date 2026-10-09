import React from "react";
import { X } from "lucide-react";

import {
    FaCheckCircle,
    FaBookOpen,
    FaFire,
    FaVideo,
    FaCertificate,
    FaGraduationCap,
    FaCode,
} from "react-icons/fa";


// ==========================================
// ACTIVITY CONFIG
// ==========================================

const activityConfig = {

    course_enrolled: {
        icon: <FaGraduationCap />,
        color: "#6C4DFF",
    },

    lesson_completed: {
        icon: <FaBookOpen />,
        color: "#6C4DFF",
    },

    practice_completed: {
        icon: <FaCheckCircle />,
        color: "#22C55E",
    },

    test_completed: {
        icon: <FaCode />,
        color: "#3B82F6",
    },

    badge_earned: {
        icon: <FaFire />,
        color: "#FF6B00",
    },

    live_class_joined: {
        icon: <FaVideo />,
        color: "#3B82F6",
    },

    course_completed: {
        icon: <FaGraduationCap />,
        color: "#22C55E",
    },

    certificate_earned: {
        icon: <FaCertificate />,
        color: "#F59E0B",
    },

};


// ==========================================
// TIME AGO
// ==========================================

const getTimeAgo = (date) => {

    if (!date) return "";

    const now = new Date();
    const created = new Date(date);

    const diff = Math.floor(
        (now - created) / 1000
    );

    if (diff < 60) {
        return "Just now";
    }

    const minutes = Math.floor(diff / 60);

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 7) {
        return `${days}d ago`;
    }

    const weeks = Math.floor(days / 7);

    if (weeks < 4) {
        return `${weeks}w ago`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
        return `${months}mo ago`;
    }

    const years = Math.floor(days / 365);

    return `${years}y ago`;
};


// ==========================================
// RECENT MODEL
// ==========================================

const RecentModel = ({
    showAll,
    recentActivities,
    setShowAll
}) => {

    return (

        <>
            {showAll && (

                <div className="activity-modal">

                    <div className="modal-box">


                        {/* HEADER */}

                        <div className="modal-header">

                            <h2>
                                Last 7 Days Activity
                            </h2>

                            <button
                                onClick={() =>
                                    setShowAll(false)
                                }
                            >
                                <X />
                            </button>

                        </div>


                        {/* ACTIVITY LIST */}

                        <div className="activity-list">

                            {recentActivities?.length > 0 ? (

                                recentActivities.map((activity) => {

                                    const config =
                                        activityConfig[
                                            activity?.type
                                        ] || {
                                            icon: <FaCheckCircle />,
                                            color: "#6C4DFF",
                                        };


                                    return (

                                        <div
                                            className="activity-item"
                                            key={activity?._id}
                                        >


                                            {/* ICON */}

                                            <div
                                                className="activity-icon"
                                                style={{
                                                    background:
                                                        `${config.color}20`,
                                                    color:
                                                        config.color,
                                                }}
                                            >
                                                {config.icon}
                                            </div>


                                            {/* CONTENT */}

                                            <div className="activity-content">

                                                <h4>
                                                    {activity?.title}
                                                </h4>

                                                <p>
                                                    {activity?.description ||
                                                        "Activity completed"}
                                                </p>

                                            </div>


                                            {/* TIME */}

                                            <span className="activity-time">

                                                {getTimeAgo(
                                                    activity?.createdAt
                                                )}

                                            </span>

                                        </div>

                                    );

                                })

                            ) : (

                                <p className="no-activity">
                                    No activity found.
                                </p>

                            )}

                        </div>

                    </div>

                </div>

            )}
        </>

    );
};

export default RecentModel;