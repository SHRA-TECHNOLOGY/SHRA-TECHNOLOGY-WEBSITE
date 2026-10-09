import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Users, Star, Clock4 } from "lucide-react";
import {
    useAllCourses,
} from "../../Hooks/Course/useCourse";

const CourseCard = () => {

    const navigate = useNavigate();

    // ==========================================
    // FETCH COURSES
    // ==========================================

    const {
        data,
        isLoading,
        isError,
        error,
    } = useAllCourses();


    const courses = data?.courses || [];


    // ==========================================
    // LOADING
    // ==========================================

    if (isLoading) {
        return <p>Loading courses...</p>;
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (isError) {
        return (
            <p>
                {error?.response?.data?.message ||
                    "Failed to load courses"}
            </p>
        );
    }


    // ==========================================
    // UI
    // ==========================================

    return (
        <>
            {courses.map((course) => {

                // =================================
                // COURSE PRICE
                // =================================

                const price =
                    course?.pricing?.type === "Paid"
                        ? `₹${course?.pricing?.price}`
                        : "Free";


                return (

                    <div
                        className="popular-card"
                        key={course._id}
                    >

                        <div className="course-image">

                            <img
                                src={course.thumbnail}
                                alt={course.title}
                            />

                        </div>


                        <div className="course-content">

                            <h3>
                                {course.seriesName}
                            </h3>

                            <p>
                                {course.description}
                            </p>


                            <div className="course-meta">

                                <span>
                                    <Users size={21} />
                                    {course.totalStudents}
                                </span>


                                <span>

                                    <Star
                                        size={21}
                                        color="#FFD700"
                                        fill="#FFD700"
                                    />

                                    {course.averageRating}

                                </span>


                                <span>

                                    <Clock4 size={21} />

                                    {course.duration} min

                                </span>

                            </div>


                            <div className="course-btn">

                                <p>
                                    {price}
                                </p>


                                <button
                                    onClick={() =>
                                        navigate(`/course/${course._id}`)
                                    }
                                >
                                    View Details
                                </button>

                            </div>

                        </div>

                    </div>

                );

            })}
        </>
    );
};

export default CourseCard;