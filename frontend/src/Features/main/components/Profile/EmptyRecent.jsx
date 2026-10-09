import React from "react";
import { Clock3 } from "lucide-react";
import "../../styles/Profile/EmptyRecent.scss";

const EmptyRecent = () => {
    return (
        <div className="empty-recent">

            <div className="empty-recent-icon">
                <Clock3 />
            </div>

            <div className="empty-recent-content">
                <h4>No Recent Activity</h4>

                <p>
                    Your recent learning activities will
                    appear here once you start learning.
                </p>
            </div>

            <div className="empty-recent-hint">
                <span>Start your learning journey 🚀</span>
            </div>

        </div>
    );
};

export default EmptyRecent;