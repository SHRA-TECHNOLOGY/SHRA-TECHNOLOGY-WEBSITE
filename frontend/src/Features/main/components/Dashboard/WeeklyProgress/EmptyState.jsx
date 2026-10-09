import { FaBullseye } from "react-icons/fa";

const EmptyState = () => {

    return (
        <div className="empty-progress">

            <div className="target-icon">
                <FaBullseye />
            </div>

            <h2>Set Your Weekly Target</h2>

            <p>
                Stay consistent by setting your weekly learning goals.
                Complete your targets and track your progress throughout
                the week.
            </p>

            <button>
                Add Target
            </button>

        </div>
    );

}

export default EmptyState;