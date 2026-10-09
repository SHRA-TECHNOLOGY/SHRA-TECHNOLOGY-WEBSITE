import React from "react";
import {
  CircleCheck,
  CircleX,
  CircleMinus,
  Target,
  Star,
} from "lucide-react";

import "../../../styles/Test/TestResult/Stats.scss";

const ResultStats = ({ result }) => {

  // =====================================================
  // Safe values
  // =====================================================

  const correct = Number(result?.correct) || 0;
  const wrong = Number(result?.wrong) || 0;
  const unattempted = Number(result?.unattempted) || 0;

  const totalQuestions =
    correct + wrong + unattempted;

  const score = Number(result?.score) || 0;
  const totalMarks = Number(result?.totalMarks) || 0;

  const accuracy = Number(result?.accuracy) || 0;
  const percentage = Number(result?.percentage) || 0;


  // =====================================================
  // Percentage helper
  //
  // Agar totalQuestions 0 hua to 0% return karega
  // NaN / Infinity nahi aayega
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
  // Accuracy attempts
  //
  // Accuracy = Correct / (Correct + Wrong) × 100
  // =====================================================

  const attemptedQuestions =
    correct + wrong;


  // =====================================================
  // Result statistics
  // =====================================================

  const stats = [
    {
      id: 1,

      title: "Correct",

      value: correct,

      subValue: `${getPercentage(correct)}%`,

      icon: CircleCheck,

      color: "#22C55E",

      bg: "rgba(34,197,94,.08)",
    },


    {
      id: 2,

      title: "Wrong",

      value: wrong,

      subValue: `${getPercentage(wrong)}%`,

      icon: CircleX,

      color: "#EF4444",

      bg: "rgba(239,68,68,.08)",
    },


    {
      id: 3,

      title: "Unattempted",

      value: unattempted,

      subValue: `${getPercentage(unattempted)}%`,

      icon: CircleMinus,

      color: "#EAB308",

      bg: "rgba(234,179,8,.08)",
    },


    {
      id: 4,

      title: "Accuracy",

      value: `${accuracy}%`,

      subValue: `(${correct}/${attemptedQuestions})`,

      icon: Target,

      color: "#3B82F6",

      bg: "rgba(59,130,246,.08)",
    },


    {
      id: 5,

      title: "Score",

      value: `${score} / ${totalMarks}`,

      subValue: `${percentage}%`,

      icon: Star,

      color: "#A855F7",

      bg: "rgba(168,85,247,.08)",
    },
  ];


  return (
    <div className="result-stats">

      {/* =================================================
          Render all statistics
      ================================================= */}

      {stats.map((item) => {

        const Icon = item.icon;

        return (
          <div
            className="stat-card"
            key={item.id}
            style={{
              borderColor: `${item.color}80`,
              background: item.bg,
            }}
          >

            {/* ===========================================
                Card Header
            =========================================== */}

            <div className="card-header">

              <Icon
                size={28}
                color={item.color}
              />

              <h4>
                {item.title}
              </h4>

            </div>


            {/* ===========================================
                Main Value
            =========================================== */}

            <h2>
              {item.value}
            </h2>


            {/* ===========================================
                Secondary Value
            =========================================== */}

            <p>
              {item.subValue}
            </p>

          </div>
        );
      })}

    </div>
  );
};

export default ResultStats;