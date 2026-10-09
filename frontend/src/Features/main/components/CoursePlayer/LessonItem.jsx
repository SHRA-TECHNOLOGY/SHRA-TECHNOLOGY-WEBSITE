import {
    Lock,
    CheckCircle,
    PlayCircle,
    Clock,
} from "lucide-react";

const LessonItem = ({
    lesson,
    currentLesson,
    setCurrentLesson,
    completed,
    isLocked,
}) => {
    const isComingSoon = lesson.status === "Coming Soon";
    const isAvailable = lesson.status === "Available";

    // Coming Soon, unavailable aur locked lessons block honge
    const isLessonLocked =
        isLocked || isComingSoon || !isAvailable;

    const handleClick = () => {
        if (isLessonLocked) return;

        // Completed lesson bhi dobara play ho sakta hai
        setCurrentLesson(lesson);
    };

    return (
        <div
            role="button"
            tabIndex={isLessonLocked ? -1 : 0}
            aria-disabled={isLessonLocked}
            className={`lesson-item
                ${currentLesson?.id === lesson.id ? "active" : ""}
                ${isLessonLocked ? "locked" : ""}
                ${isComingSoon ? "coming-soon" : ""}
                ${completed ? "completed" : ""}
            `}
            onClick={handleClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                }
            }}
        >
            {/* Lesson Icon */}
            <div className="lesson-icon">
                {completed ? (
                    <CheckCircle size={22} color="green" />
                ) : isComingSoon ? (
                    <Clock size={22} />
                ) : isLessonLocked ? (
                    <Lock size={22} />
                ) : (
                    <PlayCircle size={22} />
                )}
            </div>

            {/* Lesson Information */}
            <div className="lesson-info">
                <h4>{lesson.title}</h4>

                <span>
                    {isComingSoon
                        ? "Coming Soon"
                        : lesson.duration > 0
                            ? `${Math.floor(lesson.duration / 60)} min`
                            : "Duration unavailable"}
                </span>
            </div>

            {/* Status Badge */}
            {isComingSoon ? (
                <span className="lesson-status-badge coming-soon-badge">
                    Coming Soon
                </span>
            ) : completed ? (
                <span className="lesson-status-badge completed-badge">
                    Completed
                </span>
            ) : lesson.isPreview ? (
                <span className="preview-badge">
                    Preview
                </span>
            ) : null}
        </div>
    );
};

export default LessonItem;