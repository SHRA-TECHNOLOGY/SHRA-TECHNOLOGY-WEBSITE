import { Play, ChevronRight, ChevronLeft, FileText } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import "../../../styles/Test/TestTopicOverview/ListSection.scss";

const TestsTable = ({ activeFilter, sortBy, courseAllTest = [] }) => {
    const navigate = useNavigate();

    // Filter
    const currentShowData =
        activeFilter === "All"
            ? courseAllTest
            : courseAllTest.filter(
                (test) => test.difficulty === activeFilter
            );
            
    return (
        <div className="tests-table">

            {/* Header */}
            <div className="tests-table-header">

                <div className="test-name-column-header">
                    Test Name
                </div>

                <div>Difficulty</div>
                <div>Questions</div>
                <div>Time</div>
                <div>Marks</div>
                <div>XP</div>
                <div>Best Score</div>
                <div>Attempts</div>
                <div>Action</div>

            </div>

            {/* Body */}
            <div className="tests-table-body">

                {currentShowData.length > 0 ? (

                    currentShowData.map((test) => {

                        // Backend fields
                        const difficulty = test.difficulty || "Easy";

                        // Difficulty color
                        const difficultyColor =
                            difficulty === "Easy"
                                ? "#22C55E"
                                : difficulty === "Medium"
                                    ? "#F59E0B"
                                    : "#EF4444";

                        // Backend se attempts data
                        const attempts = test.attempts || 0;

                        const bestScore = test.bestScore || 0;

                        const bestPercentage =
                            test.totalMarks > 0
                                ? Math.round((bestScore / test.totalMarks) * 100)
                                : 0;

                        return (

                            <div
                                className="single-test-row"
                                key={test._id}
                            >

                                {/* Name */}

                                <div className="test-name-column">

                                    <div className="test-icon">

                                        <FileText size={26} />

                                    </div>

                                    <div className="test-info">

                                        <h4>{test.title}</h4>

                                        <p>{test.description}</p>

                                    </div>

                                </div>


                                {/* Difficulty */}

                                <div>

                                    <span
                                        className="difficulty-badge"
                                        style={{
                                            color: difficultyColor,
                                            backgroundColor: `${difficultyColor}18`,
                                            border: `1px solid ${difficultyColor}25`,
                                        }}
                                    >
                                        {difficulty}
                                    </span>

                                </div>


                                {/* Questions */}

                                <div className="table-center">

                                    <h4>
                                        {test.totalQuestions || 0}
                                    </h4>

                                    <span>
                                        Questions
                                    </span>

                                </div>


                                {/* Time */}

                                <div className="table-center">

                                    <h4>
                                        {test.duration || 0}
                                    </h4>

                                    <span>
                                        mins
                                    </span>

                                </div>


                                {/* Marks */}

                                <div className="table-center">

                                    <h4>
                                        {test.totalMarks || 0}
                                    </h4>

                                    <span>
                                        Marks
                                    </span>

                                </div>

                                {/* XP */}

                                <div className="table-center">

                                    <h4>
                                        {test.xp || 0}
                                    </h4>

                                    <span>
                                        Points
                                    </span>

                                </div>


                                {/* Best Score */}

                                <div className="table-center">

                                    <h4>
                                        {test.bestScore || 0}
                                    </h4>

                                    <span
                                        style={{
                                            color:
                                                bestPercentage >= 80
                                                    ? "#22C55E"
                                                    : bestPercentage >= 60
                                                        ? "#F59E0B"
                                                        : "#EF4444",
                                        }}
                                    >
                                        {bestPercentage}%
                                    </span>

                                </div>


                                {/* Attempts */}

                                <div className="table-center attempt">

                                    <h4>{test.attempts?.length || 0}</h4>

                                    <span>
                                        Attempt{attempts > 1 ? "s" : ""}
                                    </span>

                                </div>


                                {/* Button */}

                                <div>

                                    <button
                                        className="start-test-btn"
                                        onClick={() =>
                                            navigate(
                                                `/tests/${test.course}/${test.slug}`
                                            )
                                        }
                                    >

                                        <Play
                                            size={16}
                                            fill="white"
                                        />

                                        {attempts > 0
                                            ? "Attempt Again"
                                            : "Start Test"}

                                    </button>

                                </div>

                            </div>

                        );

                    })

                ) : (

                    <div className="no-tests">
                        No tests found.
                    </div>

                )}

            </div>


            {/* Footer */}

            <div className="tests-table-footer">

                <p>
                    Showing{" "}
                    <strong>
                        {currentShowData.length > 0 ? 1 : 0}
                    </strong>{" "}
                    to{" "}
                    <strong>
                        {currentShowData.length}
                    </strong>{" "}
                    of{" "}
                    <strong>
                        {courseAllTest.length}
                    </strong>{" "}
                    tests
                </p>


                <div className="pagination">

                    <button>
                        <ChevronLeft />
                    </button>

                    <button className="active">
                        1
                    </button>

                    <button>
                        2
                    </button>

                    <button>
                        <ChevronRight />
                    </button>

                </div>

            </div>

        </div>
    );
};

export default TestsTable;