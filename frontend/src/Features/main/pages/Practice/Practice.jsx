import React from 'react'
import CommonNavbar from '../../components/Navbar/CommonNavbar'
import PracticeSummarySection from '../../components/Practice/PracticeSummarySection'
import CoursesContainer from '../../components/Practice/CoursesContainer'
import '../../styles/Practice/PracticeHome.scss'

import { useAllPractice } from '../../Hooks/Practice/usePractice'

const Practice = () => {

  const {data,isLoading,isError,error} = useAllPractice();
  
  const problems = data?.practiceData;

  // all summery data
  const totalProblems = problems?.totalProblem || 0;
  const totalSolved = problems?.totalSolved || 0;
  const streak = problems?.streak?.current || 0;
  const bestScore = problems?.bestScore || 0;

  // course data 

  const courseProblems = problems?.languages || [];

  return (
    <div className='practice-right'>

      <CommonNavbar title={"Code Practice"} color={"white"} message={"Practice, improve and master your coding skills."}/>

      <div className="practice-main-content">

        <PracticeSummarySection  totalProblems={totalProblems} totalSolved={totalSolved} streak={streak} bestScore={bestScore} />

        <CoursesContainer courseProblems={courseProblems} />
        
      </div>


    </div>
  )
}

export default Practice
