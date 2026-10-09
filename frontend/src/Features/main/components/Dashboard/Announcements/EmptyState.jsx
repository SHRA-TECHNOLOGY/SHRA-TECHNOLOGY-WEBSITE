import { useNavigation } from "react-router";

const EmptyState = () => {

    const navigate = useNavigation();

    const announcementsData = {
        hasAnnouncements: false,

        emptyState: {
            title: "No Announcements Yet",
            description:
                "You're all caught up! New courses, contests, offers, and important updates will appear here.",
            buttonText: "Explore Courses",
        },
    };

    return (

        <div className="empty-announcement">

            <div className="empty-icon">
                📢
            </div>

            <h3>
                {announcementsData.emptyState.title}
            </h3>

            <p>
                {announcementsData.emptyState.description}
            </p>

            <button onClick={()=> navigate('/course')}>
                {announcementsData.emptyState.buttonText}
            </button>

        </div>

    )

}

export default EmptyState;