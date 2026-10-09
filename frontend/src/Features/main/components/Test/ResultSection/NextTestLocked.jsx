import React from "react";
import {
  LockKeyhole,
  Trophy,
  CircleCheckBig,
  ArrowRight,
} from "lucide-react";
import "../../../styles/Test/TestResult/NextTestLocked.scss";

const UnlockNextLevelCard = ({
  currentScore = 72,
  requiredScore = 70,
  nextTest,
  onStart,
}) => {
  const unlocked = currentScore >= requiredScore;

  return (
    <div className="unlock-card">

      {/* Header */}

      <div className="unlock-header">

        <div className="icon-box">
          <LockKeyhole size={28} />
        </div>

        <div>

          <h2>Unlock Next Level</h2>

          <p>
            Complete the requirement to continue your learning journey.
          </p>

        </div>

      </div>

      {/* Next Test */}

      <div className="next-test">

        <h3>{nextTest.title}</h3>

        <span
          className="difficulty"
          style={{
            color: nextTest.difficultyColor,
            background: `${nextTest.difficultyColor}18`,
          }}
        >
          {nextTest.difficulty}
        </span>

      </div>

      {/* Requirement */}

      <div className="requirement">

        <div className="title">

          <Trophy size={18} />

          <span>Requirement</span>

        </div>

        <p>
          Score at least <b>{requiredScore}%</b> in{" "}
          <b>{nextTest.previousTest}</b>.
        </p>

      </div>

      {/* Score */}

      <div className={`score-box ${unlocked ? "success" : "danger"}`}>

        <div className="left">

          <span>Your Score</span>

          <h2>{currentScore}%</h2>

        </div>

        <div className="right">

          {unlocked ? (
            <>
              <CircleCheckBig size={22} />
              <span>Unlocked</span>
            </>
          ) : (
            <>
              <LockKeyhole size={22} />
              <span>Locked</span>
            </>
          )}

        </div>

      </div>

      {/* Button */}

      <button
        className={`start-btn ${!unlocked ? "disabled" : ""}`}
        disabled={!unlocked}
        onClick={onStart}
      >
        Start Next Test

        <ArrowRight size={18} />

      </button>

    </div>
  );
};

export default UnlockNextLevelCard;