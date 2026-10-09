import { useNavigate } from "react-router";

import "../../../styles/Dashboard/recentActivityEmpty.scss";

const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <section className="activity-section">

      <div className="activity-empty-icon">
        📚
      </div>

      <div className="empty-content">

        <h2>
          No Recent Activity
        </h2>

        <p>
          Your learning activity will appear here as you
          complete lessons, solve coding problems, take tests,
          and earn achievements.
        </p>

        <span>
          Start learning today and build your activity history.
        </span>

        <button
          onClick={() => navigate("/course")}
        >
          Explore Courses →
        </button>

      </div>

    </section>
  );
};

export default EmptyState;