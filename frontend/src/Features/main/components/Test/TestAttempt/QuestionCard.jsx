import React, { useEffect } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Trash2,
    Bookmark
} from "lucide-react";
import '../../../styles/Test/TestAttempt/QuestionCard.scss'
import ComparisonAnswer from "../ReviewTest/ComparisonAnswer";

const QuestionCard = ({
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedAnswer,
    onSelect,
    prevQuestion,
    nextQuestion,
    onReview,
    onClear,
    mode
}) => {

    const optionLabels = ["A", "B", "C", "D"];


    return (
        <div className="question-card">

            {/* header section here */}

            <div className="question-header">

                <h3>
                    Question {currentIndex + 1} of {totalQuestions}
                </h3>

                <span className="question-marks">
                    {currentQuestion.marks} Marks
                </span>

            </div>

            {/* question here */}

            <h2 className="question-title">
                {currentQuestion.question}
            </h2>

            {/* option list here */}

            <div className="options-wrapper">

                {
                    currentQuestion.options.map((option, index) => {


                        const isSelected = currentQuestion.userAnswer === index;

                        const isCorrect = currentQuestion.correctAnswer === index;

                        let optionClass = "";

                        if (mode === "attempt") {

                            if (selectedAnswer === index) {
                                optionClass = "selected";
                            }

                        } else {

                            if (isCorrect) {

                                optionClass = "correct";

                            } else if (isSelected) {

                                optionClass = "wrong";

                            }

                        }

                        return (


                            <div
                                key={index}
                                className={`option-card ${optionClass}`}
                                onClick={mode === "attempt" ? () => onSelect(index) : undefined}
                            >

                                <div className="option-label">
                                    {optionLabels[index]}
                                </div>

                                <p>{option}</p>

                            </div>
                        )


                    })
                }

            </div>

            {
                mode === "review" && (
                    <>
                        <ComparisonAnswer currentQuestion={currentQuestion} />
                    </>
                )
            }


            {/* footer section here */}

            <div className="question-footer">

                <button
                    className="secondary-btn"
                    onClick={prevQuestion}
                >
                    <ArrowLeft size={18} />
                    Previous
                </button>

                {mode === "attempt" && (
                    <>
                        <button
                            className="secondary-btn"
                            onClick={onClear}
                        >
                            <Trash2 size={18} />
                            Clear Answer
                        </button>

                        <button
                            className="review-btn"
                            onClick={onReview}
                        >
                            <Bookmark size={18} />
                            Mark for Review
                        </button>

                    </>
                )}

                <button
                    className="primary-btn"
                    onClick={nextQuestion}
                >
                    Save & Next
                    <ArrowRight size={18} />
                </button>

            </div>





        </div >
    );
};

export default QuestionCard;