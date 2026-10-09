const CompletedState = ({ course }) => {

    return (

        <section className="continue-card">

            <div className="complete-section">

                <h2>

                    🎉 Congratulations!

                </h2>

                <p>

                    You completed

                    {course.title}

                </p>

                <div className="btn-box">

                    <button>

                        Download Certificate

                    </button>

                    <button>

                        Start Next Course

                    </button>
                </div>

            </div>

        </section>

    );

};

export default CompletedState;