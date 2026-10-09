import React, { useMemo } from "react";
import { useNavigate } from "react-router";

import HeaderSection from "./HeaderSection";

import "../../../styles/Test/TestReview/ReviewContent.scss";

import QuestionCard from "../TestAttempt/QuestionCard";
import RightSide from "../TestAttempt/RightSide";

import { useQuestionNavigation } from "../../../Hooks/Test/TestCommon/useQuestionNavigation";


const ReviewContent = ({
  review,
  courseId,
  testSlug,
  resultId,
}) => {

  const navigate = useNavigate();


  // =====================================================
  // Backend se aaye answers
  // =====================================================

  const answers = review?.answers || [];


  // =====================================================
  // Review Questions
  //
  // Backend ka answer object:
  //
  // {
  //   question: {...},
  //   selectedAnswer: 2,
  //   correctAnswer: 1,
  //   isCorrect: false,
  //   explanation: "..."
  // }
  //
  // Isko QuestionCard ke liye question object mein
  // convert kar rahe hain.
  // =====================================================

  const reviewQuestions = useMemo(() => {

    return answers
      .filter((item) => item.question)
      .map((item) => {

        return {
          // Original question data
          ...item.question,

          // User's selected option
          userAnswer: item.selectedAnswer,

          // Correct option
          correctAnswer: item.correctAnswer,

          // Correct / wrong
          isCorrect: item.isCorrect,

          // Explanation from backend
          explanation: item.explanation,

          // Review status
          status:
            item.selectedAnswer === null ||
            item.selectedAnswer === undefined
              ? "unattempted"
              : item.isCorrect
                ? "correct"
                : "wrong",
        };
      });

  }, [answers]);


  // =====================================================
  // Question Navigation
  // =====================================================

  const {
    currentQuestionIndex,
    nextQuestion,
    prevQuestion,
    goToQuestion,
  } = useQuestionNavigation(
    reviewQuestions.length,
    0
  );


  // =====================================================
  // Current Question
  // =====================================================

  const currentQuestion =
    reviewQuestions[currentQuestionIndex];


  // =====================================================
  // Back to Result
  // =====================================================

  const backToResult = () => {

    navigate(
      `/tests/${courseId}/${testSlug}/${resultId}/result`
    );

  };


  // =====================================================
  // No Questions
  // =====================================================

  if (!reviewQuestions.length) {
    return (
      <div className="test-error">

        <h2>
          No Review Questions Found
        </h2>

        <button onClick={backToResult}>
          Back to Result
        </button>

      </div>
    );
  }


  return (
    <>

      {/* =================================================
          Review Header
      ================================================= */}

      <HeaderSection
        test={testSlug}
      />


      {/* =================================================
          Attempt / Review Card
      ================================================= */}

      <div className="attempt-card">


        {/* =================================================
            Current Question
        ================================================= */}

        <QuestionCard

          mode="review"

          currentQuestion={
            currentQuestion
          }

          currentIndex={
            currentQuestionIndex
          }

          totalQuestions={
            reviewQuestions.length
          }

          nextQuestion={
            nextQuestion
          }

          prevQuestion={
            prevQuestion
          }

          // Review mode mein answer change nahi hoga
          // isliye onSelect/onClear/onReview nahi bhej rahe
        />


        {/* =================================================
            Question Navigator
        ================================================= */}

        <RightSide

          questions={
            reviewQuestions
          }

          currentIndex={
            currentQuestionIndex
          }

          goToQuestion={
            goToQuestion
          }

          mode="review"

          backToResult={
            backToResult
          }

        />

      </div>

    </>
  );
};


export default ReviewContent;