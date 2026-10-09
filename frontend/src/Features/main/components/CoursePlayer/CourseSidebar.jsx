import { useMemo, useState, useEffect } from "react";
import {
    ChevronDown,
    ChevronRight
} from "lucide-react";

import LessonItem from "./LessonItem";
import CourseProgress from "./CourseProgress";

const CourseSidebar = ({
    sections,
    allLessons,
    currentLesson,
    setCurrentLesson,
    completedLessons
}) => {

    // set all complete lesson
    const completedSet = useMemo(
        () => new Set(completedLessons),
        [completedLessons]
    );


    const [openSections, setOpenSections] = useState([]);


    // First section automatically open
    useEffect(() => {

        if (sections.length > 0 && openSections.length === 0) {
            setOpenSections([sections[0]._id]);
        }

    }, [sections]);


    // Ek time par sirf ek section open rahega
    const toggleSection = (id) => {

        setOpenSections(prev =>
            prev.includes(id)
                ? []
                : [id]
        );

    };



    const completedCount = completedLessons.length;


    return (

        <div className="course-sidebar">

            <CourseProgress completedCount={completedCount} allLessons={allLessons} />

            {

                sections.map(section => {

                    const isOpen = openSections.includes(section._id);

                    return (

                        <div
                            className="course-section"
                            key={section._id}
                        >

                            <button

                                className="section-title"

                                onClick={() =>
                                    toggleSection(section._id)
                                }

                            >

                                <div className="list-left">

                                    {

                                        isOpen

                                            ?

                                            <ChevronDown size={34} />

                                            :

                                            <ChevronRight size={34} />

                                    }

                                    <strong className="title">

                                        {section.title}

                                    </strong>

                                </div>

                                <small className="total-lesion">

                                    {section?.lessons?.length || 0} Lessons

                                </small>

                            </button>

                            {/* lesion list here */}

                            {

                                isOpen &&

                                <div className="lesson-list">

                                    {

                                        section.lessons?.map(lesson => {

                                            const lessonIndex = allLessons.findIndex(
                                                item => item.id === lesson.id
                                            );

                                            const previousLesson = allLessons[lessonIndex - 1];

                                            const isLocked =
                                                !lesson.isPreview &&
                                                previousLesson &&
                                                !completedSet.has(previousLesson.id);


                                            return (

                                                <LessonItem

                                                    key={lesson.id}

                                                    lesson={lesson}

                                                    currentLesson={currentLesson}

                                                    setCurrentLesson={setCurrentLesson}

                                                    completed={completedSet.has(lesson.id)}

                                                    isLocked={isLocked}

                                                />
                                            )

                                        })

                                    }

                                </div>

                            }

                        </div>

                    )


                })

            }

        </div>

    );

};

export default CourseSidebar;