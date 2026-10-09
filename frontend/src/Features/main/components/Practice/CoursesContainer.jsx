import React from 'react'
import '../../styles/Practice/CourseSection.scss'
import { useNavigate } from 'react-router'
import { languageUI } from '../../../../Data/Practice/CourseLogoData';

const CoursesContainer = ({ courseProblems }) => {


  const navigate = useNavigate();

  return (
    <div className="practice-courses">

      <h2>Choose a Programming Language</h2>

      <div className="course-container pra-course">

        {courseProblems.map((item) => {

          const ui = languageUI[item.language] || {};

          const Icon = ui.icon;
          const color = ui.color || "#7C3AED";

          return (

            <div
              className="course-card"
              key={item.course?._id}
              onClick={() =>
                navigate(
                  `/practice/${item.course?.slug}`
                )
              }
            >

              <div className="card-upper">

                {Icon && (
                  <Icon
                    size={42}
                    color={color}
                    strokeWidth={2}
                  />
                )}

                <div className="card-data">

                  <h3>
                    {item.course?.title}
                  </h3>

                  <p>
                    {item.totalProblems} Problems
                  </p>

                </div>

              </div>


              <div className="card-lower">

                <div className="progress">

                  <div
                    className="fill"
                    style={{
                      width: `${item.progress}%`,
                      backgroundColor: color,
                    }}
                  />

                </div>

                <span>
                  {item.progress}%
                </span>

              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
};

export default CoursesContainer
