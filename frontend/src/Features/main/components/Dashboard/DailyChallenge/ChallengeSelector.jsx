import React, { useState } from "react";
import { createPortal } from "react-dom";

import {
    X,
    Code2,
    ClipboardList,
    ArrowLeft,
    ArrowRight,
    Search,
    Trophy,
    Check,
} from "lucide-react";

import {
    useChallengeOptions,
    useCreateDailyChallenge,
} from "../../../Hooks/Dashboard/useDailyChallenge";

import "../../../styles/Dashboard/DailyChallenge/ChallengeSelector.scss";

const ChallengeSelector = ({ onClose, onSelect }) => {
    const [step, setStep] = useState("category");
    const [category, setCategory] = useState(null);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [search, setSearch] = useState("");

    // ==========================================
    // FETCH PRACTICE + TEST
    // ==========================================

    const {
        data:challengeOptions,
        loading,
        error,
    } = useChallengeOptions();

    console.log(
        "Challenge Options:",
        challengeOptions
    );

    // ==========================================
    // CREATE DAILY CHALLENGE
    // ==========================================

    const {
        mutate: createChallenge,
        isPending: isCreating,
    } = useCreateDailyChallenge();

    // ==========================================
    // BACKEND DATA
    // ==========================================

    const practiceProblems =
        challengeOptions?.problems || [];

    const tests =
        challengeOptions?.tests || [];

    // ==========================================
    // CATEGORY SELECT
    // ==========================================

    const handleCategorySelect = (type) => {
        setCategory(type);
        setSearch("");
        setSelectedProblem(null);
        setStep("list");
    };

    // ==========================================
    // BACK
    // ==========================================

    const handleBack = () => {
        if (step === "list") {
            setStep("category");
            setCategory(null);
            setSelectedProblem(null);
            setSearch("");
            return;
        }

        if (step === "details") {
            setStep("list");
            setSelectedProblem(null);
        }
    };

    // ==========================================
    // CURRENT ITEMS
    // ==========================================

    const currentItems =
        category === "practice"
            ? practiceProblems
            : tests;

    // ==========================================
    // SEARCH
    // ==========================================

    const filteredItems = currentItems.filter((item) =>
        item.title
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    // ==========================================
    // SELECT PROBLEM / TEST
    // ==========================================

    const handleSelectProblem = (item) => {
        setSelectedProblem(item);
        setStep("details");
    };

    // ==========================================
    // CREATE DAILY CHALLENGE
    // ==========================================

    const handleCreateChallenge = () => {
        if (!selectedProblem) return;

        const payload = {
            targetType: category,

            target: 1,

            practice:
                category === "practice"
                    ? selectedProblem._id
                    : null,

            lesson: null,

            test:
                category === "test"
                    ? selectedProblem._id
                    : null,

            xpReward:
                selectedProblem.xp || 25,
        };

        console.log(
            "Create Daily Challenge Payload:",
            payload
        );

        createChallenge(payload, {
            onSuccess: (data) => {
                console.log(
                    "Daily Challenge Created:",
                    data
                );

                // Backend se populated DailyGoal
                // parent ko bhej do
                onSelect(data.dailyGoal);

                // Overlay close
                onClose();
            },
        });
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return createPortal(
            <div className="challenge-overlay">
                <div className="challenge-selector">
                    <div className="challenge-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading challenges...</p>
                    </div>
                </div>
            </div>,
            document.body
        );
    }

    // ==========================================
    // ERROR
    // ==========================================

    if (error) {
        return createPortal(
            <div
                className="challenge-overlay"
                onMouseDown={(e) => {
                    if (e.target === e.currentTarget) {
                        onClose();
                    }
                }}
            >
                <div className="challenge-selector">
                    <div className="challenge-error">
                        <Trophy />

                        <h3>
                            Failed to Load Challenges
                        </h3>

                        <p>
                            Please try again later.
                        </p>

                        <button
                            type="button"
                            className="create-challenge-btn"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        );
    }

    // ==========================================
    // MODAL
    // ==========================================

    return createPortal(
        <div
            className="challenge-overlay"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="challenge-selector">

                {/* ==================================
                    HEADER
                ================================== */}

                <div className="selector-header">

                    <div className="selector-header-left">

                        {step !== "category" && (
                            <button
                                type="button"
                                className="back-btn"
                                onClick={handleBack}
                                aria-label="Go back"
                            >
                                <ArrowLeft />
                            </button>
                        )}

                        <div className="selector-icon">
                            <Trophy />
                        </div>

                        <div className="selector-heading">

                            <h2>
                                {step === "category"
                                    ? "Create Challenge"
                                    : step === "list"
                                        ? category === "practice"
                                            ? "Practice Problems"
                                            : "Available Tests"
                                        : "Challenge Preview"}
                            </h2>

                            <p>
                                {step === "category"
                                    ? "Choose what you want to challenge."
                                    : step === "list"
                                        ? category === "practice"
                                            ? "Select a problem for your challenge."
                                            : "Select a test for your challenge."
                                        : "Review your selected challenge."}
                            </p>

                        </div>
                    </div>

                    <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X />
                    </button>

                </div>


                {/* ==================================
                    CATEGORY
                ================================== */}

                {step === "category" && (

                    <div className="category-section">

                        <h3>
                            Choose Category
                        </h3>

                        <div className="category-grid">

                            {/* PRACTICE */}

                            <button
                                type="button"
                                className="category-card"
                                onClick={() =>
                                    handleCategorySelect(
                                        "practice"
                                    )
                                }
                            >

                                <div className="category-icon practice">
                                    <Code2 />
                                </div>

                                <div className="category-content">

                                    <h4>
                                        Practice
                                    </h4>

                                    <p>
                                        Choose a coding problem
                                        and make it your challenge.
                                    </p>

                                    <span>
                                        {practiceProblems.length} Problems
                                    </span>

                                </div>

                                <ArrowRight className="category-arrow" />

                            </button>


                            {/* TEST */}

                            <button
                                type="button"
                                className="category-card"
                                onClick={() =>
                                    handleCategorySelect(
                                        "test"
                                    )
                                }
                            >

                                <div className="category-icon test">
                                    <ClipboardList />
                                </div>

                                <div className="category-content">

                                    <h4>
                                        Test
                                    </h4>

                                    <p>
                                        Select a test and challenge
                                        yourself.
                                    </p>

                                    <span>
                                        {tests.length} Tests
                                    </span>

                                </div>

                                <ArrowRight className="category-arrow" />

                            </button>

                        </div>

                    </div>
                )}


                {/* ==================================
                    PROBLEM / TEST LIST
                ================================== */}

                {step === "list" && (

                    <div className="problem-list-section">

                        <div className="list-top">

                            <div>

                                <h3>
                                    {category === "practice"
                                        ? "Select Problem"
                                        : "Select Test"}
                                </h3>

                                <span>
                                    {filteredItems.length} available
                                </span>

                            </div>

                            <div className="search-box">

                                <Search />

                                <input
                                    type="text"
                                    placeholder={
                                        category === "practice"
                                            ? "Search problems..."
                                            : "Search tests..."
                                    }
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />

                            </div>

                        </div>


                        <div className="problem-list">

                            {filteredItems.length > 0 ? (

                                filteredItems.map((item) => (

                                    <button
                                        type="button"
                                        key={item._id}
                                        className="problem-item"
                                        onClick={() =>
                                            handleSelectProblem(item)
                                        }
                                    >

                                        <div className="problem-item-icon">

                                            {category === "practice" ? (
                                                <Code2 />
                                            ) : (
                                                <ClipboardList />
                                            )}

                                        </div>


                                        <div className="problem-info">

                                            <h4>
                                                {item.title}
                                            </h4>

                                            <div className="problem-meta">

                                                {item.topic && (
                                                    <span>
                                                        {item.topic}
                                                    </span>
                                                )}

                                                {item.difficulty && (
                                                    <span
                                                        className={`difficulty ${item.difficulty.toLowerCase()}`}
                                                    >
                                                        {item.difficulty}
                                                    </span>
                                                )}

                                                {category === "practice" ? (
                                                    item.language && (
                                                        <span>
                                                            {item.language}
                                                        </span>
                                                    )
                                                ) : (
                                                    item.questions && (
                                                        <span>
                                                            {item.questions} Questions
                                                        </span>
                                                    )
                                                )}

                                            </div>

                                        </div>


                                        <div className="problem-xp">
                                            +{item.xp || 0} XP
                                        </div>

                                        <ArrowRight className="item-arrow" />

                                    </button>

                                ))

                            ) : (

                                <div className="empty-list">

                                    <Search />

                                    <h4>
                                        No results found
                                    </h4>

                                    <p>
                                        Try another search.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>
                )}


                {/* ==================================
                    PREVIEW
                ================================== */}

                {step === "details" &&
                    selectedProblem && (

                        <div className="preview-section">

                            <div className="preview-card">

                                <div className="preview-top">

                                    <div className="preview-icon">

                                        {category === "practice" ? (
                                            <Code2 />
                                        ) : (
                                            <ClipboardList />
                                        )}

                                    </div>

                                    <span
                                        className={`difficulty ${selectedProblem.difficulty?.toLowerCase()}`}
                                    >
                                        {selectedProblem.difficulty}
                                    </span>

                                </div>


                                <h2>
                                    {selectedProblem.title}
                                </h2>

                                <p>
                                    {category === "practice"
                                        ? `Challenge yourself by solving this ${selectedProblem.topic || "coding"} problem.`
                                        : `Complete this ${selectedProblem.topic || "programming"} test and challenge yourself.`}
                                </p>


                                <div className="preview-meta">

                                    <div>

                                        <span>
                                            Category
                                        </span>

                                        <strong>
                                            {category === "practice"
                                                ? "Practice"
                                                : "Test"}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Topic
                                        </span>

                                        <strong>
                                            {selectedProblem.topic || selectedProblem.subject || "-"}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Reward
                                        </span>

                                        <strong className="xp">
                                            +{selectedProblem.xp || 0} XP
                                        </strong>

                                    </div>

                                </div>

                            </div>


                            <button
                                type="button"
                                className="create-challenge-btn"
                                onClick={()=> handleCreateChallenge(selectedProblem)}
                                disabled={isCreating}
                            >

                                {isCreating ? (
                                    <>
                                        <span className="button-spinner"></span>
                                        Adding Challenge...
                                    </>
                                ) : (
                                    <>
                                        <Check />
                                        Add Challenge
                                    </>
                                )}

                            </button>

                        </div>
                    )}

            </div>
        </div>,

        document.body
    );
};

export default ChallengeSelector;