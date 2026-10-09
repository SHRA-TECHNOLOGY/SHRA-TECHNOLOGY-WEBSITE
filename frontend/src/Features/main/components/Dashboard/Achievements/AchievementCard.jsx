import React,{useState} from "react";

import AchievementModal from "./AchievementModal";
import AchievementBadgeCard from "./AchievementBadgeCard";

const AchievementCard = ({achievements}) => {

    const [showModal, setShowModal] = useState(false);

    const previewAchievements = achievements.slice(0, 4 );

    return (
        <section className="achievements-section">

            {/* Header */}

            <div className="achievement-header">

                <h2>Achievements</h2>

                <button onClick={() => setShowModal(true)}>View All</button>

            </div>

            {/* Horizontal Scroll */}

            <div className="achievement-scroll">

                {previewAchievements.map((item) => (   
                    
                    

                    <AchievementBadgeCard item={item} key={item.id} />

                ))}

            </div>

            {
                showModal && (
                    <AchievementModal
                        data={achievements}
                        onClose={() => setShowModal(false)}
                    />
                )
            }

        </section>
    );
};

export default AchievementCard;