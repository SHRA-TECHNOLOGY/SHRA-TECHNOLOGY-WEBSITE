import React from 'react'
import { recentResults } from '../../../../../Data/Test/TestHome'
import '../../../styles/Test/TestHome/TestRecent.scss'

const TestRecent = () => {
    return (
        <div className="test-recent-container">

            <div className="recent-title-section">
                <h2>Recent Results</h2>
                <button>View All</button>
            </div>

            {/* Header */}
            <div className="test-recent-header">
                <div>Test Name</div>
                <div>Subject</div>
                <div>Score</div>
                <div>Accuracy</div>
                <div>Date</div>
                <div>Status</div>
            </div>

            <div className="recent-list-container">
                {/* Rows */}
                {recentResults.map((item) => {
                    const SubjectIcon = item.subjectIcon;

                    return (
                        <div className="test-resent-row" key={item.id}>
                            {/* Test Name */}
                            <div className="test-name">
                                <SubjectIcon size={33} color={item.subjectColor} />

                                <div className="test-info">
                                    <h4>{item.testName}</h4>

                                    <span
                                        className="difficulty"
                                        style={{
                                            color: item.difficultyColor,
                                            backgroundColor: `${item.difficultyColor}20`,
                                        }}
                                    >
                                        {item.difficulty}
                                    </span>
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="subject">
                                <SubjectIcon size={28} color={item.subjectColor} />
                                <span>{item.subject}</span>
                            </div>

                            {/* Score */}
                            <div className="score">
                                {item.score}
                            </div>

                            {/* Accuracy */}
                            <div className="accuracy">
                                {item.accuracy}
                            </div>

                            {/* Date */}
                            <div className="date">
                                {item.date}
                            </div>

                            {/* Status */}
                            <div className="status-box">
                                <span
                                    className="status"
                                    style={{
                                        color: item.statusColor,
                                        backgroundColor: `${item.statusColor}20`,
                                    }}
                                >
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}

export default TestRecent
