import React from 'react'
import CourseCard from './CourseCard'

const CourseSection = ({ currentShowCourses }) => {
  return (
    <>

      {currentShowCourses.map((data, index) => (
        <CourseCard
          key={index}
          data={data}
        />
      ))}
    </>
  )
}

export default CourseSection
