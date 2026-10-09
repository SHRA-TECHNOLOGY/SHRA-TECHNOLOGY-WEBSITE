import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


import {
  createCourse,
  fetchAllCourse,
  courseByCourseId,
  courseByUser,
  addLesson,
  getLessonUrl,
  enrollCourse,
  updateCourseProgress,
  createCourseOrder,
  verifyCoursePayment,
} from "../../Service/course.service";


// ==========================================
// CREATE COURSE
// ==========================================

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: createCourse,

    onSuccess: (data) => {
      toast.success(
        data?.message || "Course created successfully"
      );
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "Failed to create course"
      );
    },
  });
};


// ==========================================
// FETCH ALL COURSES
// ==========================================

export const useAllCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchAllCourse,
  });
};


// ==========================================
// FETCH ONE COURSE BY courseId
// ==========================================

export const useCourseByCourseId = (courseId) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => courseByCourseId({ courseId }),
    enabled: !!courseId,
  });
};


// ==========================================
// FETCH ALL COURSES BY USER
// ==========================================

export const useCourseByUser = ({ userId }) => {
  return useQuery({
    queryKey: ["user-courses", userId],
    queryFn: () => courseByUser({ userId }),
    enabled: !!userId,
  });
};


// ==========================================
// ADD LESSON
// ==========================================

export const useAddLesson = () => {
  return useMutation({
    mutationFn: addLesson,

    onSuccess: (data) => {
      toast.success(
        data?.message || "Lesson added successfully"
      );
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "Failed to add lesson"
      );
    },
  });
};


// ==========================================
// GET LESSON URL
// ==========================================

export const useLessonUrl = ({ courseId, lessonId }) => {
  return useQuery({
    queryKey: ["lesson-url", courseId, lessonId],
    queryFn: () => getLessonUrl({ courseId, lessonId }),
    enabled: Boolean(courseId && lessonId),
  });
};


// ==========================================
// ENROLL COURSE
// ==========================================

export const useEnrollCourse = () => {
  return useMutation({
    mutationFn: enrollCourse,

    onSuccess: (data) => {
      toast.success(
        data?.message || "Course enrolled successfully"
      );
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
        "Failed to enroll course"
      );
    },
  });
};

// ==========================================
// Update & Save Progress of COURSE
// ==========================================

export const useUpdateCourseProgress = () => {

  return useMutation({
    mutationFn: updateCourseProgress,
  });


};


// ==========================================
// CREATE COURSE PAYMENT ORDER
// ==========================================

export const useCreateCourseOrder = () => {

  return useMutation({
    mutationFn: createCourseOrder,
  });

};


// ==========================================
// VERIFY COURSE PAYMENT
// ==========================================

export const useVerifyCoursePayment = () => {

  return useMutation({
    mutationFn: verifyCoursePayment,
  });

};