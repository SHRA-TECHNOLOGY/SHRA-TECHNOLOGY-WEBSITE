import React from "react";
import {
  Play,
} from "lucide-react";

import { useNavigate } from "react-router";

import '../../styles/MyCourse/CourseCard.scss'

const CourseCard = ({ data }) => {

  const navigate = useNavigate();

  // course data

  const course = data?.course || null;

  // progress

  const progress = data?.progress || 0;
  return (
    <article className="my-course-card">


      <div className="course-image">
        <img src={course?.thumbnail} alt={course?.title || "Course Thumbnail"} />
      </div>


      {/* =========================
          COURSE INFORMATION
      ========================== */}
      <div className="course-content">

        <h3 className="course-title">
          {course?.title || "Untitled Course"}
        </h3>

        <p>
          {course?.description || "No description available."}
        </p>


        {/* Progress Bar */}
        <div className="myCourse-progress-wrapper">

          <div className="progress-track">

            <div
              className="progress-value"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>


        {/* Progress Percentage */}
        <p className="progress-text">
          {progress}% Complete
        </p>


        {/* Continue Button */}
        <button className="continue-btn" onClick={() => navigate(`/course/${course._id}`)}>

          <Play
            size={15}
            fill="currentColor"
          />

          Continue

        </button>

      </div>

    </article>
  );
};

export default CourseCard;