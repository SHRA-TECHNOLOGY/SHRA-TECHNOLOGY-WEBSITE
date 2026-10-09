import React from "react";
import {
  FaRegClock,
  FaUserGraduate,
} from "react-icons/fa";


const UpcomingLiveClass = ({dashboardData}) => {
  return (
    <section className="upcoming-class">

      <div className="class-header">
        <h2>Upcoming Live Class</h2>

        <button>View All</button>
      </div>

      <div className="class-card">

        <div className="class-image">

          <img
            src={dashboardData.liveClass.class.image}
            alt={dashboardData.liveClass.class.title}
          />

        </div>

        <div className="class-details">

          <h3>{dashboardData.liveClass.class.title}</h3>

          <p>By {dashboardData.liveClass.class.instructor}</p>

          <div className="class-info">

            <span>
              <FaRegClock />
              {dashboardData.liveClass.class.date}, {dashboardData.liveClass.class.time}
            </span>

            <span>
              <FaUserGraduate />
              {dashboardData.liveClass.class.students} Students Registered
            </span>

          </div>

        </div>

        <button className="join-btn">
          Join Class
        </button>

      </div>

    </section>
  );
};

export default UpcomingLiveClass;