import React from 'react'
import CommonNavbar from '../../components/Navbar/CommonNavbar'
import { useParams } from 'react-router'
import MainSection from '../../components/Test/TestInstruction/MainSection'
import { subjectTests } from '../../../../Data/Test/SubjectTestData'
import { useTestInstruction } from '../../Hooks/Test/useTest'

const TestInstruction = () => {

  const {courseId, testSlug} = useParams()

  const {data,isLoading,isError,error} = useTestInstruction({courseId,slug:testSlug})

  const testInstructions = data?.testInstruction;

  return (
    <div className='test-container'>

      <CommonNavbar title={`Tests > ${testSlug.charAt(0).toUpperCase() + testSlug.slice(1)}  `} title2={testSlug.charAt(0).toUpperCase() + testSlug.slice(1)} color={"dark-white"} />

      <div className="test-main-content">

        {/* Hero section here */}

        <MainSection testInstructions={testInstructions}/>

      </div>

    </div>
  )
}

export default TestInstruction
