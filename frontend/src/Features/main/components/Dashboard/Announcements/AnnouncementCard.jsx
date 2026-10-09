import React from "react";

const LatestAnnouncementsCard = ({ item }) => {
  // ==========================================
  // Announcement Type Styling
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

  const style = typeStyles[item?.type] || {
    color: "#6C4EFF",
    background: "#EEE9FF",
  };

  // ==========================================
  // Date Formatting
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "";

    const announcementDate = new Date(date);

    if (Number.isNaN(announcementDate.getTime())) {
      return "";
    }

    const today = new Date();

    const isToday =
      announcementDate.toDateString() ===
      today.toDateString();

    if (isToday) {
      return "Today";
    }

    const tomorrow = new Date();

    tomorrow.setDate(tomorrow.getDate() + 1);

    const isTomorrow =
      announcementDate.toDateString() ===
      tomorrow.toDateString();

    if (isTomorrow) {
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

  return (
    <div className="announcement-item">

      {/* Category */}

      <span
        className="category"
        style={{
          color: style.color,
          background: style.background,
        }}
      >
        {item?.type || "Notice"}
      </span>

      {/* Content */}

      <div className="announcement-content">

        <h3>
          {item?.title || "Announcement"}
        </h3>

        <p>
          {item?.description || ""}
        </p>

      </div>

      {/* Date */}

      <span className="date">
        {formatDate(
          item?.createdAt || item?.startDate
        )}
      </span>

    </div>
  );
};

export default LatestAnnouncementsCard;