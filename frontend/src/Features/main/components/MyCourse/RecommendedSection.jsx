import React from 'react'

import RecommendedCard from './RecommendedCard';

import CourseCard from '../Course/CourseCard';

const RecommendedSection = () => {

    // Recommended courses
    const recommendedCourses = [
        {
            title: "Next.js - Full Stack",
            lessons: "12+ Lessons",
            rating: "4.8",
            price: "₹499",
            className: "next",
        },
        {
            title: "TypeScript - Complete Guide",
            lessons: "15+ Lessons",
            rating: "4.7",
            price: "₹399",
            className: "typescript",
        },
        {
            title: "AWS - Cloud Basics",
            lessons: "18+ Lessons",
            rating: "4.6",
            price: "₹599",
            className: "aws",
        },
    ];
  return (
    <>

    {/* =========================
                    RECOMMENDED SECTION
                ========================== */}
            <section className="course-section recommended-section">

                <div className="section-heading">

                    <h2>Recommended for you</h2>

                    <button>
                        View All
                    </button>

                </div>


                {/* Recommended Cards */}
                <div className="course-grid recommended-grid">

                    {/* {recommendedCourses.map((course, index) => (
                        <RecommendedCard
                            key={index}
                            course={course}
                        />
                    ))} */}

                    <CourseCard />

                </div>

            </section>
      
    </>
  )
}

export default RecommendedSection
