import React from "react";

import {
    Video,
    RefreshCw,
} from "lucide-react";

import ClassCard from "./ClassCard";

import {
    useLiveClasses,
} from "../../Hooks/liveClass/useLiveClass";


const LiveClassCards = ({ activeTab }) => {

    // ==========================================
    // GET LIVE CLASSES
    // ==========================================

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useLiveClasses();


    // ==========================================
    // LOADING
    // ==========================================

    if (isLoading) {

        return (

            <div className="live-class-state">

                <div className="live-class-loading-card">

                    <div className="live-class-spinner"></div>

                    <h3>
                        Loading Live Classes
                    </h3>

                    <p>
                        Please wait while we fetch your classes.
                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (isError) {

        return (

            <div className="live-class-state">

                <div className="live-class-error-card">

                    <div className="live-class-error-icon">
                        !
                    </div>

                    <h3>
                        Unable to Load Classes
                    </h3>

                    <p>
                        {error?.response?.data?.message ||
                            "Something went wrong while loading live classes."}
                    </p>

                    <button
                        type="button"
                        onClick={() => refetch()}
                    >

                        <RefreshCw size={16} />

                        Try Again

                    </button>

                </div>

            </div>

        );

    }


    // ==========================================
    // SELECT BACKEND ARRAY
    // ==========================================

    const selectedClasses =
        activeTab === "upcoming"
            ? data?.upcoming || []
            : data?.previous || [];


    // ==========================================
    // EMPTY
    // ==========================================

    if (selectedClasses.length === 0) {

        return (

            <div className="live-class-state">

                <div className="live-class-empty-card">

                    <div className="live-class-empty-icon">

                        <Video size={26} />

                    </div>

                    <h3>

                        {activeTab === "upcoming"
                            ? "No Upcoming Classes"
                            : "No Previous Classes"
                        }

                    </h3>

                    <p>

                        {activeTab === "upcoming"
                            ? "There are no upcoming live classes right now."
                            : "Your completed classes will appear here."
                        }

                    </p>

                </div>

            </div>

        );

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="live-classes-list">

            {selectedClasses.map((item) => {

                // ==================================
                // COURSE
                // ==================================

                const courseName =
                    typeof item.course === "object"
                        ? item.course?.title
                        : item.course || "Course";


                // ==================================
                // TEACHER
                // ==================================

                const teacherName =
                    typeof item.teacher === "object"
                        ? (
                            item.teacher?.fullName ||
                            item.teacher?.name ||
                            "Teacher"
                        )
                        : item.teacher || "Teacher";


                // ==================================
                // DATE
                // ==================================

                const scheduledDate =
                    item.scheduledAt
                        ? new Date(item.scheduledAt)
                        : null;


                const date =
                    scheduledDate
                        ? scheduledDate.toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            }
                        )
                        : "-";


                // ==================================
                // START TIME
                // ==================================

                const startTime =
                    scheduledDate
                        ? scheduledDate.toLocaleTimeString(
                            "en-IN",
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            }
                        )
                        : "";


                // ==================================
                // END TIME
                // ==================================

                const endDate =
                    scheduledDate
                        ? new Date(
                            scheduledDate.getTime() +
                            Number(item.duration || 0) *
                            60 *
                            1000
                        )
                        : null;


                const endTime =
                    endDate
                        ? endDate.toLocaleTimeString(
                            "en-IN",
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            }
                        )
                        : "";


                // ==================================
                // DURATION
                // ==================================

                const durationMinutes =
                    Number(item.duration || 0);


                const hours =
                    Math.floor(
                        durationMinutes / 60
                    );


                const minutes =
                    durationMinutes % 60;


                const duration =
                    hours > 0
                        ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
                        : `${minutes}m`;


                // ==================================
                // PLATFORM LOGO
                // ==================================

                const platformLogo =
                    item.platform === "Google Meet"
                        ? "/assets/google-meet-logo.png"
                        : item.platform === "Zoom"
                            ? "/assets/zoom-logo.png"
                            : null;


                // ==================================
                // CARD STATUS
                // ==================================

                const status =
                    item.status === "Completed" ||
                    item.status === "Cancelled"
                        ? "previous"
                        : "upcoming";


                // ==================================
                // CARD DATA
                // ==================================

                const cardData = {

                    ...item,

                    id: item._id,

                    course: courseName,

                    title:
                        item.title ||
                        "Live Class",

                    date,

                    time:
                        startTime && endTime
                            ? `${startTime} - ${endTime}`
                            : startTime,

                    teacher: teacherName,

                    platform:
                        item.platform ||
                        "Custom",

                    platformLogo,

                    duration,

                    joinLink:
                        item.meetingLink ||
                        "",

                    recordingLink:
                        item.isRecordingAvailable
                            ? item.recordingUrl
                            : "",

                    status,

                };


                return (

                    <ClassCard
                        item={cardData}
                        key={item._id}
                        activeTab={activeTab}
                    />

                );

            })}

        </div>

    );

};


export default LiveClassCards;