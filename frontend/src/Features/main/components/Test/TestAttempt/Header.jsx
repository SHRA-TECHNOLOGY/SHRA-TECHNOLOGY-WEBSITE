import React from 'react'
import { Timer, Send } from 'lucide-react'
import '../../../styles/Test/TestAttempt/HeaderSection.scss'

const HeaderSection = ({ currentTest, numberOfQuestion, totalAttempt, leftTime, handleSubmit }) => {

    const progress = numberOfQuestion > 0 ? (totalAttempt / numberOfQuestion) * 100 : 0;

    // Difficulty color
    const difficultyColor =
        currentTest?.difficulty === "Easy"
            ? "#22C55E"
            : currentTest?.difficulty === "Medium"
                ? "#F59E0B"
                : "#EF4444" || "#22C55E";

    return (
        <div className='attempt-header'>

            <div className="header-left">
                <div className="title-row">
                    <h2>{currentTest.title}</h2>

                    <span
                        className="difficulty-badge"
                        style={{
                            background: `${difficultyColor}20`,
                            color: difficultyColor,
                        }}
                    >
                        {currentTest.difficulty}
                    </span>
                </div>

                <p>
                    {numberOfQuestion} Questions • {currentTest.totalMarks} Marks
                </p>
            </div>

            <div className="progress-wrapper">

                <div className="progress-header">

                    <h3>
                        Progress
                    </h3>

                    <span>
                        {totalAttempt} / {numberOfQuestion}
                    </span>

                </div>

                <div className="progress-bar">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${progress}%`,
                        }}
                    ></div>

                </div>
            </div>

            <div className="timer-section">
                <div className="timer-left">
                    <h3>Time Left</h3>
                    <p><Timer /> {leftTime}</p>
                </div>

                <button onClick={() => handleSubmit()}>
                    <Send />
                    Submit Test
                </button>
            </div>
        </div>
    )
}

export default HeaderSection
