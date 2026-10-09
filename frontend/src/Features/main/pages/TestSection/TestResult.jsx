import React from "react";
import { useParams, useNavigate } from "react-router";

import CommonNavbar from "../../components/Navbar/CommonNavbar";
import ResultHero from "../../components/Test/ResultSection/HeroSection";
import ResultStats from "../../components/Test/ResultSection/Stats";
import GraphSection from "../../components/Test/ResultSection/GraphSection";
import ResultActions from "../../components/Test/ResultSection/FooterSection";

import {
  useTestResult,
  useAllTestOfOneCourse,
} from "../../Hooks/Test/useTest.jsx";


const TestResult = () => {

  const navigate = useNavigate();

  const {
    courseId,
    testSlug,
    resultId,
  } = useParams();


  // =====================================================
  // Current Result
  // =====================================================

  const {
    data: resultData,
    isLoading: resultLoading,
    isError: resultError,
  } = useTestResult(resultId);

  console.log(resultData)


  // =====================================================
  // Course ke saare tests
  // Next test find karne ke liye
  // =====================================================

  const {
    data: courseTestsData,
    isLoading: testsLoading,
    isError: testsError,
  } = useAllTestOfOneCourse(courseId);


  // =====================================================
  // Loading
  // =====================================================

  if (resultLoading || testsLoading) {
    return (
      <div className="test-loading">
        Loading result...
      </div>
    );
  }


  // =====================================================
  // Error
  // =====================================================

  if (
    resultError ||
    testsError ||
    !resultData?.result
  ) {
    return (
      <div className="test-error">

        <h2>
          Result Not Found
        </h2>

        <button
          onClick={() => navigate("/tests")}
        >
          Go To Tests
        </button>

      </div>
    );
  }


  // =====================================================
  // Current Result
  // =====================================================

  const result = resultData.result;

  const currentTest = result.test;

  const courseTests =
    courseTestsData?.courseTest || [];

  // --------------------------------------------------
  // Sort tests in proper sequence
  // --------------------------------------------------

  const sortedTests = [...courseTests].sort((a, b) => {
    const orderA = Number(a.order || 0);
    const orderB = Number(b.order || 0);

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    // Same order ho to createdAt use hoga
    return (
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
    );
  });

  // --------------------------------------------------
  // Current test find
  // --------------------------------------------------

  const currentIndex = sortedTests.findIndex(
    (test) =>
      String(test._id) === String(currentTest?._id)
  );

  // --------------------------------------------------
  // Next test
  // --------------------------------------------------

  const nextTest =
    currentIndex >= 0 &&
      currentIndex < sortedTests.length - 1
      ? sortedTests[currentIndex + 1]
      : null;

  // --------------------------------------------------
  // Passing percentage
  // --------------------------------------------------

  const requiredPercentage =
    Number(currentTest?.passingPercentage) || 50;

  // --------------------------------------------------
  // Start next test
  // --------------------------------------------------

  const handleStartNextTest = () => {
    if (!nextTest) return;

    navigate(
      `/tests/${courseId}/${nextTest.slug}/attempt`
    );
  };


  // =====================================================
  // DEBUG
  // =====================================================


  console.log("Required Percentage:", requiredPercentage);
  console.log("Next Test:", nextTest);



  // =====================================================
  // Retest
  // =====================================================

  const onRetest = () => {

    navigate(
      `/tests/${courseId}/${testSlug}/attempt`
    );

  };


  // =====================================================
  // Review
  // =====================================================

  const onReview = () => {

    navigate(
      `/tests/${courseId}/${testSlug}/${resultId}/review`
    );

  };


  return (
    <div className="test-container">

      <CommonNavbar
        title="Result"
        color="dark-white"
      />


      <div className="test-main-content">

        {/* Result Hero */}

        <ResultHero
          result={result}
        />


        {/* Result Stats */}

        <ResultStats
          result={result}
        />


        {/* Graph + Next Test */}

        <GraphSection
          result={result}

          nextTest={nextTest}

          requiredPercentage={
            requiredPercentage
          }

          onStartNextTest={
            handleStartNextTest
          }

          onBrowseTests={() =>
            navigate("/tests")
          }
        />


        {/* Footer */}

        <ResultActions
          onRetest={onRetest}
          onReview={onReview}
        />

      </div>

    </div>
  );
};


export default TestResult;