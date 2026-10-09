import React from 'react'
import '../../styles/Home/PopularCourse.scss'
import CourseCard from '../Course/CourseCard'


const PopularCourse = () => {
    return (
        <div className='popular-course-container'>

            <div className="popular-title-section">
                <h2>Popular Courses</h2>
                <button>View All</button>
            </div>

            <div className="popular-cards">

                <CourseCard />
            </div>
        </div>
    )
}

export default PopularCourse
