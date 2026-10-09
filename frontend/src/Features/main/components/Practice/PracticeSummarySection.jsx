import React from 'react'
import "../../styles/Practice/SummarySection.scss"

import {
    Code2,
    CircleCheckBig,
    Flame,
    Trophy
} from "lucide-react";

const PracticeSummarySection = ({ totalProblems, totalSolved, streak, bestScore }) => {
    
    const percentage = parseInt((totalSolved / totalProblems) * 100);

    const statsData = [
        {
            id: 1,
            title: "Total Problems",
            value: totalProblems,
            subtitle: "Across all subjects",
            icon: Code2,
            color: "#7C3AED",
        },
        {
            id: 2,
            title: "Problems Solved",
            value: totalSolved,
            subtitle: percentage +"% of total",
            icon: CircleCheckBig,
            color: "#22C55E",
        },
        {
            id: 3,
            title: "Current Streak",
            value: streak,
            subtitle: "Keep it up!",
            icon: Flame,
            color: "#F59E0B",
        },
        {
            id: 4,
            title: "Best Score",
            value: bestScore + "%",
            subtitle: "Overall accuracy",
            icon: Trophy,
            color: "#3B82F6",
        },
    ];
    return (
        <div className='att-summary-section'>
            {
                statsData.map(item => {
                    const Icon = item.icon
                    return (
                        <div className="practice-summary-card" key={item.id}>

                            <div className="left">
                                <span><Icon /></span>

                            </div>

                            <div className="right">
                                <p>{item.title}</p>
                                <h2>{item.value}</h2>
                                <p>{item.subtitle}</p>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default PracticeSummarySection
