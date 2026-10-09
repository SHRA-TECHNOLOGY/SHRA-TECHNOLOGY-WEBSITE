import "../../styles/Dashboard/Stats.scss";

import React from "react";

import {
  FaBookOpen,
  FaCheck,
  FaFire,
  FaTrophy,
  FaArrowUp,
} from "react-icons/fa";

const DashboardStats = ({ progress }) => {

  const statsData = [
    {
      id: 1,
      title: "Courses Enrolled",
      value: progress?.courseEnroll ?? 0,
      change:
        progress?.courseEnroll > 0
          ? "Courses you're learning"
          : "Enroll in your first course",
      icon: FaBookOpen,
      color: "#7C5CFC",
    },

    {
      id: 2,
      title: "Lessons Completed",
      value: progress?.lessonsCompleted ?? 0,
      change:
        progress?.lessonsCompleted > 0
          ? "Lessons completed"
          : "Start your first lesson",
      icon: FaCheck,
      color: "#22C55E",
    },

    {
      id: 3,
      title: "Problems Solved",
      value: progress?.problemSolved ?? 0,
      change:
        progress?.problemSolved > 0
          ? "Problems solved"
          : "Solve your first problem",
      icon: FaFire,
      color: "#F59E0B",
    },

    {
      id: 4,
      title: "XP Points",
      value: (progress?.xp ?? 0).toLocaleString(),
      change:
        progress?.xp > 0
          ? "XP earned"
          : "Earn your first XP",
      icon: FaTrophy,
      color: "#2196F3",
    },
  ];

  return (
    <div className="stats-section">

      {statsData.map((item) => {
        const Icon = item.icon;

        return (
          <div
            className="stats-card"
            key={item.id}
          >

            <div
              className="icon-box"
              style={{
                background: item.color,
              }}
            >
              <Icon />
            </div>

            <div className="card-content">

              <span>{item.title}</span>

              <h2>{item.value}</h2>

              <p>
                <FaArrowUp />
                {item.change}
              </p>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default DashboardStats;