import React from "react";
import { Award } from "lucide-react";
import "../../styles/Profile/EmptyBadge.scss";

const EmptyBadge = () => {
    return (
        <div className="empty-badge">

            <div className="empty-badge-icon">
                <Award />
            </div>

            <div className="empty-badge-content">
                <h4>No Badges Yet</h4>

                <p>
                    Start solving problems, completing tests,
                    and learning to earn your first badge.
                </p>
            </div>

            <div className="empty-badge-progress">
                <span>Keep learning 🚀</span>
            </div>

        </div>
    );
};

export default EmptyBadge;