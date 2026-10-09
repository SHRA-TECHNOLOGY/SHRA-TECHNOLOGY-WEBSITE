const LiveState = ({ data }) => {

    return (

        <section className="live-card">

            <img
                src={data.thumbnail}
                alt={data.title}
            />

            <div className="content">

                <span className="live-badge">

                    🔴 LIVE NOW

                </span>

                <h2>

                    {data.title}

                </h2>

                <button>

                    Join Live Class

                </button>

            </div>

        </section>

    );

}

export default LiveState;