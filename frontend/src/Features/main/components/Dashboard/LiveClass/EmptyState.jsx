import { CalendarDays, Bell, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

import "../../../styles/Dashboard/upcomingClassEmpty.scss";

const EmptyState = () => {
    const navigate = useNavigate();
    return (
        <section className="live-card  empty-live-class">

            {/* Icon */}

            <div className="empty-live-icon">
                <CalendarDays size={34} />
            </div>

            {/* Content */}

            <div className="empty-live-content">

                <h2>
                    No Upcoming Live Classes
                </h2>

                <p>
                    There are no live classes scheduled right now.
                    New classes and sessions will appear here when
                    they are announced.
                </p>

                <div className="empty-live-info">
                    <Bell size={18} />

                    <span>
                        Turn on notifications to stay updated about
                        upcoming classes.
                    </span>
                </div>

                <button
                    type="button"
                    className="browse-classes-btn"
                    onClick={() => navigate("/live-classes")}
                >
                    Browse Classes
                    <ArrowRight size={18} />
                </button>

            </div>

        </section>
    );
};

export default EmptyState;