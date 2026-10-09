import { FaTimes } from "react-icons/fa";
import AchievementBadgeCard from "./AchievementBadgeCard";

const AchievementModal = ({ data, onClose }) => {
  return (
    <div className="achievement-modal">

      <div className="modal-box">

        <div className="modal-header">

          <h2>🏆 All Achievements</h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <div className="modal-grid">

          {data.map((item)=>(
            

              < AchievementBadgeCard item={item} key={item.id}/>
          ))}

        </div>

      </div>

    </div>
  );
};

export default AchievementModal