import {
  ArrowRight,
  BookOpen,
  Code2,
  GraduationCap,
  Flame,
  Trophy,
  Zap,
} from "lucide-react";

import "../../styles/Dashboard/Hero.scss";

import { useNavigate } from "react-router";

const HeroSection = ({ profile, gamification }) => {
  const navigate = useNavigate();

  // Safe values
  const level = Number(gamification?.level || 1);
  const currentXP = Number(gamification?.xp || 0);
  const nextLevelXP = Number(
    gamification?.nextLevelXP || 0
  );
  const xpToNextLevel = Number(
    gamification?.xpToNextLevel || 0
  );
  const levelProgress = Number(
    gamification?.levelProgress || 0
  );
  const currentStreak = Number(
    gamification?.currentStreak || 0
  );

  const todayXP = Number(
    gamification?.xp || 0
  );

  const buttons = [
    {
      id: 1,
      title: "Continue Learning",
      icon: <BookOpen size={18} />,
      color: "primary",
      to: "/course",
    },
    {
      id: 2,
      title: "Solve Problems",
      icon: <Code2 size={18} />,
      color: "secondary",
      to: "/practice",
    },
    {
      id: 3,
      title: "Browse Courses",
      icon: <GraduationCap size={18} />,
      color: "outline",
      to: "/course",
    },
  ];

  return (
    <section className="hero-section">

      {/* ==========================
          LEFT SECTION
      ========================== */}

      <div className="hero-left">

        <span className="hero-greeting">
          👋 Good Morning
        </span>

        <h1>
          {profile?.name || "User"}
        </h1>

        <p>
          Welcome back! Stay consistent and keep
          building your coding skills every day.
        </p>

        {/* ==========================
            XP PROGRESS
        ========================== */}

        <div className="xp-wrapper">

          <div className="xp-header">

            <h3>
              Level {level}
            </h3>

            <span>
              {currentXP.toLocaleString()} /{" "}
              {nextLevelXP.toLocaleString()} XP
            </span>

          </div>

          <div className="dashboard-progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${levelProgress}%`,
              }}
            />

          </div>

          <small>
            {xpToNextLevel.toLocaleString()} XP to
            reach Level {level + 1}
          </small>

        </div>

        {/* ==========================
            ACTION BUTTONS
        ========================== */}

        <div className="hero-buttons">

          {buttons.map((button) => (

            <button
              key={button.id}
              className={button.color}
              onClick={() => navigate(button.to)}
            >

              {button.icon}

              {button.title}

              <ArrowRight size={18} />

            </button>

          ))}

        </div>

      </div>

      {/* ==========================
          RIGHT SECTION
      ========================== */}

      <div className="dashboard-hero-right">

        {/* Current Streak */}

        <div className="floating-card streak-card">

          <div className="floating-icon">
            <Flame size={30} />
          </div>

          <div>
            <h3>
              {currentStreak} Days
            </h3>

            <p>
              Current Streak
            </p>
          </div>

        </div>

        {/* XP Earned Today */}

        <div className="floating-card xp-card">

          <div className="floating-icon">
            <Zap size={30} />
          </div>

          <div>
            <h3>
              +{todayXP.toLocaleString()} XP
            </h3>

            <p>
              Earned Today
            </p>
          </div>

        </div>

        {/* Current Level */}

        <div className="floating-card level-card">

          <div className="floating-icon">
            <Trophy size={30} />
          </div>

          <div>
            <h3>
              Level {level}
            </h3>

            <p>
              Current Level
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;