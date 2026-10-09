import AvailableState from "./AvailableState";
import Challenge from "./ChallengeCard";
import EmptyChallenge from "./EmptyState";

import "../../../styles/Dashboard/DailyChallenge/DailyChallenge.scss";

const DailyChallenge = ({ dailyGoal }) => {

    // ==========================================
    // NO DAILY GOAL
    // ==========================================

    if (!dailyGoal) {
        return <EmptyChallenge />;
    }


    // ==========================================
    // PRACTICE CHALLENGE
    // ==========================================

    if (
        dailyGoal.targetType === "practice" &&
        dailyGoal.practice
    ) {

        const practice = dailyGoal.practice;

        const challenge = {

            id: practice._id,

            type: "practice",

            title: practice.title,

            slug: practice.slug,

            description:
                `Challenge yourself by solving this ${
                    practice.topic || "coding"
                } problem and improve your coding skills.`,

            difficulty:
                practice.difficulty || "Medium",

            topic:
                practice.topic || "General",

            language:
                practice.language || null,

            estimatedTime:
                practice.estimatedTime || null,

            xp:
                practice.xp ??
                dailyGoal.xpReward ??
                0,

            status:
                dailyGoal.isCompleted
                    ? "completed"
                    : "pending",

        };

        return (
            <Challenge
                challenge={challenge}
            />
        );
    }


    // ==========================================
    // TEST CHALLENGE
    // ==========================================

    if (
        dailyGoal.targetType === "test" &&
        dailyGoal.test
    ) {

        const test = dailyGoal.test;

        const challenge = {

            id: test._id,

            type: "test",

            title: test.title,

            slug: test.slug,

            description:
                `Complete this ${
                    test.topic || "programming"
                } test and challenge yourself.`,

            difficulty:
                test.difficulty || "Medium",

            topic:
                test.topic || "General",

            // Test me normally language nahi hoti
            language: null,

            estimatedTime:
                test.estimatedTime || null,

            xp:
                test.xp ??
                dailyGoal.xpReward ??
                0,

            status:
                dailyGoal.isCompleted
                    ? "completed"
                    : "pending",

        };

        return (
            <Challenge
                challenge={challenge}
            />
        );
    }


    // ==========================================
    // LESSON
    // ==========================================

    if (
        dailyGoal.targetType === "lesson" &&
        dailyGoal.lesson
    ) {

        const lesson = dailyGoal.lesson;

        const challenge = {

            id: lesson._id,

            type: "lesson",

            title: lesson.title,

            slug: lesson.slug,

            description:
                "Complete this lesson and improve your skills.",

            difficulty: "Lesson",

            topic: "Learning",

            language: null,

            estimatedTime: null,

            xp:
                dailyGoal.xpReward || 0,

            status:
                dailyGoal.isCompleted
                    ? "completed"
                    : "pending",

        };

        return (
            <Challenge
                challenge={challenge}
            />
        );
    }


    // ==========================================
    // GOAL EXISTS BUT CHALLENGE IS NOT AVAILABLE
    // ==========================================

    return <EmptyChallenge />;
};

export default DailyChallenge;