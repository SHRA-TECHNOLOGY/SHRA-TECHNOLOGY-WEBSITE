import React from "react";
import { GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import "../../../styles/Test/TestResult/NextTestEmpty.scss";

const EmptyState = ({ onBrowse }) => {
  return (
    <div className="empty-state">

      {/* Icon */}

      <div className="icon-wrapper">

        <div className="icon-circle">
          <GraduationCap size={42} />
        </div>

        <Sparkles
          className="sparkle sparkle-1"
          size={18}
        />

        <Sparkles
          className="sparkle sparkle-2"
          size={16}
        />

      </div>

      {/* Content */}

      <h2>🎉 Congratulations!</h2>

      <p>
        You've successfully completed every test in this module.
        Keep learning and challenge yourself with more exciting
        practice tests.
      </p>

      {/* Button */}

      <button onClick={onBrowse}>

        Browse More Tests

        <ArrowRight size={18} />

      </button>

    </div>
  );
};

export default EmptyState;