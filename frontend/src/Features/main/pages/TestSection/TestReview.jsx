import React from "react";
import { useParams, useNavigate } from "react-router";

import CommonNavbar from "../../components/Navbar/CommonNavbar";
import ReviewContent from "../../components/Test/ReviewTest/ReviewContent";

import { useReviewTest } from "../../Hooks/Test/useTest";

const TestReview = () => {
  const navigate = useNavigate();

  const {
    courseId,
    testSlug,
    resultId,
  } = useParams();

  // =====================================================
  // Fetch review from backend
  // =====================================================

  const {
    data,
    isLoading,
    isError,
  } = useReviewTest({resultId});

  // =====================================================
  // Loading
  // =====================================================

  if (isLoading) {
    return (
      <div className="test-loading">
        Loading review...
      </div>
    );
  }

  // =====================================================
  // Error
  // =====================================================

  if (isError || !data?.review) {
    return (
      <div className="test-error">
        <h2>Review Not Found</h2>

        <button onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  // =====================================================
  // Backend review data
  // =====================================================

  const review = data.review;

  return (
    <div className="test-container">

      <CommonNavbar
        title={`Test > ${review.test?.title || testSlug}`}
        title2="Review Answers"
        color="dark-white"
      />

      <div className="test-main-content">

        <ReviewContent
          review={review}
          courseId={courseId}
          testSlug={testSlug}
          resultId={resultId}
        />

      </div>

    </div>
  );
};

export default TestReview;