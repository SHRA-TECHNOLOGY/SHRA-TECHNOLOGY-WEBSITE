import React from 'react'
import {Lock} from 'lucide-react'
import '../../../styles/CourseDetails/LectureSection.scss'

const VideoEmptySection = () => {
  return (
    <div className='empty-container'>
      
      <div className="video-locked-content">
        <span className='lock-icon'><Lock  size={80}/></span>
        <h2>Preview Not Available</h2>
        <p>Enroll to access full course content</p>

        <button className='enroll-btn'>Enroll Now</button>
      </div>
    </div>
  )
}

export default VideoEmptySection
