import React, { useState } from "react";
import { useParams } from "react-router";
import CourseCard from "../../components/MyCourse/CourseCard";
import RecommendedSection from "../../components/MyCourse/RecommendedSection";

import CommonNavbar from "../../components/Navbar/CommonNavbar";
import CourseSection from "../../components/MyCourse/CourseSection";
import PageTitle from "../../components/MyCourse/PageTitle";

import EmptySection from '../../components/MyCourse/EmptySection';

import { useCourseByUser } from "../../Hooks/Course/useCourse";

import "./MyCourses.scss";

const MyCourses = () => {

    const { userId } = useParams()

    // current tab status state
    const [currentTab, setCurrentTab] = useState("AllCourses");

    const { data, isLoading, isError, error } = useCourseByUser({ userId })

    const allCourses = data?.data || [];

    const inProgressCourses = allCourses.filter(item => item.enrollmentStatus === "Active");
    const completedCourses = allCourses.filter(item => item.enrollmentStatus === "Completed");
    const wishlistCourses = allCourses.filter(item => item.enrollmentStatus === "Wishlist");

    const currentShowCourses =
        currentTab === "AllCourses"
            ? allCourses
            : currentTab === "InProgressCourses"
                ? inProgressCourses
                : currentTab === "CompletedCourses"
                    ? completedCourses
                    : currentTab === "WishlistCourses"
                        ? wishlistCourses
                        : [];

    return (
        <main className="my-courses">

            {/* navbar code here */}
            <CommonNavbar title={""} />


            {/* Page title section here */}
            <PageTitle />

            {/* =========================
                 COURSE TABS
            ========================== */}
            <div className="course-tabs">

                <button className={currentTab === "AllCourses" ? "active" : ""} onClick={() => setCurrentTab("AllCourses")}>
                    All Courses
                </button>

                <button className={currentTab === "InProgressCourses" ? "active" : ""} onClick={() => setCurrentTab("InProgressCourses")}>
                    In Progress
                </button>

                <button className={currentTab === "CompletedCourses" ? "active" : ""} onClick={() => setCurrentTab("CompletedCourses")}>
                    Completed
                </button>

                <button className={currentTab === "WishlistCourses" ? "active" : ""} onClick={() => setCurrentTab("WishlistCourses")}>
                    Wishlist
                </button>

            </div>


            {/* =========================
                IN PROGRESS SECTION
            ========================== */}
            <section className="course-section">

                {/* <EmptySection /> */}

                <div className="section-heading">

                    <h2>In Progress</h2>

                    <button>
                        View All
                    </button>

                </div>


                {/* Course Cards */}
                <div className="course-grid">

                    {currentShowCourses.length > 0 ? (
                        <CourseSection
                            currentShowCourses={currentShowCourses}
                        />
                    ) : (
                        <EmptySection />
                    )}

                </div>

            </section>

            {/* RecommendedSection section  */}

            <RecommendedSection />

        </main>
    );
};

export default MyCourses;