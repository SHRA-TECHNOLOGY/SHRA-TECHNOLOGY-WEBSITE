import React from 'react'
import CommonNavbar from '../components/Navbar/CommonNavbar'
import AttendanceSummary from '../components/Attendance/AttendanceSummary'
import AttendanceOverall from '../components/Attendance/AttendanceOverall'
import AttendanceCalender from '../components/Attendance/AttendanceCalender'
import '../styles/Attendance/AttendHome.scss'

const Attendance = () => {
  return (
    <>
      
      <CommonNavbar title={"Attendance"}/>

      <div className="main-content">

        <AttendanceSummary />

        <div className="calender-overall">

          <AttendanceCalender />
          <AttendanceOverall />
        </div>

      </div>
    </>
  )
}

export default Attendance
