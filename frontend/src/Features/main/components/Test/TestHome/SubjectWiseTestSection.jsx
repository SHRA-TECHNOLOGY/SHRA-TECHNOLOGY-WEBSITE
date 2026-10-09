import React, { useState } from 'react'
// import { subjectWiseTests } from '../../../../../Data/Test/TestHome.jsx'
import { ArrowRight } from 'lucide-react'
import '../../../styles/Test/TestHome/SubjectWiseSection.scss'
import { useNavigate } from 'react-router'

import { languageUI } from '../../../../../Data/Practice/CourseLogoData.jsx'

const SubjectWiseTestSection = ({ courseWiseTests }) => {

  const subjectWiseTests = courseWiseTests;

  const navigate = useNavigate()
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="subjects-wise-container">

      {/* header section here */}

      <div className="subject-header-section">
        <h3>Subject Wise Tests</h3>
        <button onClick={() => setShowAll(!showAll)}>View All</button>
      </div>

      {/* subject container section here */}

      <div className="all-subjects-container-test">

        {(showAll ? subjectWiseTests : subjectWiseTests.slice(0, 4)).map((item,index) => {

          const ui = languageUI[item.courseName] || {};

          const Icon = ui.icon;
          const color = ui.color || "#7C3AED";

          return (
            <div className="subject-card" key={index} onClick={() => navigate(`/tests/${item.courseId}`)}>
              <div className="subject-left">
                <Icon
                  size={38}
                  color={color}
                />

                <div className="subject-info">
                  <h4>{item.courseName}</h4>
                  <p>{item.totalTests} Tests</p>
                </div>
              </div>

              <button className="subject-arrow">
                <ArrowRight size={28} />
              </button>
            </div>
          );
        })}

      </div>

    </div>
  )
}

export default SubjectWiseTestSection
