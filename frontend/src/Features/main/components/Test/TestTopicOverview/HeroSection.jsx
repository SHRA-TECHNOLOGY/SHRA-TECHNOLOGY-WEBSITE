import React from 'react'
import "../../../styles/Test/TestTopicOverview/HeroSection.scss"

const HeroSection = ({subject}) => {
    
    return (
        <div className="subject-hero">

            {/* Left */}
            <div className="subject-info">

                <div
                    className="subject-icon"
                    style={{ backgroundColor: `${subject?.iconColor}20` }}
                >
                    <subject.icon
                        size={55}
                        color={subject?.iconColor}
                    />
                </div>

                <div className="subject-content">
                    <h1>{subject?.title}</h1>
                    <p>{subject?.description}</p>
                </div>

            </div>

            {/* Right */}
            <div className="subject-stats">

                {subject?.stats.map((item, index) => {

                    const Icon = item.icon;

                    return (
                        <div
                            className={`single-stat ${index !== subject?.stats.length - 1 ? "border-right" : ""}`}
                            key={index}
                        >

                            <div
                                className="stat-icon"
                                style={{ backgroundColor: `${item?.color}20` }}
                            >
                                <Icon
                                    size={28}
                                    color={item?.color}
                                />
                            </div>

                            <div className="stat-content">
                                <h2>{item?.value}</h2>
                                <p>{item?.title}</p>
                            </div>

                        </div>
                    );

                })}

            </div>

        </div>
    )
}

export default HeroSection
