import React from 'react'
import { attendanceOverview } from '../../../../Data/Attendance/AttendanceData'
import '../../styles/Attendance/AttendanceOverall.scss'

const AttendanceOverall = () => {
  const percentage = 85;
  return (
    <div className='attendance-overview'>
      <p>Attendance Overview</p>


      <div
        className="attendance-percentage"
        style={{
                background: `conic-gradient(
            #34C759 ${percentage * 3.6}deg,
            #DFF3E3 ${percentage * 3.6}deg 360deg
          )`,
        }}
      >
        <div className="inner-circle">
          {percentage}%
        </div>
      </div>

      {/* present & absent */}
      <div className="absent-present-section">

        {/* present box here */}

        <div className="present-box">
          <p>Present</p>
          <span>{attendanceOverview.present.count} ({attendanceOverview.present.percentage})</span>
        </div>

        {/* absent box here */}

        <div className="present-box">
          <p>Absent</p>
          <span>{attendanceOverview.absent.count} ({attendanceOverview.absent.percentage})</span>
        </div>

      </div>

      <div className='note-section'> <p><b>Note:</b> {attendanceOverview.note}</p></div>
    </div>
  )
}

export default AttendanceOverall
