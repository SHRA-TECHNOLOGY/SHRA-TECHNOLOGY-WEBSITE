import React from 'react'

const CourseProgress = ({completedCount,allLessons,}) => {

    const progress = allLessons.length ? Math.round((completedCount / allLessons.length) * 100) : 0;
    
  return (
    <div className="sidebar-header">

                <h2>Course Content</h2>

                <p>

                    {completedCount} / {allLessons.length} Lessons Completed

                </p>

                <div className="progress-bar">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

                <span>{progress}% Completed</span>

            </div>
  )
}

export default CourseProgress
