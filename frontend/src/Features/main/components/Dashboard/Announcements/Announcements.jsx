import { useState } from "react";

import LatestAnnouncementsCard from "./AnnouncementCard";
import EmptyState from "./EmptyState";
import AnnouncementsModel from "./AnnouncementsModel";

import "../../../styles/Dashboard/Announcements.scss";

const Announcements = ({ announcements = [] }) => {
  const [showAll, setShowAll] = useState(false);

  // ==========================================
  // Empty State
  // ==========================================

  if (!announcements.length) {
    return <EmptyState />;
  }

  // ==========================================
  // Dashboard Preview
  // Only latest 3
  // ==========================================

  const previewAnnouncements = announcements.slice(0, 3);

  return (
    <>
      <section className="latest-announcements">

        {/* Header */}

        <div className="announcement-header">

          <h2>
            Latest Announcements
          </h2>

          <button
            onClick={() => setShowAll(true)}
          >
            View All
          </button>

        </div>

        {/* Announcement List */}

        <div className="announcement-list">

          {previewAnnouncements.map((item) => (

            <LatestAnnouncementsCard
              key={item._id}
              item={item}
            />

          ))}

        </div>

      </section>

      {/* View All Modal */}

      <AnnouncementsModel
        announcements={announcements}
        showAll={showAll}
        setShowAll={setShowAll}
      />
    </>
  );
};

export default Announcements;