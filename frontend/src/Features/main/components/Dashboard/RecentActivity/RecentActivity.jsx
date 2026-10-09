import React, { useState } from "react";

import ActivityCard from "./ActivityCard";
import EmptyState from "./EmptyState";
import RecentModel from "./RecentModel";

import "../../../styles/Dashboard/RecentActivity.scss";

const RecentActivity = ({ recentActivity = [] }) => {
  
  const [showAll, setShowAll] = useState(false);

  // ================================
  // Empty State
  // ================================

  if (recentActivity.length === 0) {
    return <EmptyState />;
  }

  // ================================
  // Dashboard Preview
  // Only latest 5 activities
  // ================================

  const previewActivity = recentActivity.slice(0, 5);

  return (
    <>
      <section className="recent-activity recent-dashboard">

        {/* Header */}

        <div className="activity-header">

          <h2>Recent Activity</h2>

          <button
            onClick={() => setShowAll(true)}
          >
            View All
          </button>

        </div>

        {/* Activity List */}

        <div className="activity-list">

          {previewActivity.map((activity) => (

            <ActivityCard
              key={activity._id}
              activity={activity}
            />

          ))}

        </div>

      </section>

      {/* View All Modal */}

      <RecentModel
        showAll={showAll}
        recentActivities={recentActivity}
        setShowAll={setShowAll}
      />
    </>
  );
};

export default RecentActivity;