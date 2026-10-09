import React from "react";
import { ChevronDown } from "lucide-react";
import '../../../styles/Test/TestTopicOverview/HeaderSection.scss'

const HeaderSection = ({activeFilter,setActiveFilter,sortBy,setSortBy,difficultyCount}) => {

    const easy = difficultyCount?.easy;
    const medium = difficultyCount?.medium;
    const hard = difficultyCount?.hard;
    const all = difficultyCount?.all;

    const filterTabs = [
        { id: "All", label: "All", count: all, color: "#5B4CF6" },
        { id: "Easy", label: "Easy", count: easy, color: "#22C55E" },
        { id: "Medium", label: "Medium", count: medium, color: "#F59E0B" },
        { id: "Hard", label: "Hard", count: hard, color: "#EF4444" },
    ];

    return (
        <div className="test-filter-bar">

            <div className="filter-tabs">
                {filterTabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`filter-btn ${activeFilter === tab.id ? "active" : ""}`}
                        style={{
                            "--filter-color": tab.color,
                        }}
                        onClick={() => setActiveFilter(tab.id)}
                    >
                        {tab.label} ({tab.count})
                    </button>
                ))}
            </div>

            <div className="sort-box">
                <span>Sort by:</span>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="highest">Highest Score</option>
                    <option value="lowest">Lowest Score</option>
                </select>

                <ChevronDown size={50} />
            </div>

        </div>
    )
}

export default HeaderSection
