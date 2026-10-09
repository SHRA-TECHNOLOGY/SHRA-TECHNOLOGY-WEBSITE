import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createDailyChallenge,
    getDailyChallenge,
    completeDailyChallenge,
    getChallengeOptions
} from "../../Service/dailyChallenge.service";


// ==========================================
// GET DAILY CHALLENGE
// ==========================================

export const useDailyChallenge = () => {
    return useQuery({
        queryKey: ["daily-challenge"],
        queryFn: getDailyChallenge,

        staleTime: 1000 * 60 * 5,

        refetchOnWindowFocus: false,
    });
};


// ==========================================
// CREATE DAILY CHALLENGE
// ==========================================

export const useCreateDailyChallenge = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDailyChallenge,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["daily-challenge"],
            });
        },
    });
};


// ==========================================
// COMPLETE DAILY CHALLENGE
// ==========================================

export const useCompleteDailyChallenge = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: completeDailyChallenge,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["daily-challenge"],
            });

            // Profile XP agar alag query se aa raha hai
            queryClient.invalidateQueries({
                queryKey: ["profile-dashboard"],
            });
        },
    });
};

// ==========================================
// CHALLENGE OPTIONS HOOK
// ==========================================

export const useChallengeOptions = () => {
    return useQuery({
        queryKey: ["challenge-options"],
        queryFn: getChallengeOptions,

        staleTime: 1000 * 60 * 10,

        refetchOnWindowFocus: false,
    });
};