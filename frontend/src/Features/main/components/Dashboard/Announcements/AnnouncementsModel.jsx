import React from "react";
import { X } from "lucide-react";

const AnnouncementsModel = ({
  showAll,
  setShowAll,
  announcements = [],
}) => {

  // ==========================================
  // Category Styling
  // ==========================================

  const typeStyles = {
    "New Course": {
      color: "#6C4EFF",
      background: "#EEE9FF",
    },

    Contest: {
      color: "#6C4EFF",
      background: "#EEE9FF",
    },

    Offer: {
      color: "#FF4D4D",
      background: "#FFEAEA",
    },

    Event: {
      color: "#0EA5E9",
      background: "#E0F2FE",
    },

    Update: {
      color: "#22C55E",
      background: "#DCFCE7",
    },

    Notice: {
      color: "#F59E0B",
      background: "#FEF3C7",
    },
  };

  // ==========================================
  // Date Formatter
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "";

    const announcementDate = new Date(date);

    if (Number.isNaN(announcementDate.getTime())) {
      return "";
    }

    const today = new Date();

    if (
      announcementDate.toDateString() ===
      today.toDateString()
    ) {
      return "Today";
    }

    const tomorrow = new Date();

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

    if (
      announcementDate.toDateString() ===
      tomorrow.toDateString()
    ) {
      return "Tomorrow";
    }

    return announcementDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // Modal
  // ==========================================

  if (!showAll) {
    return null;
  }

  return (
    <div className="announcement-modal">

      <div className="modal-box">

        {/* Header */}

        <div className="modal-header">

          <h2>
            All Announcements
          </h2>

          <button
            type="button"
            onClick={() => setShowAll(false)}
            aria-label="Close announcements"
          >
            <X size={22} />
          </button>

        </div>

        {/* Announcement List */}

        <div className="announcement-list">

          {announcements.length === 0 ? (

            <p className="empty-announcement">
              No announcements available.
            </p>

          ) : (

            announcements.map((item) => {

              const style =
                typeStyles[item?.type] || {
                  color: "#6C4EFF",
                  background: "#EEE9FF",
                };

              return (
                <div
                  className="announcement-item"
                  key={item._id}
                >

                  {/* Type */}

                  <span
                    className="category"
                    style={{
                      color: style.color,
                      background:
                        style.background,
                    }}
                  >
                    {item?.type || "Notice"}
                  </span>

                  {/* Content */}

                  <div className="announcement-content">

                    <h3>
                      {item?.title ||
                        "Announcement"}
                    </h3>

                    <p>
                      {item?.description || ""}
                    </p>

                  </div>

                  {/* Date */}

                  <span className="date">
                    {formatDate(
                      item?.createdAt ||
                      item?.startDate
                    )}
                  </span>

                </div>
              );
            })
          )}

        </div>

      </div>

    </div>
  );
};

export default AnnouncementsModel;