const RecommendationCard = ({ course }) => {

    return (

        <div className="recommend-card">

            <img
                src={course.thumbnail}
                alt={course.title}
            />

            <div className="content">

                <small>

                    {course.reason}

                </small>

                <h3>

                    {course.title}

                </h3>

                <p>

                    {course.description}

                </p>

                <div className="course-meta">

                    <span>

                        📚 {course.lessons} Lessons

                    </span>

                    <span>

                        ⏱ {course.duration}

                    </span>

                </div>

                <button>

                    Start Course →

                </button>

            </div>

        </div>

    )

}

export default RecommendationCard;