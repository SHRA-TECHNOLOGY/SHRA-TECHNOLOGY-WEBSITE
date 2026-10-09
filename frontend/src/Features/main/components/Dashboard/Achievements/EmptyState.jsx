import '../../../styles/Dashboard/achivementEmpty.scss';

const EmptyState = () => {

    return (

        <section className="achievement-section outer-container">

            <div className="achievement-empty-icon">
                🏆
            </div>

            <div className="empty-content">

                <h2>No Achievements Yet</h2>

                <p>
                    Complete lessons, solve problems and take tests
                    to unlock achievements.
                </p>

                <span>
                    Keep learning and earn your first badge! 🚀
                </span>

            </div>

        </section>

    );
};

export default EmptyState;