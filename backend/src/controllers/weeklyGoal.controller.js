const weeklyGoalModel = require("../models/weeklyGoal.model");

const createWeeklyGoal = async (req, res) => {
    try {
        const { user, weekStart, weekEnd, lessonsTarget, problemsTarget, testsTarget, isActive } = req.body;

        
        const weeklyGoal = await weeklyGoalModel.create({ user, weekStart, weekEnd, lessonsTarget, problemsTarget, testsTarget, isActive });
        res.status(201).json(weeklyGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};