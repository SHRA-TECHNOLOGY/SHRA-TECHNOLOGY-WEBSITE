import React from 'react'

const AchievementBadgeCard = ({item}) => {

    
    return (
        <div
            className={`achievement-card ${item.status}`}
            key={item.id}
        >

            {/* Icon */}

            <div
                className="achievement-icon"
                style={{ background: `${item.color}20` }}
            >
                <span
                    style={{ color: item.color }}
                >
                    {item.icon}
                </span>
            </div>

            {/* NEW Badge */}

            {item.badge && (
                <span className="new-badge">
                    {item.badge}
                </span>
            )}

            {/* Title */}

            <h4>{item.title}</h4>

            {/* Date */}

            <p>{item.date}</p>

        </div>
    )
}

export default AchievementBadgeCard
