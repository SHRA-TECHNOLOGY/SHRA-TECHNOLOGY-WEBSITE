import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  addPracticeSet,
  getAllPractice,
  runPracticeCode,
  submitPracticeCode,
  getCourseAllProblem,
  getSingleProblem,
} from "../../Service/practice.service";


// ==========================================
// ADD PRACTICE SET
// ==========================================

export const useAddPracticeSet = () => {

  return useMutation({

    mutationFn: addPracticeSet,

    onSuccess: (data) => {

      toast.success(
        data?.message || "Practice set added successfully"
      );

    },

    onError: (error) => {

      toast.error(
        error?.response?.data?.message ||
        "Failed to add practice set"
      );

    },

  });

};


// ==========================================
// GET PRACTICE HOME DATA
// ==========================================

export const useAllPractice = () => {

  return useQuery({

    queryKey: ["practice"],

    queryFn: getAllPractice,

  });

};


// ==========================================
// RUN PRACTICE CODE
// ==========================================

export const useRunPracticeCode = () => {

  return useMutation({

    mutationFn: runPracticeCode,

    onSuccess: (data) => {

      // Run ke result ko tum component mein
      // mutation.data se access kar sakte ho.

      if (data?.success === false) {

        toast.error(
          data?.message || "Code execution failed"
        );

        return;
      }

      toast.success(
        data?.message || "Code executed successfully"
      );

    },

    onError: (error) => {

      toast.error(
        error?.response?.data?.message ||
        "Code execution failed"
      );

    },

  });

};


// ==========================================
// SUBMIT PRACTICE CODE
// ==========================================

export const useSubmitPracticeCode = () => {

  return useMutation({

    mutationFn: submitPracticeCode,

    onSuccess: (data) => {

      toast.success(
        data?.message || "Code submitted successfully"
      );

    },

    onError: (error) => {

      toast.error(
        error?.response?.data?.message ||
        "Code submission failed"
      );

    },

  });

};


// ==========================================
// GET ALL PROBLEMS OF SPECIFIC COURSE
// ==========================================

export const useCourseAllProblem = ({slug}) => {

  return useQuery({

    queryKey: ["practice", "course", slug],

    queryFn: () => getCourseAllProblem({ slug }),

    enabled: !!slug,

  });

};


// ==========================================
// GET SINGLE PRACTICE PROBLEM
// ==========================================

export const useSingleProblem = (slug,problemSlug) => {

  console.log(slug,problemSlug)

  return useQuery({

    queryKey: ["practice", "problem", problemSlug, slug],

    queryFn: () =>
      getSingleProblem({
        problemSlug,
        slug,
      }),

    enabled: !!problemSlug && !!slug,

  });

};