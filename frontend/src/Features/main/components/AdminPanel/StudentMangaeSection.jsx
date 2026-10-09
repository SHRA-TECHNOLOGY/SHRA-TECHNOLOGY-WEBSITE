import React from 'react'
import '../../styles/AdminPanel/StudentsManage.scss'

import { useAllStudents } from '../../Hooks/Admin/Student/useStudent'
import ViewStudentDetails from './viewStudentDetails'


const StudentManageSection = () => {

    const [selectedStudent, setSelectedStudent] = React.useState(null)

    const {
        data: studentData,
        isLoading,
        isError,
        error,
    } = useAllStudents()


    const studentsData = studentData?.students || [];


    return (
        <>

            {/* students manage section */}

            <div className='course-manage-container'>

                {/* header section */}

                <div className="header-section">
                    <h3>Student Management</h3>
                    <p>View and manage student records.</p>
                </div>


                {/* loading */}

                {isLoading && (
                    <div className="student-status">
                        <p>Loading students...</p>
                    </div>
                )}


                {/* error */}

                {isError && (
                    <div className="student-status error">
                        <p>
                            {error?.response?.data?.message ||
                                "Failed to load students."}
                        </p>
                    </div>
                )}


                {/* students list */}

                {!isLoading && !isError && (
                    <div className="students-list-container">

                        {studentsData.length > 0 ? (

                            studentsData.map((item) => {

                                const studentName =
                                    item.name || "Unknown Student"


                                return (
                                    <div
                                        className="single-student"
                                        key={item._id}
                                    >

                                        {/* LEFT PART */}

                                        <div className="left-part">

                                            <span>
                                                {studentName
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>

                                            <div className="lift-info">

                                                <h4>
                                                    {studentName}
                                                </h4>

                                                <p>
                                                    {item.email || "No email"}
                                                </p>

                                            </div>

                                        </div>


                                        {/* RIGHT PART */}

                                        <div className="right-part">

                                            {/* COURSE */}

                                            <div className="right-card course-enroll">

                                                <p>
                                                    Course
                                                </p>

                                                <span>
                                                    {item.courseCount ?? 0}
                                                </span>

                                            </div>


                                            {/* ATTENDANCE */}

                                            <div className="right-card attendance">

                                                <p>
                                                    Attendance
                                                </p>

                                                <span>
                                                    {item.attendance ?? 0}%
                                                </span>

                                            </div>


                                            {/* VIEW DETAILS */}

                                            <button
                                                className="view-btn"
                                                type="button"
                                                onClick={() => setSelectedStudent(item)}
                                            >
                                                View Details
                                            </button>

                                        </div>

                                    </div>
                                )
                            })

                        ) : (

                            <div className="student-status">
                                <p>No students found.</p>
                            </div>

                        )}

                    </div>
                )}

            </div>

            {/* =====================================================
                    STUDENT DETAILS MODAL
                ===================================================== */}

            {selectedStudent && (
                <ViewStudentDetails selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} />
            )}
        </>
    )
}

export default StudentManageSection