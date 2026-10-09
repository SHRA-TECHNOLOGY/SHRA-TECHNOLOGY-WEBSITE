import React from 'react'
import { attendanceSummary } from '../../../../Data/Attendance/AttendanceData'
import '../../styles/Attendance/AttendanceSummary.scss'

const AttendanceSummary = () => {
  return (
    <div className='att-summary-section'>

      {
        attendanceSummary.map(item => {
          return (
            <div className="summary-card" key={item.id}>

              <p>{item.title}</p>
              <span>{item.value}</span>
            </div>
          )
        })
      }


    </div>
  )
}

export default AttendanceSummary
