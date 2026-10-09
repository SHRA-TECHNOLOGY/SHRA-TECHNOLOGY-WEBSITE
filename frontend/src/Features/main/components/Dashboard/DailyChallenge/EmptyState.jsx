import { useState } from "react";
import { Trophy } from "lucide-react";

import ChallengeSelector from "./ChallengeSelector";
import Challenge from "./ChallengeCard";

const EmptyChallenge = () => {

    const [showChallengeSelector, setShowChallengeSelector] =
        useState(false);

    const [selectedChallenge, setSelectedChallenge] =
        useState(null);


    // ==========================================
    // CHALLENGE SELECTED
    // ==========================================

    const handleChallengeSelect = (challenge) => {

        console.log(
            "Selected Challenge:",
            challenge
        );

        setSelectedChallenge(challenge);

        setShowChallengeSelector(false);
    };


    // ==========================================
    // NO CHALLENGE
    // ==========================================

    if (!selectedChallenge) {

        return (
            <>
                <section className="continue-card">

                    <div className="empty-continue-icon">
                        <Trophy />
                    </div>

                    <div className="empty-content">

                        <h2>
                            No Challenges Yet
                        </h2>

                        <p>
                            You haven't participated in any
                            challenge yet. Start solving
                            challenges and test your skills.
                        </p>

                        <button
                            type="button"
                            className="explore-courses-btn"
                            onClick={() =>
                                setShowChallengeSelector(true)
                            }
                        >
                            Explore Challenges
                        </button>

                    </div>

                </section>


                {showChallengeSelector && (
                    <ChallengeSelector
                        onClose={() =>
                            setShowChallengeSelector(false)
                        }
                        onSelect={handleChallengeSelect}
                    />
                )}
            </>
        );
    }


    // ==========================================
    // CHALLENGE SELECTED
    // ==========================================

    return (
        <>
            <Challenge
                challenge={selectedChallenge}
            />


            {/* Agar user challenge change karna chahe */}

            <button
                type="button"
                className="change-challenge-btn"
                onClick={() =>
                    setShowChallengeSelector(true)
                }
            >
                Change Challenge
            </button>


            {showChallengeSelector && (
                <ChallengeSelector
                    onClose={() =>
                        setShowChallengeSelector(false)
                    }
                    onSelect={handleChallengeSelect}
                />
            )}
        </>
    );
};

export default EmptyChallenge;