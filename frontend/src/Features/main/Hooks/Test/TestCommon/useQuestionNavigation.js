import { useState } from "react";

export const useQuestionNavigation = (
  totalQuestions,
  initialIndex = 0
) => {

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(() => {

      // Invalid index se protect
      if (totalQuestions <= 0) return 0;

      return Math.min(
        Math.max(initialIndex, 0),
        totalQuestions - 1
      );
    });


  // ==============================
  // Next Question
  // ==============================

  const nextQuestion = () => {

    setCurrentQuestionIndex((prev) => {

      if (prev >= totalQuestions - 1) {
        return prev;
      }

      return prev + 1;

    });

  };


  // ==============================
  // Previous Question
  // ==============================

  const prevQuestion = () => {

    setCurrentQuestionIndex((prev) => {

      if (prev <= 0) {
        return prev;
      }

      return prev - 1;

    });

  };


  // ==============================
  // Go To Specific Question
  // index = 0 based
  // ==============================

  const goToQuestion = (index) => {

    if (index < 0 || index >= totalQuestions) {
      return;
    }

    setCurrentQuestionIndex(index);

  };


  return {
    currentQuestionIndex,
    nextQuestion,
    prevQuestion,
    goToQuestion,
  };

};