import api from "../../../api/axios";

// course create function

export const createCourse = async (formData) => {
  try {
    const res = await api.post("/create-course", formData);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// fetch all courses function

export const fetchAllCourse = async () => {
  try {
    const res = await api.get("/courses");

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// fetch one course by courseId function

export const courseByCourseId = async ({ courseId }) => {
  try {
    const res = await api.get(`/course/${courseId}`);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// fetch all courses by user function

export const courseByUser = async ({ userId }) => {
  try {
    const res = await api.post(`/user-course/${userId}`);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// add lesson course function

export const addLesson = async () => {
  try {
    const res = await api.post("/course/add-lesson");

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// add lesson course function

export const getLessonUrl = async ({ courseId, lessonId }) => {
  
  try {
    const res = await api.post(`/course/${courseId}`, { lessonId });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// add lesson course function

export const enrollCourse = async ({ courseId }) => {
  try {
    const res = await api.post(`/course-enroll/${courseId}`);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ==========================================
// CREATE COURSE PAYMENT ORDER
// ==========================================

export const createCourseOrder = async (courseId) => {

  const res = await api.post(
    "/course/payment/create-order",
    {
      courseId,
    }
  );

  return res.data;
};


// ==========================================
// VERIFY COURSE PAYMENT
// ==========================================

export const verifyCoursePayment = async (paymentData) => {

  const res = await api.post(
    "/course/payment/verify",
    paymentData
  );

  return res.data;
};

export const updateCourseProgress = async ({
  courseId,
  lessonId,
  sectionId,
  currentTime,
  completed,
}) => {
  try {
    const res = await api.post(`/course-progress/${courseId}`, {
      lessonId,
      sectionId,
      currentTime,
      completed,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
