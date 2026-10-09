import React from 'react'
import '../../styles/AdminPanel/Summary.scss'

const DashboardCard = () => {

  const dashboardStats = [
    {
      id: 1,
      title: "Total Students",
      value: 156,
    },
    {
      id: 2,
      title: "Active Courses",
      value: 12,
    },
    {
      id: 3,
      title: "Total Notes",
      value: 48,
    },
    {
      id: 4,
      title: "Avg. Attendance",
      value: "89%",
    },
  ];

  return (
    <div className='admin-dashboard admin-summary-section'>

      {
        dashboardStats.map(item =>{
          return (
            <div className="admin-dashboard-card admin-summary-card" key={item.id}>
              <p>{item.title}</p>
              <span>{item.value}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default DashboardCard
