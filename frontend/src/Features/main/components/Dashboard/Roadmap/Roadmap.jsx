import React from "react";
import {
  FaCheckCircle,
  FaLock,
  FaCircle,
  FaChevronRight,
} from "react-icons/fa";
import "../../../styles/Dashboard/Roadmap.scss";



const LearningRoadmap = ({dashboardData}) => {
  return (
    <section className="learning-roadmap">

      <div className="roadmap-header">

        <h2>Learning Roadmap</h2>

        <button>
          Change Roadmap
          <FaChevronRight />
        </button>

      </div>

      <div className="roadmap-list">

        {dashboardData.roadmap.map((item) => (
          <div
            key={item.id}
            className={`roadmap-item ${item.status}`}
          >

            <div className="timeline">

              {item.status === "completed" && (
                <FaCheckCircle className="completed" />
              )}

              {item.status === "current" && (
                <FaCircle className="current" />
              )}

              {item.status === "locked" && (
                <FaLock className="locked" />
              )}

            </div>

            <div className="roadmap-content">

              <h3>{item.title}</h3>

              <span>
                {item.progress}% Completed
              </span>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default LearningRoadmap;