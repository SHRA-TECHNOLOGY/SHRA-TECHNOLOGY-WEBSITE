import React from "react";
import {
    Video,
    PlayCircle,
    Clock3,
} from "lucide-react";

import classLogo from "../../../../assets/liveClass-icon.svg";
import googleMeetLogo from "../../../../assets/google-meet-logo.png";
import zoomLogo from "../../../../assets/zoom-logo.png";


const ClassCard = ({ item, activeTab }) => {

    // ==========================================
    // PLATFORM LOGO
    // ==========================================

    const platformLogos = {
        "Google Meet": googleMeetLogo,
        "Zoom": zoomLogo,
    };


    const platformLogo =
        platformLogos[item.platform] || null;


    // ==========================================
    // CLASS STATUS
    // ==========================================

    const isUpcoming =
        activeTab === "upcoming";

    const isLive =
        item.status === "Live";


    // ==========================================
    // ACTION LINK
    // ==========================================

    const actionLink = isUpcoming
        ? item.joinLink
        : item.recordingLink;


    const hasAction =
        Boolean(actionLink);


    // ==========================================
    // ACTION TITLE
    // ==========================================

    const actionTitle = isUpcoming
        ? isLive
            ? "Join Live"
            : "Join Now"
        : hasAction
            ? "Watch Recording"
            : "Recording Soon";


    return (

        <div className="live-class-card">


            {/* ==================================
                CLASS INFORMATION
            ================================== */}

            <div className="live-class-left">


                {/* CLASS LOGO */}

                <div className="live-class-logo">

                    <img
                        src={classLogo}
                        alt="Live Class"
                        className="pdf-logo"
                    />

                </div>


                {/* DETAILS */}

                <div className="class-details">


                    {/* COURSE */}

                    <span className="course-name">
                        {item.course || "Course"}
                    </span>


                    {/* TITLE */}

                    <h3>
                        {item.title || "Live Class"}
                    </h3>


                    {/* ==========================================
    DATE & TIME
========================================== */}

                    <div className="class-info-row">

                        <span className="info-label">
                            Date & Time
                        </span>

                        <span className="info-value">
                            {item.date || "-"}
                            {item.time && ` • ${item.time}`}
                        </span>

                    </div>


                    {/* ==========================================
    PLATFORM
========================================== */}

                    <div className="class-info-row">

                        <span className="info-label">
                            Platform
                        </span>

                        <span className="info-value platform-value">

                            {item.platform || "Custom"}

                            {platformLogo && (
                                <img
                                    src={platformLogo}
                                    alt={item.platform}
                                    className="platform-logo"
                                />
                            )}

                        </span>

                    </div>


                    {/* ==========================================
    INSTRUCTOR
========================================== */}

                    <div className="class-info-row">

                        <span className="info-label">
                            Instructor
                        </span>

                        <span className="info-value">
                            {item.teacher || "Instructor"}
                        </span>

                    </div>


                    {/* ==========================================
    DURATION
========================================== */}

                    {item.duration && (

                        <div className="class-info-row">

                            <span className="info-label">
                                Duration
                            </span>

                            <span className="info-value">
                                {item.duration}
                            </span>

                        </div>

                    )}

                </div>

            </div>


            {/* ==================================
                ACTION BUTTON
            ================================== */}

            <div className="join-btn-section">

                {isUpcoming ? (

                    <a
                        href={
                            hasAction
                                ? actionLink
                                : undefined
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`join-btn ${!hasAction
                            ? "disabled"
                            : ""
                            }`}
                        onClick={(e) => {

                            if (!hasAction) {
                                e.preventDefault();
                            }

                        }}
                    >

                        <Video size={16} />

                        {actionTitle}

                    </a>

                ) : (

                    <a
                        href={
                            hasAction
                                ? actionLink
                                : undefined
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`join-btn recording-btn ${!hasAction
                            ? "disabled"
                            : ""
                            }`}
                        onClick={(e) => {

                            if (!hasAction) {
                                e.preventDefault();
                            }

                        }}
                    >

                        <PlayCircle size={16} />

                        {actionTitle}

                    </a>

                )}

            </div>

        </div>

    );
};


export default ClassCard;