import React from 'react'
import { useNavigate } from 'react-router'

import {Sparkles} from 'lucide-react'

import '../../styles/MyCourse/EmptySection.scss'

const   EmptySection = () => {

    const navigate = useNavigate()
    return (
        <>

            {/* =========================
                 EMPTY STATE
             ========================== */}
            <section className="empty-course">

                <div className="empty-icon">
                    <span><Sparkles /></span>
                </div>

                <h3>No courses yet!</h3>

                <p>
                    It looks like you haven't bought any courses.
                </p>

                <button onClick={()=>{
                    navigate("/course")
                }}>
                    Browse Courses
                </button>

            </section>
        </>
    )
}

export default EmptySection
