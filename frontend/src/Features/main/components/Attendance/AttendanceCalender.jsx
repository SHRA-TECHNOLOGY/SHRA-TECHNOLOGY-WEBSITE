import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import '../../styles/Attendance/AttendanceCalender.scss'

const AttendanceCalender = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  // Present Days
  const presentDays = [2, 3, 7, 8, 9, 10, 16, 17, 23, 24, 28, 29];

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Total Days
  const totalDays = new Date(year, month + 1, 0).getDate();

  // First Day
  let firstDay = new Date(year, month, 1).getDay();

  // Monday First
  firstDay = (firstDay + 6) % 7;

  const calendar = [];

  // Empty Cells
  for (let i = 0; i < firstDay; i++) {
    calendar.push(null);
  }

  // Dates
  for (let i = 1; i <= totalDays; i++) {
    calendar.push(i);
  }

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="calendar">

      <div className="calendar-header">

        <h2>
          {months[month]} {year}
        </h2>

        <div className="calendar-buttons">
          <ChevronLeft onClick={previousMonth} />
          <ChevronRight onClick={nextMonth} />
        </div>

      </div>

      <div className="week-days">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendar.map((day, index) => (
          <div
            key={index}
            className={`day
              ${day === null ? "empty" : ""}
              ${presentDays.includes(day) ? "present" : ""}
              ${selectedDay === day ? "selected" : ""}
            `}
            onClick={() => day && setSelectedDay(day)}
          >
            {day}
          </div>
        ))}
      </div>

    </div>
  )
}

export default AttendanceCalender
