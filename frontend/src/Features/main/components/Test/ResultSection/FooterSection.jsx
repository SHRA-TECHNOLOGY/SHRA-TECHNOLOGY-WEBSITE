import React from "react";
import {
  RotateCcw,
  ArrowLeft,
  FileSearch,
} from "lucide-react";

import { useNavigate } from "react-router";

import "../../../styles/Test/TestResult/Footer.scss";

const ResultActions = ({
  onReview,
  onRetest,
}) => {

  const navigate = useNavigate();


  // =====================================================
  // Back to Tests
  // =====================================================

  const handleBackToTests = () => {
    navigate("/tests");
  };


  return (
    <div className="result-actions">


      {/* =================================================
          Review Answers
      ================================================= */}

      <button
        type="button"
        className="action-btn secondary"
        onClick={onReview}
      >
        <FileSearch size={22} />

        <span>
          Review Answers
        </span>
      </button>


      {/* =================================================
          Retest
      ================================================= */}

      <button
        type="button"
        className="action-btn secondary"
        onClick={onRetest}
      >
        <RotateCcw size={22} />

        <span>
          Retest
        </span>
      </button>


      {/* =================================================
          Back to Tests
      ================================================= */}

      <button
        type="button"
        className="action-btn secondary"
        onClick={handleBackToTests}
      >
        <ArrowLeft size={24} />

        <span>
          Back to Tests
        </span>
      </button>

    </div>
  );
};

export default ResultActions;