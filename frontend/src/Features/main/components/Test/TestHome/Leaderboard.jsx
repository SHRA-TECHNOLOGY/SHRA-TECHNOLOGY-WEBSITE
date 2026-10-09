import React, { useState } from "react";
import "../../../styles/Test/TestHome/Leaderboard.scss";
import { useTestXPLeaderboard } from "../../../Hooks/Test/useTest";

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState("week");
    const [showAll, setShowAll] = useState(false);

    const {
        data,
        isLoading,
        isError,
    } = useTestXPLeaderboard();

    const currentData = data?.[activeTab];

    const leaderboard = currentData?.leaderboard || [];
    const currentUserRank = currentData?.currentUserRank || null;

    if (isLoading) {
        return (
            <div className="test-leaderboard">
                <div className="header">
                    <h2>Leaderboard</h2>
                </div>

                <div className="empty-leaderboard">
                    Loading leaderboard...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="test-leaderboard">
                <div className="header">
                    <h2>Leaderboard</h2>
                </div>

                <div className="empty-leaderboard">
                    Failed to load leaderboard.
                </div>
            </div>
        );
    }

    // Normal card → only 5 users
    const previewLeaderboard = leaderboard.slice(0, 5);

    return (
        <>
            {/* ==========================================
                MAIN LEADERBOARD CARD
            ========================================== */}

            <div className="test-leaderboard">

                <div className="header">
                    <h2>Leaderboard</h2>

                    <button onClick={() => setShowAll(true)}>
                        View All
                    </button>
                </div>

                {/* TABS */}

                <div className="leaderboard-tabs">

                    <button
                        className={activeTab === "week" ? "active" : ""}
                        onClick={() => setActiveTab("week")}
                    >
                        This Week
                    </button>

                    <button
                        className={activeTab === "month" ? "active" : ""}
                        onClick={() => setActiveTab("month")}
                    >
                        This Month
                    </button>

                    <button
                        className={activeTab === "all" ? "active" : ""}
                        onClick={() => setActiveTab("all")}
                    >
                        All Time
                    </button>

                </div>

                {/* PREVIEW — 5 USERS */}

                <div className="leader-list-section">

                    {previewLeaderboard.length === 0 ? (
                        <div className="empty-leaderboard">
                            No leaderboard data yet.
                        </div>
                    ) : (
                        previewLeaderboard.map((user) => {

                            const isCurrentUser =
                                user.rank === currentUserRank;

                            return (
                                <div
                                    className={`single-leader-list ${
                                        isCurrentUser
                                            ? "current-user"
                                            : ""
                                    }`}
                                    key={user.userId}
                                >

                                    <div className="leader-list-left">

                                        <span>
                                            {user.rank}
                                        </span>

                                        <span>
                                            {user.avatar ? (
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                />
                                            ) : (
                                                <div className="default-avatar">
                                                    {user.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()}
                                                </div>
                                            )}
                                        </span>

                                        <h3>
                                            {isCurrentUser
                                                ? "You"
                                                : user.name}
                                        </h3>

                                    </div>

                                    <h3>
                                        {user.xp}
                                    </h3>

                                </div>
                            );
                        })
                    )}

                </div>
            </div>


            {/* ==========================================
                VIEW ALL MODAL
            ========================================== */}

            {showAll && (
                <div
                    className="leaderboard-overlay"
                    onClick={() => setShowAll(false)}
                >

                    <div
                        className="leaderboard-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* MODAL HEADER */}

                        <div className="modal-header">

                            <div>
                                <h2>Leaderboard</h2>

                                <span>
                                    {activeTab === "week"
                                        ? "This Week"
                                        : activeTab === "month"
                                            ? "This Month"
                                            : "All Time"}
                                </span>
                            </div>

                            <button
                                className="close-button"
                                onClick={() => setShowAll(false)}
                            >
                                ×
                            </button>

                        </div>


                        {/* MODAL TABS */}

                        <div className="modal-tabs">

                            <button
                                className={
                                    activeTab === "week"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setActiveTab("week")
                                }
                            >
                                This Week
                            </button>

                            <button
                                className={
                                    activeTab === "month"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setActiveTab("month")
                                }
                            >
                                This Month
                            </button>

                            <button
                                className={
                                    activeTab === "all"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setActiveTab("all")
                                }
                            >
                                All Time
                            </button>

                        </div>


                        {/* MODAL LIST */}

                        <div className="modal-leader-list">

                            {leaderboard.length === 0 ? (
                                <div className="empty-leaderboard">
                                    No leaderboard data yet.
                                </div>
                            ) : (
                                leaderboard
                                    .slice(0, 11)
                                    .map((user) => {

                                        const isCurrentUser =
                                            user.rank ===
                                            currentUserRank;

                                        return (
                                            <div
                                                className={`modal-leader-item ${
                                                    isCurrentUser
                                                        ? "current-user"
                                                        : ""
                                                }`}
                                                key={user.userId}
                                            >

                                                <div className="modal-user-left">

                                                    <span className="modal-rank">
                                                        {user.rank}
                                                    </span>

                                                    <span className="modal-avatar">

                                                        {user.avatar ? (
                                                            <img
                                                                src={user.avatar}
                                                                alt={user.name}
                                                            />
                                                        ) : (
                                                            <div className="default-avatar">
                                                                {user.name
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase()}
                                                            </div>
                                                        )}

                                                    </span>

                                                    <h3>
                                                        {isCurrentUser
                                                            ? "You"
                                                            : user.name}
                                                    </h3>

                                                </div>

                                                <strong>
                                                    {user.xp}
                                                </strong>

                                            </div>
                                        );
                                    })
                            )}

                        </div>

                    </div>

                </div>
            )}
        </>
    );
};

export default Leaderboard;