
import CommonNavbar from '../Navbar/CommonNavbar'
import CourseCard from './CourseCard'
import '../../styles/Course/RightPart.scss'
import HeroSection from './Hero-Section'


const RightPart = () => {

    const categories = [
        "All Categories",
        "Programming",
        "Web Development",
        "Database",
        "Networking",
        "AI & ML",
    ];

    return (
        <>

            {/* navbar code here */}
            <CommonNavbar title={"All Courses"}/>

            <div className="main-content">

                <HeroSection placeholder={"Search courses..."} categories={categories} title={"All Courses"}/>

                <div className="popular-cards">

                    <CourseCard />
                </div>
            </div>
        </>
    )
}

export default RightPart
