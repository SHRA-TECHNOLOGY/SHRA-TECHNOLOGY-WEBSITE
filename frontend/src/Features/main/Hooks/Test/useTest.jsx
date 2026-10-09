import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTest,
  allTests,
  submitTest,
  allTestOfOneCourse,
  oneTestOfOneCourse,
  testInstruction,
  testQuestions,
  testResult,
  getTestXPLeaderboard,
  reviewTest,
} from "../../Service/test.service";


// ==========================================
// CREATE TEST
// ==========================================

export const useCreateTest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tests"],
      });
    },
  });
};


// ==========================================
// FETCH ALL COURSE TESTS
// ==========================================

export const useAllTests = (options = {}) => {
  return useQuery({
    queryKey: ["allTests"],
    queryFn: allTests,
    ...options,
  });
};


// ==========================================
// SUBMIT TEST
// ==========================================

export const useSubmitTest = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitTest,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["test-result"],
      });

    },
  });
};


// ==========================================
// FETCH ALL TESTS OF ONE COURSE
// ==========================================

export const useAllTestOfOneCourse = (courseId, options = {}) => {
  return useQuery({
    queryKey: ["courseTests", courseId],

    queryFn: () =>
      allTestOfOneCourse({
        courseId,
      }),

    enabled: !!courseId && (options.enabled ?? true),

    ...options,
  });
};


// ==========================================
// FETCH ONE SPECIFIC TEST
// ==========================================

export const useOneTestOfOneCourse = (courseId, slug) => {

  return useQuery({
    queryKey: ["test", courseId, slug],

    queryFn: () =>
      oneTestOfOneCourse({
        courseId,
        slug,
      }),

    enabled: !!courseId && !!slug,
  });
};


// ==========================================
// FETCH TEST INSTRUCTIONS
// ==========================================

export const useTestInstruction = ({courseId, slug}) => {

  return useQuery({
    queryKey: ["test-instruction", courseId, slug],

    queryFn: () =>
      testInstruction({
        courseId,
        slug,
      }),

    enabled: !!courseId && !!slug,
  });
};


// ==========================================
// FETCH TEST ATTEMPT QUESTIONS
// ==========================================

export const useTestQuestions = ({courseId, slug}) => {

  return useQuery({
    queryKey: ["test-questions", courseId, slug],

    queryFn: () =>
      testQuestions({
        courseId,
        slug,
      }),

    enabled: !!courseId && !!slug,
  });
};


// ==========================================
// FETCH TEST RESULT
// ==========================================

export const useTestResult = (resultId) => {

  return useQuery({
    queryKey: ["test-result", resultId],

    queryFn: () =>
      testResult({
        resultId,
      }),

    enabled: !!resultId,
  });
};


// ==========================================
// REVIEW TEST
// ==========================================

export const useReviewTest = ({resultId}) => {

  return useQuery({
    queryKey: ["test-review", resultId],

    queryFn: () =>
      reviewTest({
        resultId,
      }),

    enabled: !!resultId,
  });
};

// ==========================================
// Get Leaderboard data 
// ==========================================

export const useTestXPLeaderboard = () => {
  return useQuery({
    queryKey: ["test-xp-leaderboard"],
    queryFn: getTestXPLeaderboard,
    staleTime: 60 * 1000,
  });
};