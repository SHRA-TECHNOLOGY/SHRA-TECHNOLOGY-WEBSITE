import React from 'react'

import EmptyBadge from './EmptyBadge'
import '../../styles/Profile/Badge.scss'

const Badge = ({ profileData }) => {
    return (

        <>


            {profileData?.badges?.length > 0 ? (

                <div className="badges-section">
                    <div className="header">
                        <h3>Badges</h3>
                        <button>View All</button>
                    </div>

                    <div className="badges-grid">


                        {profileData.badges.map((badge) => (
                            <div className="badge-card" key={badge.id}>
                                <div
                                    className="badge-icon"
                                    style={{ background: badge.color }}
                                >
                                    {badge.icon}
                                </div>

                                <h4>{badge.title}</h4>
                            </div>
                        ))
                        }

                    </div>
                </div>
            ) : (
                <EmptyBadge />
            )}

        </>


    );
}

export default Badge
