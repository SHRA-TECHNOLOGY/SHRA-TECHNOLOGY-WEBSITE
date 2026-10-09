import api from "../../../api/axios";

// ==========================================
// CREATE DAILY CHALLENGE
// ==========================================

export const createDailyChallenge = async (data) => {
    try {
        const res = await api.post(
            "/create-daily-challenge",
            data
        );

        return res.data;
    } catch (error) {
        console.error(
            "Create Daily Challenge Error:",
            error
        );

        throw error;
    }
};


// ==========================================
// GET TODAY DAILY CHALLENGE
// ==========================================

export const getDailyChallenge = async () => {
    try {
        const res = await api.get(
            "/get-daily-challenge"
        );

        return res.data;
    } catch (error) {
        console.error(
            "Get Daily Challenge Error:",
            error
        );

        throw error;
    }
};


// ==========================================
// COMPLETE DAILY CHALLENGE
// ==========================================

export const completeDailyChallenge = async (
    dailyGoalId
) => {
    try {
        const res = await api.post(
            "/complete-daily-challenge",
            {
                dailyGoalId,
            }
        );

        return res.data;
    } catch (error) {
        console.error(
            "Complete Daily Challenge Error:",
            error
        );

        throw error;
    }
};

// ==========================================
// GET CHALLENGE OPTIONS
// ==========================================

export const getChallengeOptions = async () => {
    try {
        const res = await api.get(
            "/get-challenge-options"
        );

        return res.data;
    } catch (error) {
        console.error(
            "Get Challenge Options Error:",
            error
        );

        throw error;
    }
};