import React from 'react'
import CommonNavbar from '../../components/Navbar/CommonNavbar'
import '../../styles/Test/TestHome/TestHome.scss'
import TestOverviewSection from '../../components/Test/TestHome/TestOverviewSection'
import SubjectWiseTestSection from '../../components/Test/TestHome/SubjectWiseTestSection'
import TestRecent from '../../components/Test/TestHome/TestRecent'
import Leaderboard from '../../components/Test/TestHome/Leaderboard'

import { useAllTests } from '../../Hooks/Test/useTest'

const TestHome = () => {

  // hooks
  const { data, isLoading, isError, error } = useAllTests();
  // state 

  const courseWiseTests = data?.courseWiseTests || [];
  const mock = data?.mock || [];
  const monthly = data?.monthly || [];
  const latest = data?.latest || [];
  const weekly = data?.weekly || [];

  return (
    <div className='test-container'>

      <CommonNavbar title={"Hello, Sonu Yadav"} color={"white"} message={"Welcome Back! Ready to test your skills today?"} />

      <div className="test-main-content">

        {/* test overview section here */}

        <TestOverviewSection mock={mock} monthly={monthly} latest={latest} weekly={weekly} />

        {/* subject wise test section here */}

        <SubjectWiseTestSection courseWiseTests={courseWiseTests} />

        {/* Footer part section here */}

        <div className="test-footer">

          {/* recent results section here */}

          {/* enroll in future  */}

          {/* <TestRecent /> */}

          <Leaderboard />
        </div>

      </div>

    </div>
  )
}

export default TestHome
