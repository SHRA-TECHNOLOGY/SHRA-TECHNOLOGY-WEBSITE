import React from 'react'

import '../../styles/AdminPanel/viewStudentDetails.scss'

function ViewStudentDetails({ selectedStudent, setSelectedStudent }) {
    return (
        <div
            className="student-details-overlay"
            onClick={() => setSelectedStudent(null)}
        >

            <div
                className="student-details-modal"
                onClick={(e) => e.stopPropagation()}
            >

                {/* HEADER */}

                <div className="student-details-header">

                    <div>
                        <h3>Student Details</h3>
                        <p>
                            View student profile and learning information.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="student-details-close"
                        onClick={() => setSelectedStudent(null)}
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                {/* STUDENT PROFILE */}

                <div className="student-profile">

                    <div className="student-avatar">
                        {selectedStudent.name
                            ?.charAt(0)
                            .toUpperCase()}
                    </div>

                    <div className="student-profile-info">

                        <h2>
                            {selectedStudent.name || "Unknown Student"}
                        </h2>

                        <p>
                            {selectedStudent.email || "No email available"}
                        </p>

                    </div>

                </div>


                {/* BASIC INFORMATION */}

                <div className="student-info-section">

                    <h4>Basic Information</h4>

                    <div className="student-info-grid">

                        <div className="student-info-card">

                            <span>Student Name</span>

                            <strong>
                                {selectedStudent.name || "-"}
                            </strong>

                        </div>


                        <div className="student-info-card">

                            <span>Email Address</span>

                            <strong>
                                {selectedStudent.email || "-"}
                            </strong>

                        </div>


                        <div className="student-info-card">

                            <span>Enrolled Courses</span>

                            <strong>
                                {selectedStudent.courseCount ?? 0}
                            </strong>

                        </div>


                        <div className="student-info-card">

                            <span>Attendance</span>

                            <strong>
                                {selectedStudent.attendance ?? 0}%
                            </strong>

                        </div>

                    </div>

                </div>


                {/* LEARNING OVERVIEW */}

                <div className="student-info-section">

                    <h4>Learning Overview</h4>

                    <div className="student-overview">

                        <div className="overview-item">

                            <span>Courses</span>

                            <strong>
                                {selectedStudent.courseCount ?? 0}
                            </strong>

                        </div>


                        <div className="overview-item">

                            <span>Attendance</span>

                            <strong>
                                {selectedStudent.attendance ?? 0}%
                            </strong>

                        </div>


                        <div className="overview-item">

                            <span>Status</span>

                            <strong className="active-status">
                                Active
                            </strong>

                        </div>

                    </div>

                </div>


                {/* FOOTER */}

                <div className="student-details-footer">

                    <button
                        type="button"
                        className="student-close-btn"
                        onClick={() => setSelectedStudent(null)}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ViewStudentDetails
