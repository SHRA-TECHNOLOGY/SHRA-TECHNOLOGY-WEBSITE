import React from 'react'
import { BugOff, TestTubes, Volleyball, Award,School } from 'lucide-react'
import '../../styles/Profile/Progress.scss'

const Progress = ({ profileData }) => {
  return (
    <section className='user-progress-section'>
      <h2>Progress</h2>

      <div className="progress-list">
        <div className="single-progress">

          <div className="progress-title">

            <span><BugOff /></span>
            <h4>Problem Solved</h4>
          </div>
          <p>{profileData.stats.problemsSolved}</p>
        </div>
        <div className="single-progress">
          <div className="progress-title">
            <span><TestTubes /></span>
            
            <h4>Test Taken</h4>
          </div>

          <p>{profileData.stats.testsTaken}</p>
        </div>
        <div className="single-progress">
          <div className="progress-title">
            <span><Volleyball /></span>
            
            <h4>Average Score</h4>
          </div>

          <p>{profileData.stats.averageScore} %</p>
        </div>
        <div className="single-progress">
          <div className="progress-title">
            <span><Award /></span>
            
            <h4>Badge Earned</h4>
          </div>

          <p>{profileData.stats.badgesEarned}</p>
        </div>

        <div className="single-progress">
          <div className="progress-title">
            <span><School /></span>
            
            <h4>Course Enroll</h4>
          </div>

          <p>{profileData.stats.courseEnroll}</p>
        </div>
      </div>
    </section>
  )
}

export default Progress
