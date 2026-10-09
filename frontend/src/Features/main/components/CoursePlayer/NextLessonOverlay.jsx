import { useEffect, useState } from "react";

import {
    Play,
    RotateCcw,
    CheckCircle
} from "lucide-react";

const NextLessonOverlay = ({

    nextLessonData,
    onNextLesson,
    setShowOverlay,
    replay,

}) => {

    const [countdown, setCountdown] = useState(5);

    //handle next lesion
    const handleNext = () => {

        if (!nextLessonData) return;

        setShowOverlay(false);

        onNextLesson();

    };

    //handle replay video
    const handleReplay = () => {

        setCountdown(5);
        setShowOverlay(false);

        replay();

    };

    useEffect(() => {

        if (countdown === 0) {

            setShowOverlay(false);

            if (nextLessonData) {
                onNextLesson();
            }

            return;
        }

        const timer = setTimeout(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);

    }, [countdown, nextLessonData, onNextLesson, setShowOverlay]);

    // set count next lesion start 5
    useEffect(() => {
        if (nextLessonData) {
            setCountdown(5);
        }
    }, [nextLessonData]);

    return (

        <div className="next-overlay">

            <div className="overlay-card">

                <CheckCircle
                    size={60}
                    className="success-icon"
                />

                <h2>
                    Lesson Completed 🎉
                </h2>

                <p>

                    Next lesson will start in

                    <strong>

                        {" "}
                        {countdown} sec

                    </strong>

                </p>

                <h3>
                    {nextLessonData
                        ? nextLessonData.title
                        : "Course Completed 🎉"}
                </h3>

                <div className="overlay-buttons">

                    {
                        nextLessonData && (
                            <button
                                className="primary-btn"
                                onClick={handleNext}
                            >

                                <Play size={18} />

                                Next Lesson

                            </button>
                        )
                    }

                    <button
                        className="secondary-btn"
                        onClick={handleReplay}
                    >

                        <RotateCcw size={18} />

                        Replay

                    </button>

                </div>

            </div>

        </div>

    );

};

export default NextLessonOverlay;