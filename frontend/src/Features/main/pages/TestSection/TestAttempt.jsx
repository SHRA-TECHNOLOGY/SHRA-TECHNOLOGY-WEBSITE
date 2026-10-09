import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import HeaderSection from "../../components/Test/TestAttempt/Header";
import QuestionCard from "../../components/Test/TestAttempt/QuestionCard";
import RightSide from "../../components/Test/TestAttempt/RightSide";
import CommonNavbar from "../../components/Navbar/CommonNavbar";

import useTimer from "../../Hooks/useTimer";

import {
  useTestQuestions,
  useTestInstruction,
  useSubmitTest,
} from "../../Hooks/Test/useTest.jsx";

import { useQuestionNavigation } from "../../Hooks/Test/TestCommon/useQuestionNavigation.js";

import "../../styles/Test/TestAttempt/Home.scss";


const TestAttempt = () => {

  const navigate = useNavigate();

  const { courseId, testSlug } = useParams();


  // ==========================================
  // API
  // ==========================================

  const {
    data: questionData,
    isLoading: questionsLoading,
    isError: questionsError,
  } = useTestQuestions({ courseId, slug: testSlug });


  const {
    data: instructionData,
    isLoading: instructionLoading,
    isError: instructionError,
  } = useTestInstruction({ courseId, slug: testSlug });


  const {
    mutate: submitTestMutation,
    isPending: isSubmitting,
  } = useSubmitTest();

  console.log(questionData)

  

  // ==========================================
  // Backend Data
  // ==========================================

  const questions =
    questionData?.testQuestions || [];

  const numberOfQuestion = questions.length || 0;


  const testInstruction =
    instructionData?.testInstruction;


  const testDetails =
    testInstruction?.testDetails;


  // ==========================================
  // LocalStorage Key
  // ==========================================

  const storageKey =
    `attempt-${courseId}-${testSlug}`;


  // ==========================================
  // Saved Attempt
  // ==========================================

  const getSavedAttempt = () => {

    try {

      const saved =
        localStorage.getItem(storageKey);

      return saved
        ? JSON.parse(saved)
        : null;

    } catch (error) {

      console.error(
        "Failed to read attempt:",
        error
      );

      return null;

    }

  };


  const savedAttempt = getSavedAttempt();


  // ==========================================
  // Attempt State
  // ==========================================

  const [attempt, setAttempt] = useState(() => {

    const saved = getSavedAttempt();

    if (saved) {

      return {

        answers:
          saved.answers || {},

        review:
          saved.review || [],

      };

    }


    return {

      answers: {},

      review: [],

    };

  });


  // ==========================================
  // Safe Test Values
  // ==========================================

  const duration = testDetails?.duration;


  // ==========================================
  // Question Navigation
  // ==========================================

  const {
    currentQuestionIndex,
    nextQuestion,
    prevQuestion,
    goToQuestion,
  } = useQuestionNavigation(

    questions.length,

    savedAttempt?.currentQuestion ?? 0

  );


  const currentQuestion =
    questions[currentQuestionIndex];


  // ==========================================
  // Attempted Count
  // ==========================================

  const attemptedCount =
    Object.keys(attempt.answers).length;



  const [showTimeUpPopup, setShowTimeUpPopup] = useState(false);

  const handleTimeUp = () => {
    setShowTimeUpPopup(true);
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = () => {

    if (!testDetails?._id) {

      console.error(
        "Test ID not found"
      );

      return;

    }


    const timeTaken =
      duration * 60 - remainingTime;


    // ======================================
    // Only send raw attempt data
    // Backend will calculate score
    // ======================================

    const payload = {

      testId: testDetails._id,

      answers: attempt.answers,

      timeTaken,

    };


    console.log(
      "Submitting Test:",
      payload
    );


    submitTestMutation(
      payload,

      {

        onSuccess: (data) => {

          console.log(
            "Test submitted:",
            data
          );


          // Remove temporary attempt
          localStorage.removeItem(
            storageKey
          );


          // Backend returns resultId
          navigate(
            `/tests/${courseId}/${testSlug}/${data.resultId}/result`
          );

        },


        onError: (error) => {

          console.error(
            "Test submission failed:",
            error
          );

        },

      }

    );

  };


  // ==========================================
  // Timer
  // ==========================================

  const initialRemainingTime =
    savedAttempt?.remainingTime > 0
      ? savedAttempt.remainingTime
      : duration * 60;

  // timer hook

  const {
    remainingTime,
    formattedTime,
  } = useTimer(
    duration,
    handleTimeUp,
    initialRemainingTime
  );




  // ==========================================
  // Select Answer
  // ==========================================

  const onSelect = (index) => {

    if (!currentQuestion) return;


    const questionId =
      currentQuestion._id.toString();


    setAttempt((prev) => ({

      ...prev,

      answers: {

        ...prev.answers,

        [questionId]: index,

      },


      // Answer select karne par
      // review remove kar diya
      review:
        prev.review.filter(
          (id) => id !== questionId
        ),

    }));

  };


  // ==========================================
  // Clear Answer
  // ==========================================

  const onClear = () => {

    if (!currentQuestion) return;


    const questionId =
      currentQuestion._id.toString();


    setAttempt((prev) => {

      const newAnswers = {
        ...prev.answers,
      };


      delete newAnswers[questionId];


      return {

        ...prev,

        answers: newAnswers,

      };

    });

  };


  // ==========================================
  // Mark / Unmark Review
  // ==========================================

  const onReview = () => {

    if (!currentQuestion) return;


    const questionId =
      currentQuestion._id.toString();


    setAttempt((prev) => {

      const isMarked =
        prev.review.includes(questionId);


      return {

        ...prev,

        review: isMarked

          ? prev.review.filter(
            (id) => id !== questionId
          )

          : [
            ...prev.review,
            questionId,
          ],

      };

    });

  };


  // ==========================================
  // Save Attempt to LocalStorage
  // ==========================================

  useEffect(() => {
    // API data abhi complete nahi hai
    if (!questions.length) return;

    // Duration abhi available nahi hai
    if (!duration || duration <= 0) return;

    // Timer initialize hone se pehle save mat karo
    if (remainingTime <= 0 && !showTimeUpPopup) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        currentQuestion: currentQuestionIndex,
        answers: attempt.answers,
        review: attempt.review,
        remainingTime,
      })
    );
  }, [
    storageKey,
    currentQuestionIndex,
    attempt.answers,
    attempt.review,
    remainingTime,
    questions.length,
    duration,
    showTimeUpPopup,
  ]);


  // ==========================================
  // Loading
  // ==========================================

  if (
    questionsLoading ||
    instructionLoading
  ) {

    return (
      <div className="test-loading">
        Loading test...
      </div>
    );

  }


  // ==========================================
  // Error
  // ==========================================

  if (
    questionsError ||
    instructionError
  ) {

    return (
      <div className="test-error">

        <h2>
          Failed to load test
        </h2>

        <button
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>

      </div>
    );

  }


  // ==========================================
  // Test Not Found
  // ==========================================

  if (
    !testDetails ||
    !questions.length ||
    !currentQuestion
  ) {

    return (
      <div className="test-error">

        <h2>
          Test Not Found
        </h2>

      </div>
    );

  }


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="attempt-page">

      <CommonNavbar />


      <div className="test-main-content">


        {/* =================================
            Header
        ================================= */}

        <HeaderSection

          currentTest={testDetails}

          numberOfQuestion={numberOfQuestion}

          leftTime={formattedTime}

          totalAttempt={attemptedCount}

          handleSubmit={handleSubmit}

        />


        {/* =================================
            Attempt Card
        ================================= */}

        <div className="attempt-card">


          {/* Question */}

          <QuestionCard

            currentQuestion={
              currentQuestion
            }

            currentIndex={
              currentQuestionIndex
            }

            totalQuestions={
              questions.length
            }

            nextQuestion={
              nextQuestion
            }

            prevQuestion={
              prevQuestion
            }

            onClear={
              onClear
            }

            onSelect={
              onSelect
            }

            onReview={
              onReview
            }

            selectedAnswer={
              attempt.answers[
              currentQuestion._id
              ]
            }

            mode="attempt"

          />


          {/* =================================
              Right Question Navigator
          ================================= */}

          <RightSide

            questions={
              questions
            }

            currentIndex={
              currentQuestionIndex
            }

            attempt={
              attempt
            }

            setAttempt={
              setAttempt
            }

            goToQuestion={
              goToQuestion
            }

            mode="attempt"

          />


        </div>


        {/* Optional submitting overlay */}

        {isSubmitting && (

          <div className="submit-loading">

            Submitting test...

          </div>

        )}

        {showTimeUpPopup && (
          <div className="timeup-overlay">
            <div className="timeup-popup">
              <h2>⏰ Time's Up!</h2>

              <p>
                Your test time has ended.
                Please submit your test.
              </p>

              <button onClick={handleSubmit}>
                Submit Test
              </button>
            </div>
          </div>
        )}

      </div>

    </div>

  );

};


export default TestAttempt;