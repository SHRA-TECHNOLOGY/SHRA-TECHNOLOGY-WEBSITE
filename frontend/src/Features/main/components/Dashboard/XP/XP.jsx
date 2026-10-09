import React from "react";
import "../../../styles/Dashboard/XP.scss";
import { IoFlash } from "react-icons/io5";

const XP = ({ gamification }) => {
  const level = Number(gamification?.level || 1);

  const currentXP = Number(
    gamification?.xp || 0
  );

  const nextLevelXP = Number(
    gamification?.nextLevelXP || 0
  );

  const xpToNextLevel = Number(
    gamification?.xpToNextLevel || 0
  );

  const currentStreak = Number(
    gamification?.currentStreak || 0
  );

  const progress = Number(
    gamification?.levelProgress || 0
  );

  const nextLevel = level + 1;

  return (
    <div className="XP-container">

      {/* =========================
          XP / LEVEL SECTION
      ========================= */}

      <div className="hero-left">

        <div className="logo-section">

          <span className="xp-icon">
            <IoFlash />
          </span>

          <h3>
            Level {level}
          </h3>

        </div>

        <div className="xp">

          <p>
            {currentXP.toLocaleString()} /{" "}
            {nextLevelXP.toLocaleString()} XP
          </p>

        </div>

        {/* Progress */}

        <div className="progress-xp">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="sms-to-nextLevel">

          {xpToNextLevel.toLocaleString()} XP to
          Level {nextLevel}

        </p>

      </div>

      {/* =========================
          STREAK SECTION
      ========================= */}

      <div className="streak">

        <span className="streak-icon">
          🔥
        </span>

        <div>

          <h3>
            {currentStreak} Day Streak
          </h3>

          <span>
            Keep learning every day
          </span>

        </div>

      </div>

    </div>
  );
};

export default XP;