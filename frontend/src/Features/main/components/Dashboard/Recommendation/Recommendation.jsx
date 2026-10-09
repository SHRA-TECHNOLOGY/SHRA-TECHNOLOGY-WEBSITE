
import RecommendationCard from "./RecommendationCard";
import EmptyState from "./EmptyState";
import { useNavigate } from "react-router";

import "../../../styles/Dashboard/Recommendation.scss";

const Recommendation = ({dashboardData}) => {
    
    const navigate = useNavigate();

    const { recommendations } = dashboardData;

    if(recommendations.length===0){

        return <EmptyState/>

    }

    return(

        <section className="recommendation">

            <div className="section-header">

                <h2>

                    Recommended For You

                </h2>

                <button onClick={()=> navigate('/course')}>

                    View All

                </button>

            </div>

            <div className="course-grid">

                {

                    recommendations.map((course)=>(

                        <RecommendationCard

                            key={course.id}

                            course={course}

                        />

                    ))

                }

            </div>

        </section>

    )

}

export default Recommendation;