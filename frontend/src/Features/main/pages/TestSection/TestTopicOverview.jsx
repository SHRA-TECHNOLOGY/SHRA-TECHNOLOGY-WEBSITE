import { useState } from "react";
import CommonNavbar from "../../components/Navbar/CommonNavbar";
import { useParams } from "react-router";

import HeroSection from "../../components/Test/TestTopicOverview/HeroSection";
import HeaderSection from "../../components/Test/TestTopicOverview/HeaderSection";
import { createCourseCard, courseUI } from "../../../../Data/Test/TestHome";

import TestsTable from "../../components/Test/TestTopicOverview/ListSection";

import {
  useAllTests,
  useAllTestOfOneCourse,
} from "../../Hooks/Test/useTest";

import '../../styles/Test/TopicOverview/home.scss'

const TestTopicOverview = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  const { courseId, slug } = useParams();

  // ==========================================
  // COURSE TESTS
  // ==========================================

  const courseQuery = useAllTestOfOneCourse(courseId, {
    enabled: !!courseId,
  });

  // ==========================================
  // ALL TESTS
  // ==========================================

  const allTestsQuery = useAllTests({
    enabled: !courseId,
  });

  // ==========================================
  // SELECT ACTIVE QUERY
  // ==========================================

  const { data, isLoading, isError, error } = courseId
    ? courseQuery
    : allTestsQuery;

  // ==========================================
  // LOADING UI
  // ==========================================

  if (isLoading) {
    return (
      <div className="test-state-page">

        <div className="test-state-card">

          <div className="test-loading-spinner"></div>

          <h3>Loading Tests</h3>

          <p>
            Please wait while we fetch the tests for you.
          </p>

          <div className="test-loading-skeleton">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

      </div>
    );
  }


  // ==========================================
  // ERROR UI
  // ==========================================

  if (isError) {
    return (
      <div className="test-state-page">

        <div className="test-state-card test-error-card">

          <div className="test-error-icon">
            !
          </div>

          <h3>
            Unable to Load Tests
          </h3>

          <p>
            {error?.response?.data?.message ||
              "Something went wrong while loading the tests. Please try again."}
          </p>

          <button
            type="button"
            className="test-retry-btn"
            onClick={() => {
              courseId
                ? courseQuery.refetch()
                : allTestsQuery.refetch();
            }}
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  // ==========================================
  // TEST DATA FOR TABLE
  // ==========================================

  let courseAllTest = [];

  // ------------------------------------------
  // COURSE PAGE
  // ------------------------------------------

  if (courseId) {
    courseAllTest = data?.courseTest || [];
  }

  // ------------------------------------------
  // CATEGORY PAGE
  // ------------------------------------------

  else {
    switch (slug) {
      case "weekly":
        courseAllTest = data?.weekly || [];
        break;

      case "monthly":
        courseAllTest = data?.monthly || [];
        break;

      case "mock":
        courseAllTest = data?.mock || [];
        break;

      case "latest":
        courseAllTest = data?.latest || [];
        break;

      default:
        courseAllTest = [];
    }
  }

  // ==========================================
  // COURSE INFORMATION
  // ==========================================

  const CourseSlug =
    data?.course?.slug || "python";

  const uiData = courseUI[CourseSlug];

  const courses = createCourseCard(
    data,
    uiData
  );

  // ==========================================
  // DIFFICULTY COUNT
  // ==========================================

  const difficultyCount = courseAllTest.reduce(
    (acc, test) => {

      if (test.difficulty === "Easy") {
        acc.easy++;
      }

      if (test.difficulty === "Medium") {
        acc.medium++;
      }

      if (test.difficulty === "Hard") {
        acc.hard++;
      }

      acc.all++;

      return acc;

    },
    {
      easy: 0,
      medium: 0,
      hard: 0,
      all: 0,
    }
  );

  // ==========================================
  // PAGE TITLE
  // ==========================================

  const pageTitle = courseId
    ? CourseSlug.charAt(0).toUpperCase() +
    CourseSlug.slice(1)
    : slug
      ? slug.charAt(0).toUpperCase() +
      slug.slice(1)
      : "Tests";

  return (
    <div className="test-container">

      <CommonNavbar
        title="Test"
        title2={pageTitle}
        color="dark-white"
      />

      <div className="test-main-content">

        {/* Only course page */}
        {courseId && (
          <HeroSection subject={courses} />
        )}

        <HeaderSection
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          difficultyCount={difficultyCount}
        />

        <TestsTable
          activeFilter={activeFilter}
          sortBy={sortBy}
          courseAllTest={courseAllTest}
        />

      </div>

    </div>
  );
};

export default TestTopicOverview;