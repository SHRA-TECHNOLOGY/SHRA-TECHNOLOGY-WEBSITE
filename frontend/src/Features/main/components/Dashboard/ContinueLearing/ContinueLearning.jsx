import EmptyState from "./EmptyState";
import ActiveState from "./ActiveState";

import "../../../styles/Dashboard/ContinueLearning.scss";

const ContinueLearning = ({ continueLearning }) => {

  // ==========================================
  // No course / no lesson watched
  // ==========================================

  if (!continueLearning) {
    return <EmptyState />;
  }

  // ==========================================
  // Course already completed
  // ==========================================

  if (
    Number(continueLearning.progressPercentage || 0) >= 100
  ) {
    return (
      <EmptyState />
    );
  }

  // ==========================================
  // Active Learning
  // ==========================================

  return (
    <ActiveState
      course={continueLearning.course}
      lesson={continueLearning.lesson}
      progressPercentage={
        continueLearning.progressPercentage
      }
      lastWatchedAt={
        continueLearning.lastWatchedAt
      }
    />
  );
};

export default ContinueLearning;