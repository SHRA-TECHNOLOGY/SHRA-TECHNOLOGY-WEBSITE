const RecordingState = ({ data }) => {

    return (

        <section className="live-card">

            <img
                src={data.thumbnail}
                alt={data.title}
            />

            <div className="content">

                <span>

                    📹 Recording Available

                </span>

                <h2>

                    {data.title}

                </h2>

                <button>

                    Watch Recording

                </button>

            </div>

        </section>

    );

}

export default RecordingState;