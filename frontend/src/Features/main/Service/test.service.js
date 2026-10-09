import api from "../../../api/axios";

// ==========================================
// CREATE TEST
// ==========================================

export const createTest = async (data) => {
  try {
    const res = await api.post("/create-test", data);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// FETCH ALL COURSE TESTS
// ==========================================

export const allTests = async () => {
  try {
    const res = await api.post("/tests");

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// SUBMIT TEST
// ==========================================

export const submitTest = async (data) => {
  try {
    const res = await api.post("/tests/attempt/submit", data);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// FETCH ALL TESTS OF ONE COURSE
// ==========================================

export const allTestOfOneCourse = async ({ courseId }) => {
  try {
    const res = await api.post(`/tests/${courseId}`);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// FETCH ONE SPECIFIC TEST
// ==========================================

export const oneTestOfOneCourse = async ({ courseId, slug }) => {
  try {
    const res = await api.post(`/tests/${courseId}/${slug}`);

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// FETCH TEST INSTRUCTIONS
// ==========================================

export const testInstruction = async ({ courseId, slug }) => {
  try {
    const res = await api.post(
      `/tests/instruction/${courseId}/${slug}`,
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// FETCH TEST ATTEMPT QUESTIONS
// ==========================================

export const testQuestions = async ({ courseId, slug }) => {
  try {
    const res = await api.post(
      `/tests/attempt/${courseId}/${slug}`,
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// FETCH TEST RESULT
// ==========================================

export const testResult = async ({ resultId }) => {
  try {
    const res = await api.post(
      `/test/result/${resultId}`,
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// ==========================================
// REVIEW TEST
// ==========================================

export const reviewTest = async ({ resultId }) => {
  try {
    const res = await api.post(
      `/test/review/${resultId}`,
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ==========================================
// Leaderboard data
// ==========================================

export const getTestXPLeaderboard = async () => {

  const response = await api.get("/leaderboard/xp");

  return response.data;
};