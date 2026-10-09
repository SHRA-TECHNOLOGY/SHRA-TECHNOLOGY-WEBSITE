import React from "react";

const RecommendedCard = ({ course }) => {
  return (
    <article className="recommended-card">

      {/* =========================
          COURSE IMAGE
      ========================== */}
      <div
        className={`recommended-banner ${course.className}`}
      >

        <span>
          {course.className === "next" && "Next.js"}

          {course.className === "typescript" && "TS"}

          {course.className === "aws" && "aws"}
        </span>

      </div>


      {/* =========================
          COURSE DETAILS
      ========================== */}
      <div className="recommended-content">

        <h3>
          {course.title}
        </h3>


        {/* Lessons + Rating */}
        <div className="course-meta">

          <span>
            {course.lessons}
          </span>

          <span className="rating">
            ★ {course.rating}
          </span>

        </div>


        {/* Price + Button */}
        <div className="course-bottom">

          <strong>
            {course.price}
          </strong>

          <button>
            View Course
          </button>

        </div>

      </div>

    </article>
  );
};

export default RecommendedCard;