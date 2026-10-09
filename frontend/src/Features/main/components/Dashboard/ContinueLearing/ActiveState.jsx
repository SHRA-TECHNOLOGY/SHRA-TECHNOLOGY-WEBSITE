const ActiveState = ({ course }) => {

    return (

        <section className="continue-card">
            <div className="title">

                <h3>Continue Learning</h3>
                <button className="view-all">View All</button>

            </div>

            <div className="course-info">

                <img
                    src={course.thumbnail}
                    alt={course.title}
                />

                <div className="course-basic-info">
                    <h2>

                        {course.title}

                    </h2>

                    <p>

                        Lesson {course.currentLesson}: {course.topic}

                    </p>

                    <div className="progress-container">

                        <div className="progress">

                            <div
                                className="fill"
                                style={{
                                    width: `${course.progress}%`
                                }}
                            ></div>

                        </div>

                        <span className="show-percentage">{course.progress}%</span>
                    </div>


                    <button>

                        Continue →

                    </button>

                </div>

            </div>

        </section>



    );

};

export default ActiveState;