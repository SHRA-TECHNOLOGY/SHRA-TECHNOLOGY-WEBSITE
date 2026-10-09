import React, { useState } from 'react'
import '../../../styles/Practice/CodeEditor/LeftEditor.scss'
import {Bookmark,Dot}from 'lucide-react'

const LeftPartEditor = ({ difficulty, title, question }) => {

  const [activeTab, setActiveTab] = useState("Problem")
  return (
    <div className='leftEditorPart-section'>

      {/* title section */}

      <div className="header-section">
        <div className='title'>

          <h2>{title}</h2>
          <span className={`difficulty ${difficulty.toLowerCase()}`}>{difficulty}</span>
        </div>
        <Bookmark />
      </div>

      {/* Button tab */}

      <div className="classes-status questions-types question-button">
        <button className={activeTab === "Problem" ? "active" : ""} onClick={() => setActiveTab("Problem")}>Problem</button>

        <button className={activeTab === "Submissions" ? "active" : ""} onClick={() => setActiveTab("Submissions")}>Submissions</button>

        <button className={activeTab === "Solution" ? "active" : ''} onClick={() => setActiveTab("Solution")}>Solution (512)</button>

        <button className={activeTab === "Discuss" ? "active" : ''} onClick={() => setActiveTab("Discuss")}>Discuss</button>
      </div>

      
      {/* questions sections */}

      <div className="question-section">

        {/* statement of problem */}

        <div className="statement">
          <p>{question.statement}</p>
        </div>

        {/* example section */}

        <div className="example-section">
          {
            question?.examples?.map(example => {
              return (
                <div className="example-card" key={example._id}>
                  <h4>Example {example.id}:</h4>

                  <div className="input-output">

                    <p><strong>Input : </strong>{example.input}</p>
                    <p><strong>Output : </strong>{example.output}</p>
                  </div>

                </div>
              )
            })
          }
        </div>

        {/* constraint section */}

        <div className="constraint">
          <h4>Constraints:</h4>

          <div className='constraint-list'>
            {
              question?.constraints?.map((item, index) => {
                return (
                  <div key={index} className='single-constraint'>

                    <Dot />
                    <p>{item}</p>
                    
                  </div>
                )
              })
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default LeftPartEditor

