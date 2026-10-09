import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import "../../../styles/Test/TestResult/GraphSection.scss";

import {
  CircleCheckBig,
  CircleX,
  CircleMinus,
  Lightbulb,
} from "lucide-react";

import NextTestCard from "./NextTest";
import UnlockNextLevelCard from "./NextTestLocked";
import EmptyState from "./NextTestEmpty";


const GraphSection = ({
  result,

  // Next test information
  nextTest,

  // Current test mein required percentage
  requiredPercentage,

  // Next test start karne ka function
  onStartNextTest,

  // Tests browse karne ka function
  onBrowseTests,
}) => {

  // =====================================================
  // RESULT VALUES
  // =====================================================

  const correct =
    Number(result?.correct) || 0;

  const wrong =
    Number(result?.wrong) || 0;

  const unattempted =
    Number(result?.unattempted) || 0;


  // =====================================================
  // TOTAL QUESTIONS
  // =====================================================

  const totalQuestions =
    correct +
    wrong +
    unattempted;


  // =====================================================
  // USER SCORE
  // =====================================================

  const userPercentage =
    Number(result?.percentage) || 0;


  // =====================================================
  // REQUIRED SCORE
  //
  // Example:
  // Current test passing percentage = 50%
  // User score = 70%
  //
  // 70 >= 50
  // Next test unlocked
  // =====================================================

  const requiredScore =
    Number(requiredPercentage) || 50;


  // =====================================================
  // NEXT TEST STATE
  //
  // No next test
  //      ↓
  // Empty State
  //
  // Next test exists + score enough
  //      ↓
  // Next Test Available
  //
  // Next test exists + score low
  //      ↓
  // Locked
  // =====================================================

  let nextTestState = "completed";

  if (nextTest) {

    if (userPercentage >= requiredScore) {
      nextTestState = "available";
    } else {
      nextTestState = "locked";
    }

  }


  // =====================================================
  // PERCENTAGE HELPER
  // =====================================================

  const getPercentage = (value) => {

    if (totalQuestions === 0) {
      return 0;
    }

    return Math.round(
      (value / totalQuestions) * 100
    );
  };


  // =====================================================
  // PIE CHART DATA
  // =====================================================

  const data = [
    {
      name: "Correct",
      value: correct,
      color: "#22C55E",
    },

    {
      name: "Wrong",
      value: wrong,
      color: "#EF4444",
    },

    {
      name: "Unattempted",
      value: unattempted,
      color: "#FBBF24",
    },
  ];


  // =====================================================
  // SECTIONAL PERFORMANCE DATA
  // =====================================================

  const performanceData = [
    {
      id: 1,

      title: "Correct",

      value: correct,

      percentage:
        `${getPercentage(correct)}%`,

      color: "#22C55E",

      icon: CircleCheckBig,
    },

    {
      id: 2,

      title: "Wrong",

      value: wrong,

      percentage:
        `${getPercentage(wrong)}%`,

      color: "#EF4444",

      icon: CircleX,
    },

    {
      id: 3,

      title: "Unattempted",

      value: unattempted,

      percentage:
        `${getPercentage(unattempted)}%`,

      color: "#FBBF24",

      icon: CircleMinus,
    },
  ];


  return (
    <div className="graph-section">


      {/* =================================================
          LEFT SIDE
          NEXT TEST SECTION
      ================================================= */}

      <div className="left">

        {/* =================================================
            CASE 1:
            Next Test Available
        ================================================= */}

        {nextTestState === "available" && (
          <NextTestCard
            nextTest={nextTest}
            onStart={onStartNextTest}
          />
        )}


        {/* =================================================
            CASE 2:
            Next Test Locked
        ================================================= */}

        {nextTestState === "locked" && (
          <UnlockNextLevelCard
            nextTest={nextTest}

            currentScore={
              userPercentage
            }

            requiredScore={
              requiredScore
            }

            onStart={
              onStartNextTest
            }
          />
        )}


        {/* =================================================
            CASE 3:
            No More Tests
        ================================================= */}

        {nextTestState === "completed" && (
          <EmptyState
            onBrowse={
              onBrowseTests
            }
          />
        )}

      </div>


      {/* =================================================
          RIGHT SIDE
          SECTIONAL PERFORMANCE
      ================================================= */}

      <div className="right">

        <h2>
          Sectional Performance
        </h2>


        <div className="sectional-container">


          {/* =================================================
              PIE CHART
          ================================================= */}

          <div className="chart-wrapper">

            <ResponsiveContainer
              width={250}
              height={250}
            >

              <PieChart>

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={2}
                >

                  {data.map(
                    (item, index) => (
                      <Cell
                        key={
                          `${item.name}-${index}`
                        }
                        fill={item.color}
                      />
                    )
                  )}

                </Pie>

              </PieChart>

            </ResponsiveContainer>


            {/* =============================================
                PIE CHART CENTER
            ============================================= */}

            <div className="chart-center">

              <h2>
                {totalQuestions}
              </h2>

              <p>
                Questions
              </p>

            </div>

          </div>


          {/* =================================================
              PERFORMANCE DETAILS
          ================================================= */}

          <div className="right-sectional">

            <div className="info-section">

              {performanceData.map(
                (item) => {

                  const Icon = item.icon;

                  return (
                    <div
                      className="single-list"
                      key={item.id}
                    >

                      <div className="left">

                        <Icon
                          size={20}
                          color={item.color}
                        />

                        <h3>
                          {item.title}
                        </h3>

                      </div>

                      <p>
                        {item.value} (
                        {item.percentage}
                        )
                      </p>

                    </div>
                  );
                }
              )}

            </div>


            {/* =================================================
                TIP CARD
            ================================================= */}

            <div className="tip-card">

              <Lightbulb
                size={32}
                color="#FBBF24"
              />

              <span>
                Keep practicing to improve your score
                even more!
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default GraphSection;