import { useEffect, useCallback } from "react";

import { useUpdateCourseProgress } from "./Course/useCourse";

const useProgress = (
    playerRef,
    lessonId,
    courseId,
    sectionId
) => {

    const {
        mutate: updateProgress
    } = useUpdateCourseProgress();


    // ==========================================
    // SAVE PROGRESS
    // ==========================================

    const saveProgress = useCallback(
        (completed = false) => {

            const player = playerRef.current;

            if (!player || !lessonId || !courseId) {
                console.log("Progress save skipped");
                return;
            }

            const currentTime =
                player.getCurrentTime() || 0;

            const duration =
                player.getDuration() || 0;


            // ==========================================
            // CALCULATE PROGRESS
            // ==========================================

            let progress = 0;

            if (duration > 0) {

                progress =
                    (currentTime / duration) * 100;

            }


            // ==========================================
            // COMPLETE HONE PAR 100%
            // ==========================================

            if (completed) {
                progress = 100;
            }


            // ==========================================
            // LOCAL STORAGE
            // ==========================================

            localStorage.setItem(
                `course-${courseId}-lesson-${lessonId}`,
                currentTime
            );


            // ==========================================
            // API
            // ==========================================

            updateProgress({
                courseId,
                lessonId,
                sectionId,
                currentTime,
                progress,
                completed
            });

        },
        [
            playerRef,
            lessonId,
            courseId,
            sectionId,
            updateProgress
        ]
    );


    // ==========================================
    // EVERY 15 SECOND SAVE
    // ==========================================

    useEffect(() => {

        if (!courseId || !lessonId) return;

        const interval = setInterval(() => {

            saveProgress(false);

        }, 15000);


        return () => {

            clearInterval(interval);

        };

    }, [
        courseId,
        lessonId,
        saveProgress
    ]);


    // ==========================================
    // RESUME VIDEO
    // ==========================================

    useEffect(() => {

        if (!courseId || !lessonId) return;


        const savedTime = localStorage.getItem(
            `course-${courseId}-lesson-${lessonId}`
        );


        if (!savedTime) return;


        const interval = setInterval(() => {

            const player = playerRef.current;

            if (!player) return;


            const duration =
                player.getDuration();


            if (duration > 0) {

                player.seekTo(
                    Number(savedTime),
                    true
                );

                clearInterval(interval);

            }

        }, 500);


        return () => {

            clearInterval(interval);

        };

    }, [
        courseId,
        lessonId,
        playerRef
    ]);


    return {
        saveProgress
    };
};

export default useProgress;