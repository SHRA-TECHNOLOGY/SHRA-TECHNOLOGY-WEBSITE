const mongoose = require("mongoose");

const dailyGoalSchema = new mongoose.Schema(
    {
        // ==========================================
        // USER
        // ==========================================

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // agar tumhara model Auth hai to "Auth" karo
            required: true,
            index: true,
        },

        // ==========================================
        // DATE
        // ==========================================

        date: {
            type: Date,
            required: true,
        },

        // ==========================================
        // GOAL / CHALLENGE TYPE
        // ==========================================

        targetType: {
            type: String,
            enum: [
                "practice",
                "lesson",
                "test",
                "mixed",
            ],
            default: "practice",
        },

        // ==========================================
        // DAILY TARGET
        // ==========================================

        target: {
            type: Number,
            required: true,
            min: 1,
        },

        completed: {
            type: Number,
            default: 0,
            min: 0,
        },

        // ==========================================
        // SELECTED CHALLENGE
        // ==========================================

        practice: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PracticeProblem",
            default: null,
        },

        lesson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
            default: null,
        },

        test: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
            default: null,
        },

        // ==========================================
        // XP
        // ==========================================

        xpReward: {
            type: Number,
            default: 25,
            min: 0,
        },

        // ==========================================
        // STATUS
        // ==========================================

        isCompleted: {
            type: Boolean,
            default: false,
        },

        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);


// Same user + same date = one DailyGoal
dailyGoalSchema.index(
    {
        user: 1,
        date: 1,
    },
    {
        unique: true,
    }
);


const dailyGoalModel = mongoose.model(
    "DailyGoal",
    dailyGoalSchema
);

module.exports = dailyGoalModel;