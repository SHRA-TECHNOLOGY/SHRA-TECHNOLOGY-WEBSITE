import {MoveRight} from 'lucide-react'


const AvailableState = ({ challenge }) => {

    return (

        <section className="challenge-card">

            <div className="title">

                <h3>Today's Target</h3>
                <button className="add-challenge">New Challenge</button>

            </div>

            <div className="basic-info">

                <div className="basic-info-left">

                </div>

                <div className="basic-info-right">

                    <div className="info-right">

                        <h3>

                            {challenge.title}

                        </h3>

                        <p>{challenge.difficulty} Problem • {challenge.topic}</p>
                    </div>

                    <span>+{challenge.xp} XP</span>

                </div>

            </div>

            <button>

                Solve Challenge <MoveRight />

            </button>

        </section>

    );

}

export default AvailableState;