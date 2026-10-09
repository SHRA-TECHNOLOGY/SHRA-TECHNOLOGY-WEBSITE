import { useNavigate } from "react-router";
import {Rocket} from 'lucide-react'
const EmptyState = () => {
    const navigate = useNavigate();

    return (

        <section className="continue-card">

            <div className="empty-continue-icon">
                <Rocket />
            </div>

            <div className="empty-content">

                <h2>
                    Start Your Learning Journey
                </h2>

                <p>

                    You haven't enrolled in any course yet.

                </p>

                <button onClick={() => navigate("/course")} className="explore-courses-btn">

                    Explore Courses

                </button>

            </div>

        </section>

    );

};

export default EmptyState;