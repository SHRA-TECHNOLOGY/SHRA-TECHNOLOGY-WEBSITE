import React from 'react'
import { ChevronUp } from 'lucide-react'
import '../../../styles/Test/TestAttempt/RightSide.scss'

const RightSide = ({ questions, currentIndex, attempt, setAttempt, goToQuestion, mode, backToResult }) => {


    const navigatorLegend = [
        {
            id: 1,
            title: "Current",
            color: "#2563EB",
            bgColor: "rgba(37, 99, 235, 0.18)"
        },
        {
            id: 2,
            title: "Attempted",
            color: "#22C55E",
            bgColor: "rgba(34, 197, 94, 0.18)"
        },
        {
            id: 3,
            title: "Review",
            color: "#F59E0B",
            bgColor: "rgba(245, 158, 11, 0.18)"
        },
        {
            id: 4,
            title: "Not Attempted",
            color: "#D1D5DB",
            bgColor: "transparent"
        }
    ];

    return (
        <div className='attempt-right-section'>

            <div className="header-section">
                <h2>Question Navigator</h2>
                <span><ChevronUp size={34} /></span>

            </div>

            {/* navigator legend */}

            <div className="navigator-legend">

                {navigatorLegend.map((item) => (

                    <div
                        className="legend-item"
                        key={item.id}
                    >

                        <span
                            className="legend-dot"
                            style={{
                                background: item.bgColor,
                                borderColor: item.color,
                                borderWidth: "2px",
                                borderStyle: "solid",

                                ...(item.title !== "Not Attempted" && {
                                    backgroundColor: item.color
                                })
                            }}
                        />

                        <p>{item.title}</p>

                    </div>

                ))}

            </div>

            {/* question navigator section  here */}

            <div className="navigator-container">
                {
                    questions.map((question, index) => {


                        let status;

                        if (mode === "attempt") {

                            const isCurrent = currentIndex === index;

                            const isAnswered = attempt.answers[question._id] !== undefined;

                            const isReview = attempt.review.includes(question._id);

                            status = "not-attempted";

                            if (isCurrent) {
                                status = "current";
                            } else if (isReview) {
                                status = "review";
                            } else if (isAnswered) {
                                status = "answered";
                            }

                        } else {

                            status = question.status;

                            if (currentIndex === index) {
                                status = "current";
                            }

                        }

                        return (
                            <button
                                key={question._id}
                                className={`
                                        question-box
                                        ${status}
                                `}

                                onClick={() => goToQuestion(index)}
                            >
                                {index + 1}
                            </button>
                        );
                    })
                }
            </div>


            {/* summary card here */}

            {

                mode === "attempt" && (

                    <div className="summary-card">
                        <h3>Summary</h3>

                        <div className="summary-list">

                            <div className="left">
                                <span className='attempted'></span>
                                <p>Attempted</p>
                            </div>

                            <p>{Object.keys(attempt.answers).length}</p>

                        </div>

                        <div className="summary-list">

                            <div className="left">
                                <span className='markView'></span>
                                <p>Marked of view</p>
                            </div>

                            <p>{attempt.review.length}</p>

                        </div>
                        <div className="summary-list">

                            <div className="left">
                                <span className='notAttempted'></span>
                                <p>Not Attempted</p>
                            </div>

                            <p>{questions.length - Object.keys(attempt.answers).length}</p>

                        </div>
                        <div className="summary-list">

                            <p>Total Questions</p>

                            <p>{questions.length}</p>

                        </div>
                    </div>
                )
            }

            {
                mode === "review" && (
                    <button className='backToResultBtn' onClick={() => backToResult()}>Back to Result</button>
                )
            }

        </div>
    )
}

export default RightSide
