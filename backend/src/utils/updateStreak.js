const authModel = require("../models/auth.model");

const updateStreak = async (userId) => {
    try {
        const user = await authModel.findById(userId);

        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // First activity
        if (!user.streak?.lastActivityDate) {

            user.streak.current = 1;
            user.streak.longest = 1;
            user.streak.lastActivityDate = today;

        } else {

            const lastActivity = new Date(
                user.streak.lastActivityDate
            );

            lastActivity.setHours(0, 0, 0, 0);

            const difference = Math.floor(
                (today - lastActivity) /
                (1000 * 60 * 60 * 24)
            );

            // Already active today
            if (difference === 0) {
                return {
                    success: true,
                    message: "Streak already updated today",
                    streak: user.streak.current,
                };
            }

            // Active yesterday → continue streak
            if (difference === 1) {

                user.streak.current += 1;

            } else {

                // Gap of 2+ days → reset
                user.streak.current = 1;
            }

            // Update longest streak
            if (
                user.streak.current >
                user.streak.longest
            ) {
                user.streak.longest =
                    user.streak.current;
            }

            // Update last activity
            user.streak.lastActivityDate = today;
        }

        await user.save();

        return {
            success: true,
            message: "Streak updated successfully",
            streak: user.streak.current,
            longestStreak: user.streak.longest,
        };

    } catch (error) {

        console.error("Update Streak Error:", error);

        return {
            success: false,
            message: "Failed to update streak",
            error: error.message,
        };
    }
};

module.exports = {updateStreak};