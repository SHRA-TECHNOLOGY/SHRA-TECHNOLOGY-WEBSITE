import React from "react";
import { useNavigate } from "react-router";

import {
    Trophy,
    Code2,
    ClipboardList,
    ArrowRight,
    Clock3,
    Zap,
    CheckCircle2,
} from "lucide-react";

import {
    useDailyChallenge,
} from "../../../Hooks/Dashboard/useDailyChallenge";

import "../../../styles/Dashboard/DailyChallenge/ChallengeCard.scss";


const Challenge = () => {

    const navigate = useNavigate();

    // ==========================================
    // GET DAILY CHALLENGE
    // ==========================================

    const {
        data: dailyChallengeData,
        isLoading,
        isError,
    } = useDailyChallenge();


    // ==========================================
    // LOADING
    // ==========================================

    if (isLoading) {
        return (
            <section className="challenge-section">

                <div className="challenge-card">

                    <div className="challenge-content">
                        <p>
                            Loading today's challenge...
                        </p>
                    </div>

                </div>

            </section>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (isError) {
        return (
            <section className="challenge-section">

                <div className="challenge-card">

                    <div className="challenge-content">
                        <h2>
                            Unable to load challenge
                        </h2>

                        <p>
                            Please try again later.
                        </p>
                    </div>

                </div>

            </section>
        );
    }


    // ==========================================
    // DAILY GOAL
    // ==========================================

    const dailyGoal =
        dailyChallengeData?.dailyGoal;


    // ==========================================
    // NO CHALLENGE
    // ==========================================

    if (!dailyGoal) {
        return null;
    }


    // ==========================================
    // GET SELECTED CHALLENGE
    // ==========================================

    const isPractice =
        dailyGoal.targetType === "practice";

    const isTest =
        dailyGoal.targetType === "test";


    const selectedChallenge = isPractice
        ? dailyGoal.practice
        : isTest
            ? dailyGoal.test
            : null;


    // ==========================================
    // INVALID CHALLENGE
    // ==========================================

    if (!selectedChallenge) {
        return null;
    }


    // ==========================================
    // CHALLENGE DATA
    // ==========================================

    const title =
        selectedChallenge.title || "Untitled Challenge";

    const difficulty =
        selectedChallenge.difficulty || "Medium";

    const topic =
        selectedChallenge.topic || "General";

    const language =
        selectedChallenge.language || null;

    const estimatedTime =
        selectedChallenge.estimatedTime || null;

    const xp =
        selectedChallenge.xp ??
        dailyGoal.xpReward ??
        0;

    const slug =
        selectedChallenge.slug;


    // ==========================================
    // STATUS
    // ==========================================

    const isCompleted =
        dailyGoal.isCompleted === true;


    // ==========================================
    // DESCRIPTION
    // ==========================================

    const description = isPractice
        ? `Challenge yourself by solving this ${topic} problem and improve your coding skills.`
        : `Complete this ${topic} test and challenge yourself.`;


    // ==========================================
    // SOLVE CHALLENGE
    // ==========================================

    const handleSolveChallenge = () => {

        if (!slug || !language || !difficulty) {
            return;
        }

        if (isPractice) {
            navigate(`/practice/${language}/${difficulty}/${slug}`);
            return;
        }

        if (isTest) {
            navigate(`/test/${slug}`);
        }
    };


    // ==========================================
    // UI
    // ==========================================

    return (
        <section className="challenge-section">

            <div className="challenge-card">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="challenge-header">

                    <div className="challenge-heading">

                        <div className="challenge-title-icon">
                            <Trophy />
                        </div>


                        <div className="challenge-heading-content">

                            <div className="challenge-title-row">

                                <h3>
                                    Daily Challenge
                                </h3>


                                <span
                                    className={`challenge-difficulty ${difficulty.toLowerCase()}`}
                                >
                                    {difficulty}
                                </span>

                            </div>


                            <p>
                                Complete your challenge
                                and improve your skills.
                            </p>

                        </div>

                    </div>

                </div>


                {/* =====================================
                    TYPE
                ===================================== */}

                <div className="challenge-card-top">

                    <div className="challenge-type">

                        <div className="challenge-type-icon">

                            {isPractice ? (
                                <Code2 />
                            ) : (
                                <ClipboardList />
                            )}

                        </div>


                        <span className="challenge-type-label">
                            {isPractice
                                ? "Practice"
                                : "Test"}
                        </span>

                    </div>

                </div>


                {/* =====================================
                    CONTENT
                ===================================== */}

                <div className="challenge-content">

                    <h2>
                        {title}
                    </h2>


                    <p>
                        {description}
                    </p>

                </div>


                {/* =====================================
                    META
                ===================================== */}

                <div className="challenge-meta">


                    {/* TOPIC */}

                    <div className="challenge-meta-item">

                        <span className="meta-label">
                            Topic
                        </span>


                        <strong>
                            {topic}
                        </strong>

                    </div>


                    {/* LANGUAGE */}

                    <div className="challenge-meta-item">

                        <span className="meta-label">
                            Language
                        </span>


                        <strong>
                            {language || "—"}
                        </strong>

                    </div>


                    {/* TIME */}

                    <div className="challenge-meta-item">

                        <span className="meta-label">
                            Time
                        </span>


                        <strong>

                            <Clock3 />

                            {estimatedTime
                                ? `${estimatedTime} min`
                                : "—"}

                        </strong>

                    </div>


                    {/* XP */}

                    <div className="challenge-meta-item xp">

                        <span className="meta-label">
                            Reward
                        </span>


                        <strong>

                            <Zap />

                            +{xp} XP

                        </strong>

                    </div>

                </div>


                {/* =====================================
                    FOOTER
                ===================================== */}

                <div className="challenge-footer">


                    <div className="challenge-status">

                        {isCompleted ? (

                            <>
                                <CheckCircle2 />

                                <span>
                                    Completed
                                </span>
                            </>

                        ) : (

                            <>
                                <span className="status-dot" />

                                <span>
                                    Challenge Pending
                                </span>
                            </>

                        )}

                    </div>


                    {/* SOLVE BUTTON */}

                    <button
                        type="button"
                        className={`solve-challenge-btn ${
                            isCompleted
                                ? "completed"
                                : ""
                        }`}
                        onClick={handleSolveChallenge}
                    >

                        {isCompleted
                            ? "View Challenge"
                            : "Solve Challenge"}


                        <ArrowRight />

                    </button>

                </div>

            </div>

        </section>
    );
};


export default Challenge;