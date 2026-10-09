import React from 'react'
import '../../../styles/Practice/PracticeQuestions/ProblemsList.scss'
import {CircleCheck,CircleMinus} from 'lucide-react'
import { useNavigate,useParams } from 'react-router'

import { useCourseAllProblem } from '../../../Hooks/Practice/usePractice'

const QuestionsList = ({ activeTab, slug }) => {

    // hook
    const {data,isLoading,isError,error} = useCourseAllProblem({slug});

    const problems = data?.problems || [];

    const navigate = useNavigate();

    const activeQuestions = problems.filter(
        (item) => activeTab === "All" || item.difficulty === activeTab
    );
    
    return (
        <div className="problems-table">

            {/* Header */}
            <div className="table-header">
                <p>Problem</p>
                <p>Difficulty</p>
                <p>Acceptance</p>
                <p>Solved</p>
                <p>Est. Time</p>
                <p>Action</p>
            </div>

            {/* Rows */}
            {activeQuestions.map((item) => (
                <div className="table-row" key={item._id}>
                    <div className="problem">
                        <h4>{item.title}</h4>
                        <span>{item.topic}</span>
                    </div>

                    <div className={`difficulty ${item.difficulty.toLowerCase()}`}>
                        {item.difficulty}
                    </div>

                    <div className='acceptance'>{item.acceptance}</div>

                    <div className={`checkSolved ${item.solved === true ? "solved": "unsolved"}`}>{item.solved ? <CircleCheck size={28} /> : <CircleMinus size={28}/>}</div>

                    <div className='estTime'>{item.estimatedTime}</div>

                    <button className='start-btn' onClick={()=> navigate(`/practice/${slug}/${item.difficulty}/${item.slug}`)}>Start</button>
                </div>
            ))}

        </div>
    )
}

export default QuestionsList
