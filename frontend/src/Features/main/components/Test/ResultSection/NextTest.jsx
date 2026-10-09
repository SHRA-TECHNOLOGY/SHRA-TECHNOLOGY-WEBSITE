import React from "react";
import { ArrowRight, Clock3, BookOpen, Trophy, Layers3 } from "lucide-react";
import "../../../styles/Test/TestResult/NextTest.scss";

const NextTestCard = ({ nextTest, onStart }) => {
  return (
    <div className="next-test-card">

      {/* Header */}

      <div className="card-header">

        <div className="header-left">

          <div className="rocket">
            🚀
          </div>

          <div>
            <h2>Ready for the Next Challenge?</h2>
            <p>
              Continue your learning journey and unlock the next level.
            </p>
          </div>

        </div>

      </div>

      {/* Test Info */}

      <div className="test-info">

        <div className="title">

          <h3>{nextTest.title}</h3>

          <span
            className="difficulty"
            style={{
              color: nextTest.difficultyColor,
              background: `${nextTest.difficultyColor}20`
            }}
          >
            {nextTest.difficulty}
          </span>

        </div>

        <p>{nextTest.description}</p>

      </div>

      {/* Stats */}

      <div className="test-stats">

        <div className="stat">

          <BookOpen size={20} />

          <div>

            <span>Questions</span>

            <h4>{nextTest.questions}</h4>

          </div>

        </div>

        <div className="stat">

          <Clock3 size={20} />

          <div>

            <span>Duration</span>

            <h4>{nextTest.duration} min</h4>

          </div>

        </div>

        <div className="stat">

          <Trophy size={20} />

          <div>

            <span>Marks</span>

            <h4>{nextTest.totalMarks}</h4>

          </div>

        </div>

        <div className="stat">

          <Layers3 size={20} />

          <div>

            <span>Level</span>

            <h4>{nextTest.difficulty}</h4>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="card-footer">

        <button onClick={onStart}>

          Start Next Test

          <ArrowRight size={18} />

        </button>

      </div>

    </div>
  );
};

export default NextTestCard;