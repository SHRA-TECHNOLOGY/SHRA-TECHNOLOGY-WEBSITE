import UpcomingState from "./UpcomingState";
import LiveState from "./LiveState";
import RecordingState from "./RecordingState";
import EmptyState from "./EmptyState";

import "../../../styles/Dashboard/LiveClass.scss";

const LiveClass = ({ upcomingLiveClass }) => {

  // ==========================================
  // No Live Class
  // ==========================================

  if (!upcomingLiveClass) {
    return <EmptyState />;
  }

  // ==========================================
  // Live Class Status
  // ==========================================

  const now = new Date();
  const startAt = new Date(upcomingLiveClass.startAt);

  // Agar backend mein status directly available hai
  if (upcomingLiveClass.status === "live") {
    return (
      <LiveState
        data={upcomingLiveClass}
      />
    );
  }

  if (upcomingLiveClass.status === "recording") {
    return (
      <RecordingState
        data={upcomingLiveClass}
      />
    );
  }

  // ==========================================
  // Upcoming
  // ==========================================

  if (startAt > now) {
    return (
      <UpcomingState
        liveClass={upcomingLiveClass}
      />
    );
  }

  return <EmptyState />;
};

export default LiveClass;