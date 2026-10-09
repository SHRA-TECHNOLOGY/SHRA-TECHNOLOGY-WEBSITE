import React from "react";
import {
  FileText,
  Trophy,
  Clock3,
  Users,
} from "lucide-react";

import "../../../styles/Test/TestResult/HeroSection.scss";
import HeaderSection from "./Header";



const ResultHero = ({ result }) => {

  // =====================================================
  // Test information comes from DB
  // =====================================================

  const test = result?.test;

  // =====================================================
  // Difficulty color
  // Backend mein difficultyColor nahi hai,
  // isliye frontend par difficulty ke according color
  // =====================================================

  const difficultyColors = {
    Easy: "#22C55E",
    Medium: "#F59E0B",
    Hard: "#EF4444",
  };

  const difficultyColor =
    difficultyColors[test?.difficulty] || "#6366F1";


  // =====================================================
  // Format Time
  //
  // result.timeTaken seconds mein hai
  // Example:
  // 125 seconds -> 00:02:05
  // =====================================================

  const formatTime = (timeTaken = 0) => {

    const totalSeconds = Number(timeTaken) || 0;

    const hours = Math.floor(
      totalSeconds / 3600
    );

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds =
      totalSeconds % 60;

    return (
      `${String(hours).padStart(2, "0")}:` +
      `${String(minutes).padStart(2, "0")}:` +
      `${String(seconds).padStart(2, "0")}`
    );
  };


  // =====================================================
  // Passing Percentage
  //
  // Agar backend result mein passMarks / passingPercentage
  // future mein bhejta hai to use kar lenge.
  //
  // Otherwise default 50%
  // =====================================================

  const passingPercentage =
    result?.passingPercentage ??
    test?.passingPercentage ??
    50;


  // =====================================================
  // Passing Marks
  //
  // Example:
  // Total Marks = 20
  // Passing = 50%
  //
  // 20 * 50 / 100 = 10
  // =====================================================

  const passMarks =
    result?.passMarks ??
    Math.ceil(
      (Number(test?.totalMarks || result?.totalMarks || 0) *
        passingPercentage) /
        100
    );


  // =====================================================
  // Rank Information
  // =====================================================

  const rank = result?.rank ?? "-";

  const totalParticipants =
    result?.totalParticipants ?? "-";

  const topPercentage =
    result?.topPercentage ?? null;


  // =====================================================
  // Safety check
  // =====================================================

  if (!result || !test) {
    return (
      <div className="result-error">
        Result data not available
      </div>
    );
  }


  return (
    <div className="Hero-Section">

      {/* ================================================
          Result Header
      ================================================ */}

      <HeaderSection />


      <div className="result-hero-wrapper">

        <div className="result-hero">


          {/* ================================================
              LEFT SECTION
              Score Circle
          ================================================ */}

          <div className="hero-left">

            <div className="score-circle">

              <svg viewBox="0 0 120 120">

                {/* Background circle */}

                <circle
                  className="bg"
                  cx="60"
                  cy="60"
                  r="52"
                />


                {/* Percentage progress circle */}

                <circle
                  className="progress"
                  cx="60"
                  cy="60"
                  r="52"
                  style={{
                    strokeDashoffset:
                      327 -
                      (327 *
                        Number(result.percentage || 0)) /
                        100,
                  }}
                />

              </svg>


              {/* Score text */}

              <div className="score-content">

                <h2>
                  {result.percentage || 0}%
                </h2>

                <p>
                  Score
                </p>

              </div>

            </div>

          </div>


          {/* ================================================
              CENTER SECTION
              Test information + statistics
          ================================================ */}

          <div className="hero-center">

            {/* Test title + difficulty */}

            <h2>

              {test.title}

              <span
                className="difficulty-badge"
                style={{
                  color: difficultyColor,
                  background:
                    `${difficultyColor}20`,
                }}
              >
                {test.difficulty}
              </span>

            </h2>


            {/* Test description */}

            <p>
              {test.description}
            </p>


            {/* ============================================
                Statistics
            ============================================ */}

            <div className="stats">


              {/* Total Questions */}

              <div className="stat-box">

                <FileText size={18} />

                <div>

                  <span>
                    Total Questions
                  </span>

                  <h3>
                    {result.answers?.length ??
                      test.totalQuestions ??
                      0}
                  </h3>

                </div>

              </div>


              {/* Total Marks */}

              <div className="stat-box">

                <Trophy size={18} />

                <div>

                  <span>
                    Total Marks
                  </span>

                  <h3>
                    {result.totalMarks ??
                      test.totalMarks ??
                      0}
                  </h3>

                </div>

              </div>


              {/* Time Taken */}

              <div className="stat-box">

                <Clock3 size={18} />

                <div>

                  <span>
                    Time Taken
                  </span>

                  <h3>
                    {formatTime(
                      result.timeTaken
                    )}
                  </h3>

                </div>

              </div>


              {/* Rank */}

              <div className="stat-box">

                <Users size={18} />

                <div>

                  <span>
                    Your Rank
                  </span>

                  <h3>
                    #{rank}
                    {totalParticipants !== "-" &&
                      ` / ${totalParticipants}`}
                  </h3>


                  {topPercentage !== null && (
                    <small>
                      Top {topPercentage}%
                    </small>
                  )}

                </div>

              </div>

            </div>

          </div>


          {/* ================================================
              RIGHT SECTION
              Trophy + Pass/Fail
          ================================================ */}

          <div className="hero-right">

            <img
              src="/images/trophy.png"
              alt="Trophy"
            />


            {/* Pass / Fail */}

            <div
              className={`result-status ${
                result.passed
                  ? "pass"
                  : "fail"
              }`}
            >
              {result.passed
                ? "Passed"
                : "Failed"}
            </div>


            {/* Passing marks */}

            <p>
              Cut-off Marks :{" "}
              {passMarks}{" "}
              ({passingPercentage}%)
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ResultHero;