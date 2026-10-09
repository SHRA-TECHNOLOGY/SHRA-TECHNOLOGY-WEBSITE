import React, { useState } from 'react'
import CourseSection from './CourseSection'
import NotesUploadSection from './NotesUploadSection'
import StudentManageSection from './StudentMangaeSection'
import AdminNotification from './AdminNotification'
import LiveClassCreateSection from './LiveClassCreateSection'
import RecordedClassSection from './RecordedClassSection'
import LessonManageSection from './LessonManageSection'

import '../../styles/AdminPanel/AdminMainSection.scss'

const AdminMainSection = () => {

    const [activeTab, setActiveTab] = useState("Courses")

    const titles = [
        {
            id: 1,
            title: "Courses"
        },
        {
            id: 2,
            title: "Lesson Manage"
        },
        {
            id: 3,
            title: "Notes"
        },
        {
            id: 4,
            title: "Live Class"
        },
        {
            id: 5,
            title: "Recorded Class"
        },
        {
            id: 6,
            title: "Notification"
        },
        {
            id: 7,
            title: "Students"
        },
    ]

    return (
        <>

            {/* switch div */}

            <div className="admin-switch-box">
                {
                    titles.map(i => {
                        return (
                            <button className={`switch-btn ${activeTab === i.title ? "active" : ""}`} key={i.id} onClick={() => setActiveTab(i.title)}>{i.title}</button>
                        )
                    })
                }
            </div>


            {/* course manage section here */}

            {activeTab === "Courses" ? <CourseSection /> : ""}

            {/* Lesson Manage Section  here */}

            {activeTab === "Lesson Manage" ? <LessonManageSection /> : ""}

            {/* notes upload section here */}

            {activeTab === "Notes" ? <NotesUploadSection /> : ""}

            {/* notes upload section here */}

            {activeTab === "Live Class" ? <LiveClassCreateSection /> : ""}

            {/* notes upload section here */}

            {activeTab === "Recorded Class" ? <RecordedClassSection /> : ""}
            

            {/* notes upload section here */}
            {activeTab === "Notification" ? <AdminNotification /> : ""}

            {/* notes upload section here */}

            {activeTab === "Students" ? <StudentManageSection /> : ""}
        </>
    )
}

export default AdminMainSection
