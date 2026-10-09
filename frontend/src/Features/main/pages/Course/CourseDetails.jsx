import React from 'react'
import CommonNavbar from '../../components/Navbar/CommonNavbar'
import { courseData } from '../../../../Data/CourseDetails/CourseDetailsData'
import CoursePlayer from '../../components/CoursePlayer/CoursePlayer'

const CourseDetails = () => {
  return (
    <>
      <CommonNavbar title={"Course Overview"}/>

      {/* Lecture section here */}

        <CoursePlayer />
    </>
  )
}

export default CourseDetails
