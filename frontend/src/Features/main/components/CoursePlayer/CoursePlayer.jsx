// lesion aur state manage karega pura page 

import { useMemo, useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import CourseSidebar from "./CourseSidebar";
import "../../styles/CourseDetails/CoursePlayer.scss";
import LectureRightInfo from "../CourseDetails/LectureSection/LectureRightInfo";
import VideoEmptySection from "../CourseDetails/LectureSection/VideoEmptySection";
import Img from '../../../../assets/sonu-img.png'
import { Download, Award } from 'lucide-react'
import { useParams } from 'react-router'

import { useCourseByCourseId } from '../../Hooks/Course/useCourse'

const CoursePlayer = () => {
    const { courseId } = useParams();

    const { data, isLoading, isError, error } = useCourseByCourseId(courseId);

    const progress = data?.data?.progress || null;

    const savedCurrentLessonId = progress?.currentLessonId;
    const savedCompletedLessons = progress?.completedLessons || [];


    // ==========================================
    // COURSE
    // ==========================================

    const course = data?.data?.course || null;

    console.log(course)



    // ==========================================
    // ENROLLMENT
    // ==========================================

    const isEnroll = data?.data?.enrollment?.isEnrolled === true;


    // ==========================================
    // SECTIONS
    // ==========================================

    const sections = data?.data?.sections || [];



    // ==========================================
    // ALL LESSONS
    // ==========================================

    const allLessons = useMemo(() => {

        return sections.flatMap(
            section => section.lessons || []
        );

    }, [sections]);



    // ==========================================
    // CURRENT LESSON
    // ==========================================

    const [currentLesson, setCurrentLesson] = useState(null);

    console.log(currentLesson)


    // ==========================================
    // CURRENT SECTION
    // ==========================================

    const currentSection = useMemo(() => {

        if (!currentLesson) return null;

        return sections.find(section =>
            section.lessons?.some(
                lesson => lesson.id === currentLesson.id
            )
        );

    }, [sections, currentLesson]);

    const sectionId = currentSection?._id;



    // ==========================================
    // COURSE CHANGE HONE PAR
    // FIRST LESSON SELECT Or Start which video where user last watched
    // ==========================================

    useEffect(() => {

        if (!allLessons.length) return;

        // ==========================================
        // COMPLETED LESSONS LOAD
        // ==========================================

        setCompletedLessons(
            savedCompletedLessons.map(id => id.toString())
        );


        // ==========================================
        // CURRENT LESSON LOAD
        // ==========================================

        if (savedCurrentLessonId) {

            const savedLesson = allLessons.find(
                lesson =>
                    lesson.id?.toString() ===
                    savedCurrentLessonId.toString()
            );

            if (savedLesson) {

                setCurrentLesson(savedLesson);

                return;
            }
        }


        // ==========================================
        // FIRST TIME USER
        // ==========================================

        setCurrentLesson(allLessons[0]);

    }, [
        allLessons,
        savedCurrentLessonId,
        savedCompletedLessons
    ]);


    // ==========================================
    // OVERLAY
    // ==========================================

    const [showOverlay, setShowOverlay] = useState(false);


    // ==========================================
    // COMPLETED LESSONS
    // ==========================================

    const [completedLessons, setCompletedLessons] = useState([]);


    // ==========================================
    // NEXT LESSON
    // ==========================================

    const nextLessonData = useMemo(() => {

        if (!currentLesson) {
            return null;
        }

        const index = allLessons.findIndex(
            lesson => lesson.id === currentLesson.id
        );

        return allLessons[index + 1] || null;

    }, [currentLesson, allLessons]);


    // ==========================================
    // NEXT LESSON HANDLER
    // ==========================================

    const handleNextLesson = () => {

        if (!nextLessonData) {

            setShowOverlay(false);

            return;
        }

        setCurrentLesson(nextLessonData);

        setShowOverlay(false);

    };


    // ==========================================
    // COMPLETE LESSON
    // ==========================================

    const markCompleted = (lessonId) => {

        const id = lessonId.toString();

        setCompletedLessons(prev => {

            if (prev.includes(id)) {
                return prev;
            }

            return [...prev, id];

        });

        setShowOverlay(true);
    };


    return (

        <>

            {/* lecture section here  */}

            <div className="course-player">

                {/* video section here */}

                <div className="video-section">

                    {isEnroll ? (

                        <>

                            <VideoPlayer

                                currentLesson={currentLesson}

                                sectionId={sectionId}

                                showOverlay={showOverlay}

                                setShowOverlay={setShowOverlay}

                                nextLessonData={nextLessonData}

                                onNextLesson={handleNextLesson}

                                markCompleted={markCompleted}

                                courseId={courseId}

                            />

                            <div className="video-title-section">
                                <h1>{currentLesson?.title}</h1>
                                <p>{currentLesson?.duration}</p>
                            </div>
                        </>

                    ) : (
                        <VideoEmptySection />
                    )}

                </div>

                {/* lecture right info section */}

                < LectureRightInfo data={data} />

            </div>

            {/* course description section here */}

            <div className="course-describe-section">

                <div className="course-description-left">

                    {/* course description here */}

                    <div className="course-description">    
                        <h2>{currentLesson?.title || course?.seriesName || "Unknown Course"}</h2>
                        <p className="course-description">{currentLesson?.description || course?.description || ""}</p>

                        <div className="description-lower">
                            <p>{course?.averageRating} ({course?.totalStudents} students)</p>
                            <p>{course?.duration} Hours</p>
                            <p>{course?.totalLessons} lectures</p>
                        </div>

                        {/* instructor details here */}

                        <div className="course-instructor">
                            <span className="instructor-logo"><img src={Img} alt="logo" /></span>
                            <div className="instructor-name">
                                <h3>{course?.instructor?.fullName}</h3>
                                <p>{course?.instructor?.role}</p>
                            </div>
                        </div>

                    </div>

                    {/* course content list here  */}

                    <CourseSidebar

                        sections={sections}

                        allLessons={allLessons}

                        currentLesson={currentLesson}

                        setCurrentLesson={setCurrentLesson}

                        completedLessons={completedLessons}

                    />

                </div>


                {/* resources section here */}

                <div className="resources-section">
                    <h3>Course Resources</h3>

                    <button><Download />Download Notes (PDF)</button>
                    <button><Download />Source Code (Github)</button>
                    <button><Award />Certificate Preview</button>
                </div>

            </div>

        </>


    );

};

export default CoursePlayer;