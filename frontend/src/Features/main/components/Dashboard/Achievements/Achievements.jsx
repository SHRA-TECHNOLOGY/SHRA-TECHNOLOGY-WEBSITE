
import AchievementCard from "./AchievementCard";
import EmptyState from "./EmptyState";
import "../../../styles/Dashboard/Achievements.scss";

const Achievements = ({badges}) => {

    const  achievements  = badges;

    if(achievements.length===0){

        return <EmptyState/>

    }

    return(

        <AchievementCard achievements={achievements}/>

    )

}

export default Achievements;