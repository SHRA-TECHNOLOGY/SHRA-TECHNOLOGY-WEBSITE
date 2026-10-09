import React from 'react'
import '../../../styles/Test/TestReview/Comparsion.scss'

const ComparisonAnswer = ({ currentQuestion }) => {

  const userAnswerIndex = currentQuestion.userAnswer;

  const correctAnswerIndex = currentQuestion.correctAnswer;

  const userAnswer = userAnswerIndex !== undefined
    ? currentQuestion.options[userAnswerIndex]
    : "Not Attempted";

  const correctAnswer = currentQuestion.options[correctAnswerIndex];
  const status = currentQuestion.status;

  const optionLabels = ["A", "B", "C", "D"];

  return (

    <>

      {/* comparison section here */}

      <div className="answer-comparison">

        <div className="answers">

          <div className={`answer-box ${status}`}>

            <h4>Your Answer</h4>

            <div className="answer-item">

              <span className="label">
                {userAnswerIndex !== undefined
                  ? optionLabels[userAnswerIndex]
                  : "-"
                }
              </span>

              <p>{userAnswer}</p>

            </div>

          </div>

          <div className="answer-box correct">

            <h4>Correct Answer</h4>

            <div className="answer-item">

              <span className="label">
                {optionLabels[correctAnswerIndex]}
              </span>

              <p>{correctAnswer}</p>

            </div>

          </div>

        </div>

        <div className="status">

          Status :

          <span className={status}>
            {status}
          </span>

        </div>

      </div>

      {/* explanation section here */}

      <div className="explanation-section">
        <h3>Explanation :</h3>
        <p>{currentQuestion.explanation}</p>
      </div>

    </>
  )
}

export default ComparisonAnswer
