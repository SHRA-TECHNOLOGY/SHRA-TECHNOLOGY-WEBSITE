import api from "../../../api/axios";


// ==========================================
// ADD PRACTICE SET
// ==========================================

export const addPracticeSet = async (data) => {
  try {
    const res = await api.post("/add-practice-set", data);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// GET PRACTICE HOME DATA
// ==========================================

export const getAllPractice = async () => {
  
  try {
    const res = await api.get("/practice");

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// RUN PRACTICE CODE
// ==========================================

export const runPracticeCode = async (data) => {
  try {
    const res = await api.post("/practice/run", data);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// SUBMIT PRACTICE CODE
// ==========================================

export const submitPracticeCode = async (data) => {
  try {
    const res = await api.post("/practice/submit", data);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// GET ALL PROBLEMS OF SPECIFIC COURSE
// ==========================================

export const getCourseAllProblem = async ({ slug }) => {
  try {
    const res = await api.get(`/practice/${slug}`);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// GET SINGLE PRACTICE PROBLEM
// ==========================================

export const getSingleProblem = async ({ slug, problemSlug }) => {
  try {
    const res = await api.get(
      `/practice/${slug}/${problemSlug}`,
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};