import React, { useState } from "react";
import EmptyRecent from "./EmptyRecent";
import "../../styles/Profile/Recent.scss";

const Recent = ({ profileData }) => {
    const [showAll, setShowAll] = useState(false);

    const activities = profileData?.recentActivity || [];

    return (
        <>

            {profileData?.recentActivity?.length > 0 ? (

            <div className="recent-activity">

                <div className="header">
                    <h3>Recent Activity</h3>

                    <button onClick={() => setShowAll(true)}>
                        View All
                    </button>
                </div>

                <div className="activity-list">

                    {activities.slice(0, 3).map((activity) => (

                        <div
                            className="activity-card"
                            key={activity.id}
                        >

                            <div className="recent-left">

                                <div
                                    className={`icon ${activity.type}`}
                                >
                                    {activity.icon}
                                </div>

                                <div className="content">
                                    <h4>{activity.title}</h4>
                                    <p>{activity.time}</p>
                                </div>

                            </div>

                            <span
                                className={`recent-badge ${
                                    activity.tag === "Easy"
                                        ? "easy"
                                        : activity.tag === "Medium"
                                        ? "medium"
                                        : activity.tag === "Hard"
                                        ? "hard"
                                        : "test"
                                }`}
                            >
                                {activity.tag}
                            </span>

                        </div>

                    ))}

                </div>
            </div>

            ) : (

                <EmptyRecent />
            )}


            {/* =========================================
                VIEW ALL MODAL
            ========================================= */}

            {showAll && (

                <div
                    className="recent-modal-overlay"
                    onClick={() => setShowAll(false)}
                >

                    <div
                        className="recent-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="recent-modal-header">

                            <div>
                                <h3>Recent Activity</h3>

                                <p>
                                    Your latest learning activities
                                </p>
                            </div>

                            <button
                                className="close-btn"
                                onClick={() => setShowAll(false)}
                            >
                                ×
                            </button>

                        </div>


                        <div className="recent-modal-list">

                            {activities.length > 0 ? (

                                activities.map((activity) => (

                                    <div
                                        className="activity-card modal-activity-card"
                                        key={activity.id}
                                    >

                                        <div className="recent-left">

                                            <div
                                                className={`icon ${activity.type}`}
                                            >
                                                {activity.icon}
                                            </div>

                                            <div className="content">

                                                <h4>
                                                    {activity.title}
                                                </h4>

                                                <p>
                                                    {activity.time}
                                                </p>

                                            </div>

                                        </div>


                                        <span
                                            className={`recent-badge ${
                                                activity.tag === "Easy"
                                                    ? "easy"
                                                    : activity.tag === "Medium"
                                                    ? "medium"
                                                    : activity.tag === "Hard"
                                                    ? "hard"
                                                    : "test"
                                            }`}
                                        >
                                            {activity.tag}
                                        </span>

                                    </div>

                                ))

                            ) : (

                                <div className="no-activity">
                                    No recent activity found.
                                </div>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </>
    );
};

export default Recent;