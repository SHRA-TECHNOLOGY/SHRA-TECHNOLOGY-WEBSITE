const courseModel = require('../models/course.model')
const enrollmentCourseModel = require('../models/enrollment.course.model')
const lessonCourseModel = require('../models/lession.course.model')
const sectionCourseModel = require('../models/section.course.model')
const progressCourseModel = require('../models/progress.course.model')

const getCourseDetails = async({courseId,user_id}) =>{

    //1. fetch course details

    const course = await courseModel.findOne({_id:courseId,status:"Published"})
        .select("_id title seriesName description thumbnail instructor category language level pricing duration averageRating totalStudents tags totalSections totalLessons")
        .populate("instructor", "fullName role profileImage")
        .lean()

    if(!course){
        throw new ApiError(404,"Course is not found !")
    }

    //2. fetch all section

    const sections = await sectionCourseModel.find({course:course._id})
        .select("title description order totalLessons duration isPublished")
        .sort({order:1})
        .lean()

   
    
    const sectionIds = await sections.map(section => section._id)

    

    //3. lessons fetch 

    const lessons = await lessonCourseModel.find({course:course._id, section:{$in:sectionIds}})
        .select("title description type status order duration section isPreview isPublished")
        .sort({order:1})
        .lean()

     

    //4 lesson aur section ko attached

    const sectionWithLesson = sections.map(section => ({
        ...section,
        lessons:lessons.filter(lesson => 
            lesson.section.toString() === section._id.toString()
        )

    }))


    // 5. check enrolled 

    const enroll = await enrollmentCourseModel.findOne({course:course._id, user:user_id})
        .lean()

    

    //6. if user not enrolled than response format

    if(!enroll){
        return {
            course,
            enrollment:false,
            progress:null,
            sections: sectionWithLesson.map(section => ({
                ...section,
                lessons: section.lessons.map(lesson => ({
                    id:lesson._id,
                    title:lesson.title,
                    description: lesson.description,
                    order:lesson.order,
                    type:lesson.type,
                    status:lesson.status,
                    duration:lesson.duration,
                    isPreview:lesson.isPreview,

                    // ui ke liye 
                    isLocked: !lesson.isPreview

                }))
            }))
        }
    }

    //7. fetch enrolled user progress

    const progress = await progressCourseModel.findOne({user:user_id,course:course._id}).lean()

    //return all response for enrolled user

    return {
        course,
        enrollment:{
            isEnrolled:true,
            status:enroll.status,
            enrolledAt:enroll.enrolledAt
        },

        progress: progress?{
            percentage:progress.progress,
            completedLessons:progress.completedLessons,
            currentLessonId:progress.currentLesson
        } :{
            percentage:0,
            completedLessons:0,
            currentLessonId:null
        },

        sections: sectionWithLesson.map(section => ({
            ...section,
            lessons: section.lessons.map(lesson => ({
                id:lesson._id,
                title:lesson.title,
                description: lesson.description,
                order:lesson.order,
                type:lesson.type,
                status:lesson.status,
                duration:lesson.duration,
                isPreview:lesson.isPreview,

                //enrolled user ke liye 
                isLocked: false,

            }))
        }))
    }

}

module.exports = getCourseDetails