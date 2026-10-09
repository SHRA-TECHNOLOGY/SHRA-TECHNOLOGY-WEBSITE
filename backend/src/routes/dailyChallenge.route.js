const {Router} = require('express');

const {isAlreadyReg} = require('../middlewares/isAlreadyReg.middleware');

const dailyChallengeController = require('../controllers/dailyChallenge.controller')

const dailyChallengeRouter = Router();


//accept user problem api here
dailyChallengeRouter.post("/create-daily-challenge",isAlreadyReg,dailyChallengeController.createDailyChallenge);

//fetch all users problem api here
dailyChallengeRouter.get("/get-daily-challenge",isAlreadyReg,dailyChallengeController.getTodayDailyChallenge);

//fetch all users problem api here
dailyChallengeRouter.post("/complete-daily-challenge",isAlreadyReg,dailyChallengeController.completeDailyChallenge);

dailyChallengeRouter.get(
    "/get-challenge-options",
    isAlreadyReg,
    dailyChallengeController.getChallengeOptions
);

module.exports = dailyChallengeRouter;